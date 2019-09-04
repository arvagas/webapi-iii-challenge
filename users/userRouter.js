const express = require('express')

const router = express.Router()

const db = require('./userDb')

//custom middleware
function validateUserId(req, res, next) {
    const { id } = req.params

    db.getById(id)
    .then(user => {
        if (user) next()
        else res.status(400).json({ message: "invalid user id" })
    })
    .catch(err => res.status(500).json({ message: "error validating user id" }))
}

function validateUser(req, res, next) {
    const validUser = req.body

    switch(validUser) {
        case !validUser :
            res.status(400).json({ message: "missing user data" })
        case !validUser.name :
            res.status(400).json({ message: "missing required name field" })
        case validUser && validUser.name :
            next()
    }
}

function validatePost(req, res, next) {
    const validPost = req.body

    switch(validPost) {
        case !validPost :
            res.status(400).json({ message: "missing post data" })
        case !validPost.text :
            res.status(400).json({ message: "missing required text field" })
        case validPost && validPost.text :
            next()
    }
}

router.post('/', (req, res) => {

})

router.post('/:id/posts', (req, res) => {

})

// @@@@@@@@@@ GET requests @@@@@@@@@@
router.get('/', (req, res) => {
    db.get()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ message: 'list of users could not be retrieved' }))
})

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params

    db.getById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ message: "error retrieving user" }))
})

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params

    db.getUserPosts(id)
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ message: "error retrieving user's posts" }))
})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

module.exports = router;
