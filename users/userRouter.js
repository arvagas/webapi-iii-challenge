const express = 'express'

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

//route handling
router.post('/', (req, res) => {

})

router.post('/:id/posts', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {

})

router.get('/:id/posts', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

module.exports = router;
