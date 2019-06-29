# DESCRIPRION 


# 1 DEV-BACK API SERVER

## API

### Error response 

Error responce body in every fail
```javascript
  const error = {
    error: true,
    errorCode: number,
    message: message
  }
```

### autenticated query

```javascript
  const success = {
    token:string,
    props:[key], // returns object with only these props
    ... otherParams
  }
```

### Success responce

```javascript
  const success = {
    error: false,
    ...data,
  }
```

### POST UPDATE: `/users` ✅

Creates a user.

```javascript
const input = {
    username: string,
    password: string,
    intrests: [string],
    about: string,
    email: string,
    avatar:url,
}

const  output = {
    error: false,
  }
```

### GET: `/users/userId`

```javascript
const  output = {
    username: string,
    intrests: [string],
    about: string,
    userId: number,
    isFolowing: boolean,
    folowers:number,
    available,
    projects:[
      {
        name:string,
        projectId:number,
        upvotes:number,
        logo: url,
      }
    ]
}
```


### POST: `/connect` ✅

```javascript
const input = {
    login: string,
    password: string
}
      
const  output = {
    error:false,
    notifications:[{
      notificationId,
      type: string, // team, messages
      text: string,
      date:date,
      data: string
    }],
    myUpvotes,
    followers: number,
    projects:[project],
    isAvailable:boolean,
    token: {
      username,
      userId,
      avatar,
    }
  }
```

### GET: `/search/users?q=` 

```javascript
const input = {
    q: string,
}
      
const  output = {
    error:false,
    users:[],

  }
```


### POST: `users/folow/`

```javascript
const input = {
    userId: number,
    token,
}
      
const  output = {
    error:false,
  }
```

### POST: `users/unfolow/`

```javascript
const input = {
    userId: number,
    token,
}
      
const  output = {
    error:false,
  }
```

### GET: `/messages/${projectId}`
Get messages
```javascript
const input = {
    token:  string
}
      
const  output = {
    error:false,
    messages:[
      {
        content: string,
        date: date,
        from: number, // userId
        projectId: number,
      }
    ]
  }
```

### POST: `/messages/${projectId}`
Create message
```javascript
const input = {
    token:  string,
    message:{
      content: string,
    }
}

const  output = {
    error:false,
  }
```


### GET: `/projects?page=` 

```javascript
const input = {
    page: number,
}

const output = {
  error: false,
  projects: [{
    projectId: integer,
    name:string,
    team:[{
      username:string,
      avatar:url,
      userId:number
    }], // max lenght MAX_TEAM_LENGHT
    upvotes: integer // number of likes
  }] /// array of length <= NB_ELEMENTS_PER_PAGE
}
```

### POST: `/projects` creates a project 

```javascript
  const input = {
    project: {
      name:string
      acceptsAnyColaborators: boolean,
      team:[{
        userId: string || null,
        username: string || null,
        avatar: string || null,
        role:string,  // 'PO', 'DEV-FRONT', 'DESIGNER', 'LOGO DESIGNER', 'DEV-BACK'..., 'DATABASE'
        isAvailable: boolean
      }], // required if anyColaborators === false
      markdown: text, // required
    },
    
    token: string, // identification token
  }

const output = {
  error: false,
  projectId: number,
}
```

### UPDATE: `/projects/${projectId}`

```javascript
  const input = {
    project: {
      project_filed: data,
    },
    
    token: string, // identification token
  }

const output = {
  error:false,
  projectId:number,
}
```


### GET: `/projects/${projectId}`

```javascript
  const input = {
    projectId
  }

  const output = {
    acceptsAnyColaborator:boolean
    creationDate:date,
    projectId: number,
    name: string,
    upvotes: number,
    userUpvoted: boolean,
    master: userId,
    team:[
      {
        userId: string,
        username: string,
        role:string,  // 'PO', 'DEV-FRONT', 'DESIGNER', 'LOGO DESIGNER', 'DEV-BACK'..., 'DATABASE'
        isAvailable: boolean
       
      }
    ], // max lenght MAX_TEAM_LENGHT,
    availableRoles:[string], // this is generated not stoed in db
    description: string // markdown description part
  }
  ```

### POST: `/upvote/projectId`

```javascript
  const input = {
    token,
  }

  const output = {
    error:false,
    projectId,
    upvotes: integer,
  }
```

### POST: `/dowvote/projectId`

```javascript
  const input = {
    token,
  }

  const output = {
    error:false,
    projectId,
    upvotes: integer,
  }
```


### POST: `comment/projectId`

```javascript
  const input = {
    token,
    message:{
      text:string,
    },
  }

  const output = {
    error:false,
  }
```

### UPDATE: `comment/commentId`

```javascript
  const input = {
    token,
    message:{
      text:string,
    },
    comentId:integer,
  }

  const output = {
    error:false,
    projectId,
    upvotes: integer,
  }
```

