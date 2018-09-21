module.exports = [
    {
        task_name: `Choose songs`,
        priority_id: 1,
        deadline: `2018-10-8 00:00:00`,
        is_done: true,
        project_id: 1
    },
    {
        task_name: `Go on the stage`,
        priority_id: 2,
        deadline: `2018-10-10 20:00:00`,
        is_done: false,
        project_id: 1
    },
    {
        task_name: `Play songs`,
        priority_id: 3,
        deadline: `2018-10-10 20:30:00`,
        is_done: false,
        project_id: 1
    },

    {
        task_name: `Wash dishes`,
        priority_id: 1,
        deadline: `2018-10-15 00:00:00`,
        is_done: true,
        project_id: 2
    },

    {
        task_name: `Buy cats food`,
        priority_id: 3,
        deadline: `2018-10-12 00:00:00`,
        is_done: true,
        project_id: 2
    },
    {
        task_name: `Play songs`,
        priority_id: 3,
        deadline: `2018-09-21 20:30:00`,
        is_done: false,
        project_id: 1
    },

    {
        task_name: `Wash dishes`,
        priority_id: 1,
        deadline: `2018-09-21 00:00:00`,
        is_done: true,
        project_id: 2
    },

    {
        task_name: `Buy cats food`,
        priority_id: 3,
        deadline: `2018-09-21 00:00:00`,
        is_done: true,
        project_id: 2
    },
]

// `CREATE TABLE IF NOT EXISTS tasks(
//     id SERIAL PRIMARY KEY,
//     task_name TEXT NOT NULL,
//     priority_id INT NOT NULL,
//     deadline TIMESTAMP NOT NULL,
//     is_done BOOLEAN NOT NULL,
//     project_id INT NOT NULL
// );`,