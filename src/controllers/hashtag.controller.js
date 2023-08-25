import { getPostsByHashtags, getTrendingHashtags } from "../repositories/hashtag.repository.js";
import { insertMetadataIntoPosts } from "../services/posts.services.js";

export async function trendingHashtags(req,res){
    try{
        const { rows: trending} = await getTrendingHashtags();
        res.status(200).send(trending);
    } catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}

export async function postsByHashtag(req,res){
    const {id} = req.params;
    try{
        const { rows: posts } = await getPostsByHashtags(id);
        
        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });

        const postsWithMetadata = await insertMetadataIntoPosts(posts);
        res.status(200).send(postsWithMetadata);
    }catch(error){
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}