const db = require('../../data/dbConfig')


async function getProject() {
    const projectRows = await db('projects as p')
        .select('p.*')
        .orderBy('p.project_id')
        
    const projectArr = []

    projectRows.forEach((row) => {
        if(row.project_completed === 1){
           row.project_completed = true
        }else{
            row.project_completed = false
        }
        projectArr.push(row)
    })

    
return projectArr
   
}

async function findById(project_id) {
    return db('projects').where({project_id})
}

  function add(project) {
    console.log("project", project)
    return db("projects")
    .insert(project)
    .then(([project_id]) => db("projects").where({ project_id }))
    .then(([proj]) => {
        if (proj) {
            return { ...proj, project_completed: proj.project_completed ? true : false };
        } else {
            throw new Error("Project not found");
        }
    });
}
   

module.exports = {
    getProject,
    add,
    findById
}