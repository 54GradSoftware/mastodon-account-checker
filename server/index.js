import axios from 'axios';

const scoreMatrix = {
    display_name: 10,
    note: 20,
    verified_fields: 20,
    discoverable: 20,
    indexable: 20,
    featuredCollection: 10
}

const calculateMastodonAccountScore = async (mastodonHandle, accountLookup = null) => {
    try {
        if (!accountLookup) {
            accountLookup = await getAccountLookup(mastodonHandle)
        }
        if (!accountLookup) {
            console.error('could not load account')
            return
        }
        const { username, display_name, note, discoverable, indexable, fields, avatar_static, header_static } = accountLookup
        const featuredCollection = await getFeaturedCollection(mastodonHandle)
        let score = 0;
        if (display_name != '') score += scoreMatrix.display_name
        if (note != '') score += scoreMatrix.note

        if (discoverable === true) score += scoreMatrix.discoverable
        if (indexable === true) score += scoreMatrix.indexable
        if (!!featuredCollection && featuredCollection.length) score += scoreMatrix.featuredCollection

        const verifiedFields = fields.filter(field => field.verified_at != null)

        if (verifiedFields.length) score += scoreMatrix.verified_fields

        return {
            score,
            scoreMatrix,
            values: {
                username,
                display_name,
                note,
                discoverable,
                indexable,
                verifiedFields,
                avatar_static,
                header_static,
                featuredCollection
            }
        }
    } catch (error) {
        console.error(error)
    }
}

const getAccountLookup = async (mastodonHandle) => {
    try {
        const { data } = await axios.get(`https://mastodon.social/api/v1/accounts/lookup?acct=${mastodonHandle}`, {
            timeout: 15000
        })
        return data
    } catch (error) {
        if (error.status !== 200) {
            return null
        } else {
            console.error(error)
        }
    }
}

const getFeaturedCollection = async (mastodonHandle) => {
    try {
        // Handle extrahieren: entferne führendes @ falls vorhanden
        const cleanHandle = mastodonHandle.startsWith('@')
            ? mastodonHandle.slice(1)
            : mastodonHandle

        // Server und Username aus dem Handle extrahieren
        const atIndex = cleanHandle.indexOf('@')
        if (atIndex === -1) {
            console.error('Invalid mastodon handle format')
            return null
        }
        const username = cleanHandle.slice(0, atIndex)
        const mastodonServer = cleanHandle.slice(atIndex + 1)

        // Erst den Account auf seinem Home-Server nachschlagen um die lokale ID zu bekommen
        const lookupResponse = await axios.get(`https://${mastodonServer}/api/v1/accounts/lookup?acct=${username}`, {
            timeout: 15000
        })
        const localAccountId = lookupResponse.data.id

        // Dann die pinned statuses mit der lokalen ID abrufen
        const { data } = await axios.get(`https://${mastodonServer}/api/v1/accounts/${localAccountId}/statuses?pinned=true`, {
            timeout: 15000
        })
        // Nur die URLs extrahieren um Speicherplatz zu sparen
        return (data || []).map(status => status.url)
    } catch (error) {
        console.error('Error fetching featured collection:', error.message)
        return null
    }
}

export { calculateMastodonAccountScore, scoreMatrix }