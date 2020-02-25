const express = require('express')

const router = express.Router()

const queries = require('../db/queries')

function isValidId(req,res,next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

function validUser(user) {
    const hasName = typeof user.username == 'string' && user.username.trim() != ''
    const hasEmail = typeof user.email == 'string' && user.email.trim() != ''
    return hasName && hasEmail  
}

router.get('/', (req,res) => {
    queries.getAllUsers().then(users => {
        res.json(users)
    })
})

router.get('/:id', isValidId, (req,res) => {
    queries.getOneUser(req.params.id).then(user => {
        if(user) {
            res.json(user)
        } else {
            res.status(404)
            next()
        }
    })
})

router.post('/', (req, res, next) => {
    if(validUser(req.body)) {
        queries.createUser(req.body).then(users => {
            res.json(users[0])
        })
    } else {
        next(new Error('Invalid user'))
    }
})

router.put('/:id', isValidId, (req,res,next) => {
    if(validUser(req.body)){
        queries.updateUser(req.params.id, req.body).then(users => {
            res.json(users[0])
        })
    } else {
        next(new Error('Invalid user'))
    }
})

router.delete('/:id', isValidId, (req, res) => {
    queries.deleteUser(req.params.id).then(() => {
        res.json({
            deleted: true
        })
    })
})

module.exports = router