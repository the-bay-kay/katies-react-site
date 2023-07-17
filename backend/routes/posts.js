const router = require('express').Router();
let Post = require('../models/posts.model');
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });

// handles http get requests on the /posts/ url path
// gets all posts within the database (not efficient for many posts? may rewrite)
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('file'), (req, res) => {
    console.log('Addding post...')
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags.split(',') || [],
        thumbnail: req.file.path,
        date: new Date(),
    });

    console.log(newPost)
    
    Post.create(newPost)
        .then(() => res.status(200).json('Post added successfully!')) 
        .catch(err => res.status(400).json('Error: ' + err));
});

// I should proably add a middleware route to authenticate cookies 
// before allowing the user to edit or delete a post :)

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.postObj = req.body.postObj;
            post.date = Date.parse(req.body.date);

            post.save()
                .then(() => res.status(200).json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete/:id').post((req, res) => {
    console.log('Trying to delete....')
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;