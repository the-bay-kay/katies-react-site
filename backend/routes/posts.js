const router = require('express').Router();
let Post = require('../models/posts.model');

// handles http get requests on the /posts/ url path
// gets all posts within the database (not efficient for many posts? may rewrite)
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    let newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        images: req.body.images,
        tags: req.body.tags,
        date: Date.parse(req.body.date)
    });
    Post.create(newPost)
    console.log('Done!')
});

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