### POST: `project/${projectId}/apply`
Creates an application request

```javascript
  const input = {
    token,
    role,
  }

  const output = {
    error:false,
    projectId
  }
```

### POST: `requests/${requestId}`
Accepts a request

```javascript
  const input = {
    token,
    isRejected:boolean,
  }

  const output = {
    error:false,
    projectId
  }
```

### GET: `/search/projects?q=`:

```javascript

  const input = {
    token,
    q: string,
    filters:{
      role:string,
      name:string
    }
  }

  const output = {
    error:false,
    projects:[
      {
        projectId,
        name,
        team:[],
        availableRoles:[],
      }
    ]
  }
```

### GET `user/verify/?data=` ✅

```javascript

  const input = {
    token,
    data:string
  }

  const output = {
    error:false
  }
```

## Database

### user db shema

```javascript
{
    username: string,
    password: string,
    intrests: [string],
    about: string,
    email: string,
    userId: number,
    creationDate: current_time_stamp,
    isVerified:boolean,
    myUpvotes:number,
    isAvailable:boolean,
}
```

### requests db shema

```javascript
{
  userId,
  projectId,
  requestId,
  role:string,
  rejected:boolean,
}
```

### project db shema 

```javascript
{   tags:[string]
    creationDate:date,
    projectId: number,
    name: string,
    master: userId,
    upvotes: number,
    team:[
      {
        userId: string || null,
        username: string || null,
        avatar: string || null,
        role: string,
        isOpen: boolean,
      }
    ],
    description: string // markdown description part
}
```

### upvotes db shema

```javascript
{
  upvoteId: number,
  projectId: numbre,
  userId: number
}
```

### messages db shema

```javascript
{
  date: date,
  messageId: numbre,
  message: string,
  projectId: numbre,
  userId: number
}
```

### comments db shema

```javascript
{
  date: date,
  commentId: numbre,
  message: string,
  projectId: numbre,
  userId: number
}
```


### notification db shema

```javascript
{
  creationDate: date
  notificationType: string,
  text: string,
  elementId: integer, // link to the project or message
  isRead: boolean,
}
```


### folowing_links db shema

{
  linkId: integer,
  user:userId,
  folows:userId,
}




## Privacy and rignts

### Public data no need  autentication:
  /projects
  /users/userId
  /roles

### rules:
  messages are visible by team members only
  one user one role
  only master can add users


## Project structure

+-- node_modules
+-- src
  |  +-- Rooter
  |  |  +-- users
  |  |  |  index.js (all sub roots user/*)
  |  |  |   user.logic.js (logic functions of every sub-root)
  | constant.js (ALL CONSTANTS)
  | index.js (the server start)
  | utils.js (utils functions: type validation, tocken validation...)
.eslint.rc
.gitignore
package-lock.json
package.json
readme.md


## USER STORYES

### Sing up

- 1 the user provides an email and a password

- 2 the email and password are verified if they have the valid format, validation functions are in `utils.js`

- 3 the email is looked up in the database, `send email again` is sent if the email exists and the flag `verified === false`

- 4 if not, a user (see ### user db shema) is added to the the database with the flag `verified:false`, `creationDate: current_time_stamp`

- 5 an email is generated that links to `/verify-email?userId=userId&hash=hashOf(SEECRET_KEY, userId)`

- 6 the `validated` flag is set to `false` and the password to `hash(password)`

- 7 a respose message is send


### Verify email

- 1 the user goes to `/user/verify?userId=userId&hash=hashOf(SEECRET_KEY, userId)`

- 2 varify that `hash===hashOf(SEECRET_KEY, userId)` send bad request if not

- 3 verify that `user.creationDate + VALIDATION_URL_LIFE_TIME < current_time_stamp` send bad request if not

- 4 set `validated` flag to `true`

- 5 the user is redirected to the main page

### sing in

- 1 the user provides an email and a password

- 2 the email and password are verified if they have the valid format (`utils.js`)

- 3 if the user with `email` and `hash(password)` is not in the table send an error

- 4 if he is than create a jwt token signed with `SECRETE_KEY` and  life time of `JWT_LIFE_TIME`

- 5 store `userId`, `email`, `name`, `avatar` in the jwt tocken

- 6 remove hidden data

- 7 select all the notifications of the user where `notification.red === false` ordered by `creationDate`

- 8 count the number of the upvotes of the user

- 9 return the success output of `POST:/connect` 

### Edit user

- 1 if token is unvalid return an error

- 2 check new data format (`utils.js`)

- 3 update data with new data

- 4 return success message

### Create project

- 1 if token is unvalid return an error

- 2 check the data format (`utils.js`) return error message if data is invalid

- 3 create project in db (see ### mproject db shema)

- 4 return success message

### get projects

- 1 select projects ordered by upvotes limited
- 2 