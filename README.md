# BRAIN APP: _Website for Facial Recognition via URL upload_

## Core Website Features 

### 1. Facial Recogition
![](https://media.giphy.com/media/j0eBUmeqSxIvcWlE6x/giphy.gif)


![](https://media.giphy.com/media/VF4VT4JCnKrw6T7l3U/giphy.gif)
- - - - 
Facial Recogniton provided by Clarifai's API. Node server handles PUT requests to update "current user rank" & React re-renders upon successful response.



### 2. SignIn
![](https://media.giphy.com/media/elhEoHbCHv8xZUniYb/giphy.gif)
- - - - 
Connects to Node server which reads hashed password from PostgresQL db and returns JSON data or error. 


### 3. Registration
![](https://media.giphy.com/media/TiyvouLfK7VJQxjJRU/giphy.gif)

- - - -
Connects to Node server which handles encryption via bCrypt, SQL insertion via Knex.js, and error handling.

## Technologies Used 
* HTML (_Semantic_)
* CSS (_Tachyons library_)
* JS (_React, Node_)
* SQL (_PostgresQL_)
* npm modules (_express, bCrypt, Clarifai, knex, pg_) 

