const db = require('../../data/dbConfig')

async function getTask() {
    const taskRows = await db ('projects as p')
        .leftJoin('tasks as t', 'p.project_id', 't.project_id')
        .select(
            't.task_id',
            't.task_description',
            't.task_notes',
            't.task_completed',
            'p.project_name',
            'p.project_description'
        )
        .orderBy('t.task_id')
        const taskArr = []
        taskRows.forEach((row) => {
            if(row.task_completed === 1){
               row.task_completed = true
            }else{
                row.task_completed = false
            }
            taskArr.push(row)
        })
  
    return taskArr
}

async function findTaskById(task_id) {
    return db('tasks').where({task_id})
}


async function addTask(task) {
    return db('tasks')
    .insert(task)
    .then(([task_id]) => db("tasks").where({ task_id }))
    .then(([task]) => {
        if (task) {
            return { ...task, task_completed: task.task_completed ? true : false };
        } else {
            throw new Error("Project not found");
        }
    });




    //    const taskRow = await db('tasks')
//        .insert(task)
//        .then(([task_id]) => {
//         return findTaskById(task_id)
//        })
//        return taskRow
       }
    

module.exports = {
    getTask,
    addTask,
    findTaskById
}