import axios from 'axios';

const scoreMatrix = {
    display_name: 10,
    note: 10,

    verified_fields: 20,
    discoverable: 20,
    indexable: 20,
    featuredCollection: 20
}

const calculateMastodonAccountScore = async (mastodonHandle) => {
    try{
        const account = await getAccountLookup(mastodonHandle)
        if(!account){
            console.error('could not load account')
            return
        }
        const {username, display_name, note, discoverable, indexable, fields, avatar_static, header_static} = account
        const featuredCollection = await getFeaturedCollection(username, mastodonHandle)
        let score = 0;
        if(display_name != '') score += scoreMatrix.display_name
        if(note != '') score += scoreMatrix.note

        if(discoverable === true) score +=scoreMatrix.discoverable
        if(indexable === true) score +=scoreMatrix.indexable
        if(!!featuredCollection) score +=scoreMatrix.featuredCollection

        const verifiedFields = fields.filter(field=>field.verified_at != null)

        if(verifiedFields.length) score += scoreMatrix.verified_fields

        return {
            score,
            scoreMatrix,
            values: {
                username,
                display_name,
                note,
                discoverable,
                verifiedFields,
                avatar_static,
                header_static,
                featuredCollection
            }
        }
    }catch(error){
        console.error(error)
    }
}

const getAccountLookup = async (mastodonHandle) => {
    try{
        const {data} = await axios.get(`https://mastodon.social/api/v1/accounts/lookup?acct=${mastodonHandle}`, {
            timeout: 15000
        })
        return data
    }catch(error){
        if(error.status !== 200){
            return null
        }else{
            console.error(error)
        }
    }
}

const getFeaturedCollection = async (username, mastodonHandle) => {
    try{
        const mastodonServer = mastodonHandle.slice(mastodonHandle.indexOf('@')+1)
        
        const {data} = await axios.get(`https://${mastodonServer}/users/${username}/collections/featured`, {
            timeout: 15000,
            headers: {
                'Content-Type': 'application/ld+json',
            }
        })
        return data.orderedItems
    }catch(error){
            if(error.status !== 200){
                return null
            }else{
                console.error(error)
            }
    }
}

export { calculateMastodonAccountScore, scoreMatrix}