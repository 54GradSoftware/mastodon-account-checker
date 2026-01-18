import express from 'express';
import rateLimit from 'express-rate-limit';
import { calculateMastodonAccountScore } from './index.js';

const app = express();
const PORT = process.env.PORT || 1;

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 15, // Max 15 Requests pro IP in 15 Minuten
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Zu viele Anfragen von dieser IP, bitte später erneut versuchen.',
        retryAfter: '15 Minuten'
    }
});

app.use(limiter);

app.get('/api/score/:handle', async (req, res) => {
    const { handle } = req.params;

    if (!handle) {
        return res.status(400).json({
            error: 'Mastodon Handle ist erforderlich',
            example: '/api/score/user@mastodon.social'
        });
    }

    if (!handle.includes('@')) {
        return res.status(400).json({
            error: 'Ungültiges Mastodon Handle Format',
            example: 'user@mastodon.social'
        });
    }

    try {
        const result = await calculateMastodonAccountScore(handle);

        if (!result) {
            return res.status(404).json({
                error: 'Account nicht gefunden',
                handle: handle
            });
        }

        return res.json({
            success: true,
            handle: handle,
            ...result
        });
    } catch (error) {
        console.error('Fehler bei Score-Berechnung:', error.message);

        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            return res.status(503).json({
                error: 'Mastodon Server nicht erreichbar',
                handle: handle
            });
        }

        if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
            return res.status(504).json({
                error: 'Zeitüberschreitung bei der Anfrage',
                handle: handle
            });
        }

        return res.status(500).json({
            error: 'Interner Serverfehler',
            message: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Route nicht gefunden',
        availableRoutes: [
            'GET /api/score/:handle',
            'GET /health'
        ]
    });
});

app.use((err, req, res, next) => {
    console.error('Unbehandelter Fehler:', err);
    res.status(500).json({
        error: 'Ein unerwarteter Fehler ist aufgetreten'
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
