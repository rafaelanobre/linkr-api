import urlMetadata from 'url-metadata';
import { createNewHashtag, deleteLinkPostAndHashtag, downHashtagTotal, linkPostAndHashtag, selectExistingHashtag, topHashtagTotal } from '../repositories/hashtag.repository.js';


export async function getMetadata(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    try {
        const metadata = await urlMetadata(url, { ensureSecureImageRequest: true }) || {};
        const title = metadata['og:title'];
        const description = metadata['og:description'];
        const image = metadata['og:image'];
        return {title, description, image};
    } catch (error) {
        console.error('Error getting metadata for URL:', url);
        console.error('Error details:', error);
        return null;
    }
}

export async function insertMetadataIntoPosts(posts){
    return Promise.all(posts.map(async (post) => {
        const metadata = post.url ? await getMetadata(post.url) : {};
        return {...post,metadata};
    }))
}

export async function extractAndFormatHashtags(description) {
    const hashtagsArray = description.match(/#(\w+)/g) || [];
    const hashtags = hashtagsArray.map(hashtag => hashtag.replace('#', ''));
    return hashtags;
}

export async function getDescriptionWithoutHashtags(description) {
    return description.replace(/#(\w+)/g, '').trim();
}

export async function insertHashtagsIntoNewPost(hashtags, post){
    const uniqueHashtags = Array.from(new Set(hashtags));

    await Promise.all(uniqueHashtags.map(async (tag) => {
        const { rows: [existingTag] } = await selectExistingHashtag(tag);
        if (existingTag !== undefined) {
            await topHashtagTotal(existingTag.id);
        } else {
            await createNewHashtag(tag);
        }

        const { rows: [newTag] } = await selectExistingHashtag(tag);
        await linkPostAndHashtag(post.rows[0].id, newTag.id);
        }));
}

export async function removeHashtagsFromPost(hashtags, post){
    await Promise.all(post.hashtags.map(async (hashtag) => {
        if (!hashtags.includes(hashtag.hashtag)) {
            await deleteLinkPostAndHashtag(post.id, hashtag.hashtagId);
            await downHashtagTotal(hashtag.hashtagId);
        }
    }));
}