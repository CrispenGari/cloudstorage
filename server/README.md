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
