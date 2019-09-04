const express = require('express')

const postDB = require('./postDb')

const router = express.Router()

router.use(express.json())

// @@@@@@@@@@ Custom Middleware @@@@@@@@@@
function validatePostId(req, res, next) {
    const { id } = req.params

    postDB.getById(id)
    .then(post => {
        if (post) next()
        else res.status(400).json({ message: "invalid post id" })
    })
    .catch(err => res.status(500).json({ message: "error validating post id" }))
}

// @@@@@@@@@@ GET requests @@@@@@@@@@
router.get('/', (req, res) => {
    postDB.get()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ message: 'list of posts could not be retrieved' }))
})

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params

    postDB.getById(id)
    .then(post => res.json(post))
    .catch(err => res.status(500).json({ message: "error retrieving post" }))
})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})

module.exports = router