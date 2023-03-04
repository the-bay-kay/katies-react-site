const router = require('express').Router();
let Post = require('../models/posts.model');

// handles http get requests on the /posts/ url path
// gets all posts within the database (not efficient for many posts? may rewrite)
router.route('/').get((req, res) => {
    console.log('a')
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const images = req.body.images;
    const tags = req.body.tags;
    const date = Date.parse(req.body.date);

    const newPost = new Post({
        title,
        body,
        images,
        tags,
        date
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// May not need this :)
router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.body = req.body.body;
            post.images = req.body.images;
            post.tags = req.body.tags;
            post.date = Date.parse(req.body.date);

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete/:id').post((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;