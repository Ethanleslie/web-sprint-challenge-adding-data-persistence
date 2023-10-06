const router = require('express').Router()

const Project = require('./model')

router.get('/', (req, res, next) => {
        Project.getProject(req.params)
         .then(proj => {
            res.status(200).json(proj)
         })
         .catch(next)
    })
    
router.post('/',  (req, res, next) => {
        const projInfo = req.body;
        console.log("proj", projInfo)
        
        Project.add(projInfo)
            .then(proj => {
                res.status(200).json(proj)
            })
            .catch(next)
})





router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack,
    })
})


module.exports = router