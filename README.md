# Node REST API

This is a RESTful API built with Node.js and Express.js, which provides basic functionalities of a social media application.

## Features

- User registration and authentication
- CRUD operations for user profiles and posts
- Follow and unfollow users
- Like and dislike posts
- Fetch posts from followed users

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- Helmet
- Morgan
- Dotenv

## Installation

1. Clone the repository
   git clone https://github.com/yourusername/node-rest-api.git
2. Change the working directory
   cd node-rest-api
3. Install dependencies
   npm install
4. Create `.env` file in root directory and add your MongoDB URI, like so:
   MONGO_URL=your_mongodb_uri
5. Run the app
   nodemon index.js

## API Endpoints

### User Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user
- `PUT /api/users/:id/follow`: Follow a user
- `PUT /api/users/:id/unfollow`: Unfollow a user

### Post Routes

- `POST /api/posts`: Create a new post
- `PUT /api/posts/:id`: Update a post
- `DELETE /api/posts/:id`: Delete a post
- `PUT /api/posts/:id/like`: Like a post or remove like
- `GET /api/posts/:id`: Get a post
- `GET /api/posts/timeline/all`: Get timeline posts

###Postman API documentation
https://documenter.getpostman.com/view/26350092/2s9YC1XEmN

## License
This project is licensed under the ISC License.
