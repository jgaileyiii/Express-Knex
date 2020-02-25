const express = require('express')

const router = express.Router()

const queries = require('../db/queries')

function isValidId(req,res,next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

function validTeacher(teacher) {
    const hasName = typeof teacher.name == 'string' && teacher.name.trim() != ''
    const hasInstrument = typeof teacher.instruments == 'string' && teacher.instruments.trim() != ''
    const hasBio = typeof teacher.bio == 'string' && teacher.bio.trim() != ''
    return hasName && hasInstrument && hasBio
}

router.get('/', (req,res) => {
    queries.getAllTeachers().then(teachers => {
        res.json(teachers)
    })
})

router.get('/:id', isValidId, (req,res) => {
    queries.getOneTeacher(req.params.id).then(teacher => {
        if(teacher) {
            res.json(teacher)
        } else {
            res.status(404)
            next()
        }
    })
})

router.post('/', (req, res, next) => {
    if(validTeacher(req.body)) {
        queries.createTeacher(req.body).then(teachers => {
            res.json(teachers[0])
        })
    } else {
        next(new Error('Invalid Teacher'))
    }
})

router.put('/:id', isValidId, (req,res,next) => {
    if(validTeacher(req.body)){
        queries.updateTeacher(req.params.id, req.body).then(teachers => {
            res.json(teachers[0])
        })
    } else {
        next(new Error('Invalid Teacher'))
    }
})

router.delete('/:id', isValidId, (req, res) => {
    queries.deleteTeacher(req.params.id).then(() => {
        res.json({
            deleted: true
        })
    })
})

module.exports = router