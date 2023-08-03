import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export async function fetchReferencedDocument(ref) {
    try {
        const query = `*[ _id == $ref ]`;
        const params = { ref };
        const response = await client.fetch(query, params);
        return response[0];
    } catch (error) {
        console.error('Error fetching referenced document:', error);
        return null;
    }
}
