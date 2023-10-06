const db = require('../../data/dbConfig')

async function getResource() {
   const resourceRows = await db('resources as r')
        .select('r.*')
        .groupBy('r.resource_id')


        return resourceRows
}

async function findResourceById(resource_id) {
    return db('resources').where({resource_id}).first()
}

  function addResource(resource) {
      return db('resources')
       .insert(resource)
       .then((resource_id) => {
        return findResourceById(resource_id)
       })
       }

module.exports = {
    getResource,
    addResource,
    findResourceById
}