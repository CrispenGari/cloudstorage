### Cloud Storage Server

Cloud storage server is a backend application that serves a `GraphQL` api to the client application which is a next.js application running on port 3000 in development. This graphql endpoint is does the following:

1. User Authentication System

- Register the user - unauthenticated user will be able to create a new account with new credentials.
- Email verification - the new user will recieve a verification email for the account creation from our server.
- Logout - an authenticated user can be able to logout of the application by just running the logout mutation.
- Login - a registered user can be able to login using the login mutation
- Forgot Password - a registered user can be able to reset their password via email and re-login to the application

2. User Profile System

All users will have their profile page where they will be able to update their profile details.

3. User Storage

Every user will be provided with `5GB` storage on account creation to store, his or her media in the following directories:

- documents
- banners (hidden)
- profiles (hidden)
- trash (only store deleted items before recycled)
- music
- pictures
- videos
- miscellaneous

Note that all the mutation and queries that are made to this server will be at the following endpoint:

```
http://localhost:3001/graphql
```

### Developers

Developers are able to programmatically interact with cloud storage through the use of `API KEY` and `API SECRET` which can be generated with the authenticated user in the settings page.

### Developer Documentation

In this section we are going to describe how basically we are going to programmatically integrate with cloud service REST API.

1. Fist go to your [CloudStorage](http://localhost:3000/) account and navigate to `Settings`.
2. Under the `Developer` section generate your `API_KEY` and `API_SECRET` and you will be ready to start using the `CloudStorage API`.

### How to make API request to Cloud Storage.

To make API calls to cloud storage you just need two things, an `API_KEY` and `API_SECRET` that you will pass as a query variable in your request URL.

### Query variables to the request URL

The following are the list of query variables to the request URL that a developer can pass to query or filter data from the cloudstorage server.

1. `apiKey` - this key is a required query variable that every request must have, it give the developer the authority to access the data from cloudstorage server.
2. `apiSecretKey` -this key is a required query variable that every request must have, it give the developer the authority to access the data from cloudstorage server.
3. `profile` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of profile is set to `true` with means you are telling the cloudstorage server to return the profile document of the account from the database.
4. `trash` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of trash is set to `true` with means you are telling the cloudstorage server to return the trash documents (array) of the account from the database.
5. `musics` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of musics is set to `true` with means you are telling the cloudstorage server to return the music documents (array) of the account from the database.
6. `documents` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of documents is set to `true` with means you are telling the cloudstorage server to return the documents files (array) of the account from the database.
7. `miscellaneous` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of miscellaneous is set to `true` with means you are telling the cloudstorage server to return the miscellaneous documents (array) of the account from the database.
8. `videos` - this is an optional variable a developer will pass with boolean value, default is `false`. If the value of videos is set to `true` with means you are telling the cloudstorage server to return the videos documents (array) of the account from the database.

### What if i didn't pass the API Key or API Secrete Key in the request URL?

If you dont pass these two query variables in your request, you will get the following json response from the server:

URL: `GET http://localhost:3001/developers/api`

```json
{
  "status": 401,
  "message": "Unauthorized requests.",
  "help": "No API KEY and API SECRET key provided in the request.",
  "url": "/developers/api"
}
```

The request URL that queries all the data for the user is as follows:

```
GET http://localhost:3001/developers/api?profile=true&trash=true&musics=true&documents=true&miscellaneous=true&videos=true&apiKey=ca3d3ff4-688b-4fb7-8dee-7da0b90fe6c0&apiSecretKey=70b782a5-eba3-47f5-b73c-438dcd99d8ee
```

A successive query to the server will yield the following results:

```json
{
  "uid": "a41dd14f-c406-426b-9129-a6c0c1b4277d",
  "username": "crispengari",
  "email": "crispengari@gmail.com",
  "theme": "light",
  "password": "<hidden_value>",
  "isLoggedIn": true,
  "confirmed": true,
  "maxStorageSize": "5368709120",
  "usedStorage": "30766226",
  "apiKey": "ca3d3ff4-688b-4fb7-8dee-7da0b90fe6c0",
  "apiSecretKey": "70b782a5-eba3-47f5-b73c-438dcd99d8ee",
  "createdAt": "2022-03-08T07:47:03.181Z",
  "updatedAt": "2022-03-29T08:54:33.000Z",
  "profile": {},
  "trash": [],
  "musics": [],
  "documents": [],
  "miscellaneous": [],
  "videos": []
}
```
