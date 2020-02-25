const express = require('express')
const knex = require('../db/knex')
const router = express.Router()


function isValidId(req,res,next) {
    if(!isNaN(req.params.id)) return next()
    next(new Error('Invalid ID'))
}

router.get('/:id', isValidId, (req, res, next) => {  
    knex('teacher_users')
        .innerJoin('user', 'users.id', 'teacher_users.user_id')
        .innerJoin('teacher', 'teachers.id', 'teacher_users.teacher_id')
        .where('user.id', req.params.id)
        .then(users => {
            res.json({teachers : users})
        })
}) 

module.exports = router
