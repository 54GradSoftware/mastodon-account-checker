<script setup>
import { ref } from 'vue'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AccountResult from './components/AccountResult.vue'

const mastodonHandle = ref('')
const loading = ref(false)
const result = ref(null)
const error = ref(null)

const apiBaseUrl = import.meta.env.VITE_API_URL || ''

const checkScore = async () => {
    error.value = null

    if (!mastodonHandle.value.trim()) {
        error.value = 'Bitte gib einen Mastodon Handle ein'
        return
    }

    if (!mastodonHandle.value.includes('@')) {
        error.value = 'Ungültiges Format. Beispiel: benutzer@mastodon.social'
        return
    }

    loading.value = true
    result.value = null

    try {
        const response = await axios.get(`${apiBaseUrl}/api/score/${encodeURIComponent(mastodonHandle.value)}`)
        result.value = response.data
    } catch (err) {
        if (err.response) {
            error.value = err.response.data.error || 'Ein Fehler ist aufgetreten'
        } else if (err.request) {
            error.value = 'Server nicht erreichbar. Bitte versuche es später erneut.'
        } else {
            error.value = 'Ein unerwarteter Fehler ist aufgetreten.'
        }
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div style="min-height: 100vh; display: flex; flex-direction: column;">
        <AppHeader />
        <main style="flex: 1; padding: 2rem; max-width: 900px; margin: 0 auto; width: 100%;">
            <!-- Einführung -->
            <section aria-label="Einführung">
                <Card style="margin-bottom: 2rem;">
                    <template #title>
                        <i class="pi pi-info-circle" style="margin-right: 0.5rem;" aria-hidden="true"></i>
                        <span>Was ist der Mastodon Account Checker?</span>
                    </template>
                    <template #content>
                        <p style="line-height: 1.6; margin-bottom: 1rem;">
                            Der <strong>Mastodon Account Checker</strong> analysiert deinen Mastodon-Account und bewertet,
                            wie gut er für die Auffindbarkeit und Vernetzung im Fediverse optimiert ist.
                        </p>
                        <p style="line-height: 1.6; margin-bottom: 1rem;">
                            Ein gut ausgefülltes Profil hilft anderen Nutzern, dich zu finden und zu verstehen,
                            wer du bist und wofür du dich interessierst. Dies fördert bessere Verbindungen und
                            eine aktivere Teilnahme am dezentralen sozialen Netzwerk.
                        </p>
                        <Message severity="info" :closable="false">
                            <strong>Tipp:</strong> Gib deinen vollständigen Mastodon Handle ein, z.B.
                            <code>benutzername@mastodon.social</code>
                        </Message>
                    </template>
                </Card>
            </section>

            <!-- Eingabe -->
            <section aria-label="Account überprüfen">
                <Card style="margin-bottom: 2rem;">
                    <template #title>
                        <i class="pi pi-user" style="margin-right: 0.5rem;" aria-hidden="true"></i>
                        <span>Account überprüfen</span>
                    </template>
                    <template #content>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <label for="mastodon-handle" style="font-weight: 500;">
                                Mastodon Handle
                            </label>
                            <p id="handle-description"
                                style="margin: 0; color: var(--p-text-muted-color); font-size: 0.875rem;">
                                Gib deinen vollständigen Handle im Format benutzername@instanz.social ein
                            </p>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                <InputText id="mastodon-handle" v-model="mastodonHandle"
                                    placeholder="benutzer@mastodon.social" style="flex: 1; min-width: 250px;"
                                    @keyup.enter="checkScore" :disabled="loading" aria-describedby="handle-description"
                                    :aria-invalid="error ? 'true' : 'false'" autofocus />
                                <Button label="Überprüfen" icon="pi pi-search" @click="checkScore" :loading="loading"
                                    aria-label="Mastodon Account überprüfen" />
                            </div>
                        </div>
                        <div v-if="error && !loading" role="alert" aria-live="assertive">
                            <Message severity="error" :closable="false" style="margin-top: 1rem;">
                                {{ error }}
                            </Message>
                        </div>
                    </template>
                </Card>
            </section>

            <!-- Loading -->
            <div v-if="loading" style="display: flex; justify-content: center; padding: 3rem;" role="status"
                aria-live="polite">
                <ProgressSpinner aria-label="Account wird geladen" />
                <span class="sr-only">Account wird analysiert, bitte warten...</span>
            </div>

            <!-- Ergebnis -->
            <AccountResult v-if="result && !loading" :result="result" />

        </main>

        <AppFooter />
    </div>
</template>

<style>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
