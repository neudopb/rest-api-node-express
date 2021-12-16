const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', async function (req, res, next) {
    try {
        const posts = await postsService.getPosts();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

router.get('/posts/:id', async function (req, res, next) {
    try {
        const post = await postsService.getPost(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
});

router.get('/posts/title/:title', async function (req, res, next) {
    try {
        const post = await postsService.getPostByTitle(req.params.title);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
})

router.post('/posts', async function (req, res, next) {
    const post = req.body;
    try {
        const newPost = await postsService.savePost(post);
        res.status(201).json(newPost);
    } catch (err) {
        next(err);
    }
});

router.put('/posts/:id', async function (req, res, next) {
    const post = req.body;
    try {
        await postsService.updatePost(req.params.id, post);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/posts/:id', async function (req, res, next) {
    try {
        await postsService.deletePost(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;