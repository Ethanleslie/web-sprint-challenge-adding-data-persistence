const router = require('express').Router()

const Task = require('./model')

router.get('/', (req, res, next) => {
    Task.getTask(req.params)
        .then(task => {
            res.status(200).json(task)
        })
        .catch(next)
})


router.post('/', (req, res, next) => {
    const taskInfo = req.body;
   // console.log(taskInfo)
    Task.addTask(taskInfo)
        .then(task => {
            console.log(task)
        res.status(200).json(task)
    })
    .catch(next)
})


module.exports = router;