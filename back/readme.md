# Todo list API

A todo list api.Technologies used: NodeJs/Express, Knex/Bookshelf, PostgreSQL.

## Installation
1) Install [NodeJs](https://nodejs.org/en/download/) 
2) Install [PostgreSQL](https://www.postgresql.org/download/)
3) Create database named "todo_test" with user - username: "cubex", password "cubex".
4) Run following commands in console:
```bash
git clone https://github.com/hulkofsky/todo_api
```
```bash
cd todo_api
```
Rename "example.env" to ".env"
```bash
npm run create
```
```bash
npm run seed
```
```bash
npm run alter
```
```bash
npm run start
```
## API documentation

1) Register a new user:

- POST: /register

- Request(x-www-form-urlencoded) body:
```json
{
    "email": "String",
    "password": "String",
    "username": "String",
}
```

- Response:
```json
{
    "success": "Boolean",
    "id": "Number",
    "token": "String",
    "username": "String"
}
```


2) Login as registered user:

- POST: /login

- Request(x-www-form-urlencoded) body: 
```json
{
    "email": "String",
    "password": "String"
}
```

- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "token": "String"
    }
}
```
3) Logout:
- POST: /logout

- Request headers: 
```json
{
    "token": "String"
}
```
- Request(x-www-form-urlencoded) body:
```json
{
    "user_id": "Number"
}
```
- Response:
```json
{
    "success": "Boolean",
    "message": "String"
}
```

4) Homepage 
- GET: /

- Request headers:
```json
{
    "token": "String",
    "user_id": "Number"
}
```

- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String",
    }
    "projects": [
        {
            "id": "Number",
            "project_name": "String",
            "color": "String",
            "user_id": "Number",
            "tasks": [
                {
                    "id": "Number",
                    "task_name": "String",
                    "priority_id": "Number",
                    "deadline": "Timestamp",
                    "is_done": "Boolean",
                    "project_id": "Number"
                    "priority": {
                        "id": "Number",
                        "priority_color": "String"
                    }
                },
                ...
            ],
            "todaysTasks": [
                {
                    "id": "Number",
                    "task_name": "String",
                    "priority_id": "Number",
                    "deadline": "Timestamp",
                    "is_done": "Boolean",
                    "project_id": "Number"
                     "priority": {
                        "id": "Number",
                        "priority_color": "String"
                    }
                },
                ...
            ],
            "deadlinedTasks": [
                 {
                    "id": "Number",
                    "task_name": "String",
                    "priority_id": "Number",
                    "deadline": "Timestamp",
                    "is_done": "Boolean",
                    "project_id": "Number"
                     "priority": {
                        "id": "Number",
                        "priority_color": "String"
                    }
                },
                ...
            ],
            ...
        }
    ]
}
```

5) Done tasks
- GET: /:userId/done

- Request headers:
```json
{
    "token": "String",
}
```

- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String",
    }
    "projects": [
        {
            "id": "Number",
            "project_name": "String",
            "color": "String",
            "user_id": "Number",
            "tasks": [
                {
                    "id": "Number",
                    "task_name": "String",
                    "priority_id": "Number",
                    "deadline": "Timestamp",
                    "is_done": "Boolean",
                    "project_id": "Number"
                     "priority": {
                        "id": "Number",
                        "priority_color": "String"
                    }
                },
                ...
            ],
            "doneTasks": [
                {
                    "id": "Number",
                    "task_name": "String",
                    "priority_id": "Number",
                    "deadline": "Timestamp",
                    "is_done": "Boolean",
                    "project_id": "Number"
                     "priority": {
                        "id": "Number",
                        "priority_color": "String"
                    }
                },
                ...
            ],
            ...
        }
    ]
}
```


5) Project with tasks by Id:
- GET: /:userId/projects/:projectId

- Request headers:
```json
{
    "token": "String",
}
```

- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String",
    }
    "projects": {
        "id": "Number",
        "project_name": "String",
        "color": "String",
        "user_id": "Number",
        "tasks": [
            {
                "id": "Number",
                "task_name": "String",
                "priority_id": "Number",
                "deadline": "Timestamp",
                "is_done": "Boolean",
                "project_id": "Number",
                "priority": {
                    "id": "Number",
                    "priority_color": "String"
                }
            },
            ...
        ]
    }
}
```

5) Add new project:
- POST: /:userId/projects

- Request headers:
```json
{
    "token": "String",
}
```

- Request(x-www-form-urlencoded) body:
```json
{
   "project_name": "String",
   "color": String(example: "#000000")
}
```
- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String"
    },
    "project": {
        "project_name": "String",
        "color": String(example: "#000000"),
        "user_id": "Number",
        "id": "Number"
    }
}
```

6) Update project:
- PUT: /:userId/projects/:projectId

- Request headers:
```json
{
    "token": "String",
}
```

- Request(x-www-form-urlencoded) body:
```json
{
   "project_name": "String",
   "color": String(example: "#000000")
}
```
- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String"
    },
    "project": {
        "id": "Number",
        "project_name": "String",
        "color": String(example: "#000000"),
        "user_id": "Number",
        "tasks": [
            {
                "id": "Number",
                "task_name": "String",
                "priority_id": "Number",
                "deadline": "Timestamp",
                "is_done": "Boolean",
                "project_id": "Number",
                "priority": {
                    "id": "Number",
                    "priority_color": "String"
                }
            },
            ...
        ]
    }
}
```

7) Delete project:
- DELETE: /:userId/projects/:projectId

- Request headers:
```json
{
    "token": "String",
}
```
- Response:
```json
{
    "success": "Boolean",
    "message": "String"
}
```




8) Add new task:
- POST: /:userId/projects/:projectId/tasks

- Request headers:
```json
{
    "token": "String",
}
```

- Request(x-www-form-urlencoded) body:
```json
{
    "task_name": "String",
    "priority_id": "Number",
    "deadline": "Timestamp",
    "is_done": "Boolean",
}
```
- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String"
    },
    "task": {
        "task_name": "String",
        "priority_id": "Number",
        "deadline": "Timestamp",
        "is_done": "Boolean",
        "project_id": "Number",
        "id": "Number"
    }
}
```

9) Update task:
- PUT: /:userId/projects/:projectId/tasks/:taskId

- Request headers:
```json
{
    "token": "String",
}
```

- Request(x-www-form-urlencoded) body:
```json
{
    "task_name": "String",
    "priority_id": "Number",
    "deadline": "Timestamp",
    "is_done": "Boolean",
}
```
- Response:
```json
{
    "success": "Boolean",
    "user": {
        "id": "Number",
        "username": "String",
        "email": "String",
        "password": "String",
        "token": "String"
    },
    "task": {
        "id": "Number",
        "task_name": "String",
        "priority_id": "Number",
        "deadline": "Timestamp",
        "is_done": "Boolean",
        "project_id": "Number",
    }
}
```

10) Delete task:
- DELETE: /:userId/projects/:projectId/tasks/:taskId

- Request headers:
```json
{
    "token": "String",
}
```
- Response:
```json
{
    "success": "Boolean",
    "message": "String"
}
```

## License
[ISC](https://choosealicense.com/licenses/isc/)