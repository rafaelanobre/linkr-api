import { createPostDB, deletePostDB, getPostByUserIdDB, getTimelinePostsDB, searchPostById, searchPostByIdWithHashtags, updatePost } from "../repositories/post.repository.js";
import { extractAndFormatHashtags, getDescriptionWithoutHashtags, insertHashtagsIntoNewPost, insertMetadataIntoPosts, removeHashtagsFromPost } from "../services/posts.services.js";

export async function publishPostForTimeline(req, res) {
    const { url, description } = req.body;
    const hashtags = extractAndFormatHashtags(description);
    const descriptionWithoutHashtags = await getDescriptionWithoutHashtags(description);
    try {
        const { rows: [post]} = await createPostDB(res.locals.userId, new Date(), url, descriptionWithoutHashtags);
        if (hashtags.length > 0) {
            await insertHashtagsIntoNewPost(hashtags, post)
        }

        res.status(200).send(post);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}

export async function getPostsForTimeline(req, res) {
    const { offset } = req.query;
    try {
        const limit = 10;
        const { rows: posts } = await getTimelinePostsDB(limit, offset, res.locals.userId);
        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });
        const postsWithMetadata = await insertMetadataIntoPosts(posts);
        res.status(200).send(postsWithMetadata);
    } catch (error) {
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}


export async function getPostUserById(req, res) {
    const { offset } = req.query;
    try {
        const limit = 10;
        const { rows: posts } = await getPostByUserIdDB(Number(req.params.id), limit, offset);
        if (posts.rowCount === 0) return res.status(204).send({ message: 'There are no posts yet' });
        const postsWithMetadata = await insertMetadataIntoPosts(posts);
        res.status(200).send(postsWithMetadata);
    } catch (error) {
        const errorMessage = error.message ? error.message : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function DeletePost(req, res) {
    try {
        const del = await deletePostDB(res.locals.userId, Number(req.params.postId));
        if (del.rowCount === 0) return res.status(401).send("you do not have authorization to delete this post")
        res.sendStatus(200);
    } catch (error) {
        const errorMessage = error.message ? error.message : "it was not possible to delete.";
        res.status(500).send(errorMessage);
    }
}

export async function editPost(req, res) {
    const { id } = req.params;
    const { description } = req.body;
    const hashtags = extractAndFormatHashtags(description);
    const descriptionWithoutHashtags = getDescriptionWithoutHashtags(description);
    try {
        const { rows: [post] } = await searchPostById(id);
        if (!post) return res.status(404).send({ message: 'Não foi possível encontrar esse post.' });
        if (post.createdBy !== res.locals.userId) return res.status(403).send({ message: 'Você não pode editar esse registro.' });
        const { rows: [newPost] } = await updatePost(descriptionWithoutHashtags, id);

        if (hashtags.length > 0) {
            await removeHashtagsFromPost(hashtags, newPost);
            const uniqueHashtags = Array.from(new Set(hashtags));
            const newHashtags = uniqueHashtags.filter(tag => !newPost.hashtags.some(existingTag => existingTag.hashtag === tag));
            if(newHashtags.length > 0) await insertHashtagsIntoNewPost(newHashtags, newPost);
        }

        const { rows: [updatedPost] } = await searchPostByIdWithHashtags(id);
        res.status(200).send(updatedPost);
    } catch (error) {
        const errorMessage = error.message ? error.message : 'An internal server error occurred.';
        res.status(500).send(errorMessage);
    }
}

export async function repost(req, res) {
    const {postId} = req.body;
    
   
    try {
       const Post = await db.query(`SELECT * FROM posts WHERE "id" = $1`,
        [postId])
        if(postId.rowCount === 0 ) return  res.status(404).send("Post not be found")
        await createrepostDB(res.locals.userId, new Date(), Post.rows[0].url, Post.rows[0].description, postId, Post.rows[0].createdBy);

        console.log(Post)
        res.status(200).send(Post)
    } catch (err) {
        
       res.status(500).send(err.message);
    }
}