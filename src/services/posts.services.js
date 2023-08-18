import urlMetadata from 'url-metadata';

export async function getMetadata(url) {
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
