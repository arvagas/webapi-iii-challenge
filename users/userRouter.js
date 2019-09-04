const express = require('express')

const userDB = require('./userDb')
const postDB = require('../posts/postDb')

const router = express.Router()

router.use(express.json())

// @@@@@@@@@@ Custom Middleware @@@@@@@@@@
function validateUserId(req, res, next) {
    const { id } = req.params

    userDB.getById(id)
    .then(user => {
        if (user) next()
        else res.status(400).json({ message: "invalid user id" })
    })
    .catch(err => res.status(500).json({ message: "error validating user id" }))
}

function validateUser(req, res, next) {
    const validUser = req.body

    if (!validUser) res.status(400).json({ message: "missing user data" })
    else if (!validUser.name) res.status(400).json({ message: "missing required name field" })
    else if (validUser && validUser.name) next()
}

function validatePost(req, res, next) {
    const validPost = req.body

    if (!validPost) res.status(400).json({ message: "missing post data" })
    else if (!validPost.text) res.status(400).json({ message: "missing required text field" })
    else if (validPost && validPost.text) next()
}

// @@@@@@@@@@ POST requests @@@@@@@@@@
router.post('/', validateUser, (req, res) => {
    const newUser = req.body

    userDB.insert(newUser)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: "error adding new user" }))
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const newPost = req.body

    postDB.insert(newPost)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ message: "error adding new post to user" }))
})

// @@@@@@@@@@ GET requests @@@@@@@@@@
router.get('/', (req, res) => {
    userDB.get()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'list of users could not be retrieved' }))
})

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params

    userDB.getById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: "error retrieving user" }))
})

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params

    userDB.getUserPosts(id)
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ message: "error retrieving user's posts" }))
})

// @@@@@@@@@@ DELETE request @@@@@@@@@@
router.delete('/:id', validateUserId, (req, res) => {
    const { id } = req.params

    userDB.getById(id)
    .then(user => {
        userDB.remove(id)
        .then(remUser => res.json(user))
        .catch(err => res.status(500).json({ message: "error deleting user" }))
    })
    .catch(err => res.status(500).json({ message: "error retrieving user for deletion" }))
})

// @@@@@@@@@@ PUT request @@@@@@@@@@
router.put('/:id', validateUser, (req, res) => {
    const { id } = req.params
    const updateUser = req.body

    userDB.update(id, updateUser)
    .then(user => res.json({ id: id, ...updateUser }))
    .catch(err => res.status(500).json({ message: "error updating user" }))
})

module.exports = router;
