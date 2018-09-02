To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions] and run it by executing `mongod`
- `npm run dev` to start the local server


# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Error Handling

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have [error messages the clients can understand]


# API Details

## User Login API

- URL : http://127.0.0.1:3001/api/users/login

-   input:
    {
	    "user": {
		    "email": "shryas.sk@gmail.com",
		    "password": "password"
	    }
    }

-   output:
    {
	    "Status": "success",
	    "user": {
            "id": "5b8b7d3880f32f680920ba41",
            "username": "shreyas",
            "email": "shryas.sk@gmail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViO…jU2fQ.bFLHIaPxgGO1HR6jke51dSY7Z6YcMhe0eML67hKCsXE",
            "role": "1"
	    }
    }   

## Registration User API

- URL : http://127.0.0.1:3001/api/user/save

-   input:
    {
        "user": {
            "username": "testtwo",
            "password": "testtwo",
            "email": "testtwo@test.com",
            "role": 3,
            "dob": "10-01-2001"
	    }
    }

-   output:
    {
        "user": {
            "id": "5b8c1301125823e837fdfd3d",
            "username": "testtwo",
            "email": "testtwo@test.com",
            "role": "3",
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGMxMzAxMTI1ODIzZTgzN2ZkZmQzZCIsInVzZXJuYW1lIjoidGVzdHR3byIsImV4cCI6MTU0MTA5MDU2MSwiaWF0IjoxNTM1OTA2NTYxfQ.cD3KO0esKgzhNBNYOrBhKJ4SpoCkGfsGM2OXRQv5Gcs"
        }
    }



## Get All User API

- URL : http://127.0.0.1:3001/api/getAlluser

- Headers: 
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGI3ZDM4ODBmMzJmNjgwOTIwYmE0MSIsInVzZXJuYW1lIjoic2hyZXlhcyIsImV4cCI6MTU0MTA5MDc5MiwiaWF0IjoxNTM1OTA2NzkyfQ.J-phhionpkR23P2RTddXPm3OI3O34fVh_NbbI-Nwn24
    Content-Type: application/json


-   input:
    {}

-   output:
    {
        "AllUsers": [{
                "_id": "5b8b7d3880f32f680920ba41",
                "username": "shreyas",
                "email": "shryas.sk@gmail.com",
                "role": "1",
                "dob": "25-12-1991"
            },
            {
                "_id": "5b8b7d3880f32f68092qwa45",
                "username": "admin",
                "email": "admin@admin.com",
                "role": "1",
                "dob": "23-12-1991"
            }
        ],
        "Status": "Sucess"
    }

## Update User API

- URL : http://127.0.0.1:3001/api/user/update

- Headers: 
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGI3ZDM4ODBmMzJmNjgwOTIwYmE0MSIsInVzZXJuYW1lIjoic2hyZXlhcyIsImV4cCI6MTU0MTA5MDc5MiwiaWF0IjoxNTM1OTA2NzkyfQ.J-phhionpkR23P2RTddXPm3OI3O34fVh_NbbI-Nwn24
    Content-Type: application/json


-   input:
    {
        "payload": {
            "id": "5b8c1301125823e837fdfd3d"
        },
        "user": {
            "username": "test2",
            "email": "testtwo@test.com",
            "role": "Guest",
            "dob": "10-01-2001"
        }
    }

-   output:
    {
        "user": {
            "id": "5b8c1301125823e837fdfd3d",
            "username": "test2",
            "email": "testtwo@test.com",
            "role": "Guest",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGMxMzAxMTI1ODIzZTgzN2ZkZmQzZCIsInVzZXJuYW1lIjoidGVzdDIiLCJleHAiOjE1NDEwOTExNzQsImlhdCI6MTUzNTkwNzE3NH0.0V8qpPS6q2zQQnceGJFafFtk1mmgdzPy6yTppwwXKic"
        },
        "status": "success"
    }



## Delete User API

- URL : http://127.0.0.1:3001/api/user/update

- Headers: 
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGI3ZDM4ODBmMzJmNjgwOTIwYmE0MSIsInVzZXJuYW1lIjoic2hyZXlhcyIsImV4cCI6MTU0MTA5MDc5MiwiaWF0IjoxNTM1OTA2NzkyfQ.J-phhionpkR23P2RTddXPm3OI3O34fVh_NbbI-Nwn24
    Content-Type: application/json


-   input:
    {
        "payload": {
            "id": "5b8c1301125823e837fdfd3d"
        },
        "user": {
            "username": "test2",
            "email": "testtwo@test.com",
            "role": "Guest",
            "dob": "10-01-2001"
        }
    }

-   output:
    {
	    "Status": "Deleted Successfully"
    }



## Balaned Paranthesis API

- URL : http://127.0.0.1:3001/api/balanced/validate

- Headers: 
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOGI3ZDM4ODBmMzJmNjgwOTIwYmE0MSIsInVzZXJuYW1lIjoic2hyZXlhcyIsImV4cCI6MTU0MTA5MDc5MiwiaWF0IjoxNTM1OTA2NzkyfQ.J-phhionpkR23P2RTddXPm3OI3O34fVh_NbbI-Nwn24
    Content-Type: application/json

-   input:
    {
        "balanced": {
            "input": "{}",
            "username": "shreyas"
        }
    }

-   output:
    {
        "username": "shreyas",
        "Message": "Balanced",
        "Status": "success"
    }

# Task List


1. Setup Node js with latest stable version. Pull out Mongo db with latest version.
Node js version - 8.5.0
Mongo db version - 3.4.9

2. Setup the Express js and make the web server up.
Express js version - 4.13.4
Web server was set up.

3. Write up the Routes.
Routes are written for routing system.

4. Write up the controller logic and pass up data to service.
Controller logins are written and data has been passed to service.

5. Write up service and talk to mongo db for CRUD operations.
Services written for CRUD operations and communication with mongo db.

6. Use Postman to test the API's.
API's were tested using postman

7. Please include the Read.Me file with API's you coded.
Read.Me file has been included. You can find it at nodejstask/Read.Md

8. API to do registration. Please accept the registration data from user (email , password, DOB,username,role) and save them to MONGO DB. send back any error /success as response.
Written a API for the registration of user and saved in mongo db. success/error status is sent back.

9. Implement the Login authentication with JWT. Accept username/password and ensure the jwt token generated and used to authenticate the CRUD API calls, if user not passing JWT token then you are not authorised message should come as response.
Login authentication has been implemented with JWT. CRUD operations are authenticated with JWT token.

10. Write an API to list all the registered users in DB (pass admin role JWT token).
API is written to display all users.

11. Write an API to delete the registered user with admin login(pass admin role JWT token ).
API is written to delete a user. only admin role user can delete users.

12. Once user successfully login with jwt token verified , Use this token and make a API call with route name (http://xx.x.x.x:PORT/balanced) which accepts the parenthesis as input. ( Ex: User passes {[]} as input and system should take this and perform balanced or unbalanced paranthesis.
Paranthesis validation is written based on user authentication.

13. If balanced then save it to MONGO DB user defined "balanced" collection using his username and message as success . If same user calls this API again and again , increase the attempts variable in mongo DB by 1.
If result is balanced, the log is saved in mongo db and the attempts are recorded.