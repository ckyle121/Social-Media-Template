# Social Media Template
This is a project provides a template for the APIs on the backend for a social network web application. It allows users to share their thoughts, are able to react to friend's thoughts, and create a friends list. This NoSQL database is designed for social media applications because the database can handle large amounts of unstructured data.

## Walkthrough Video of API requests: 
https://drive.google.com/file/d/1MieXiIRS1ZzA8vQFvo6SkWMNcdZltlwe/view

## Models
* User
* Thought 
* Reaction (used as a subdocument in Thought)

## Endpoints
##### User
* Get all users: GET /api/users
* Create a user: POST /api/users
* Get user by ID: GET /api/users/:id
* Update a user: PUT /api/users/:id
* Delete a user: DELETE /api/users/:id
* Add a friend: PUT /api/users/:userId/friends/:friendId
* Delete a friend: DELETE /api/users/:userId/friends/:friendId

##### Thought
* Get all thoughts: GET /api/thoughts
* Create a thought: POST /api/thoughts
* Get thought by ID: GET /api/thoughts/:id
* Update a thought: PUT /api/thoughts/:id
* Delete a thought: DELETE /api/thoughts/:id

##### Reaction
* Add a reaction: PUT /api/thoughts/:id/reactions
* Delete a reaction: DELETE /api/thoughts/:id/reactions

## Technologies Used: 
* JavaScript ES6
* MongoDB
* Mongoose
* Express
* Node
* Date-and-Time (npm package for formatting timestamps)

