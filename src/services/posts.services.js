import urlMetadata from 'url-metadata';

export async function getMetadata(url) {
    try {
        const metadata = await urlMetadata(url, { ensureSecureImageRequest: true }) || {};
        return metadata;
    } catch (error) {
        console.error('Error getting metadata for URL:', url);
        console.error('Error details:', error);
        return null;
    }
}
