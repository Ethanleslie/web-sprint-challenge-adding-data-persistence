const router = require('express').Router()

const Resource = require('./model')


router.get('/', (req, res, next) => {
    Resource.getResource(req.params)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})


router.post('/', (req, res, next) => {
    const resourceInfo = req.body;
    console.log(resourceInfo)
        Resource.addResource(resourceInfo)
            .then(resource => {
                res.status(200).json(resource)
            })
            .catch(next)
})


module.exports = router