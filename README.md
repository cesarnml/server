# server

**Server URL:** https://lambda-hacks-db.herokuapp.com

## /auth/github

Begins OAuth flow. User is prompted to enter GitHub credentials. Upon successful authentication, 
GITHUB table populated with the following user information:

- id: GitHubID
- username: GitHubUserName
- displayName: GitHubDisplayName
- email: GitHubEmail
- photo: GitHubPhoto URL
- isAdmin: FALSE (default)
- projectId: NULL (default) (foreignKey)
- createdAt: creation date-time (auto-generated)
- updatedAt: update date-time (auto-generated)

On failure: user redirected to frontendURL/signin
On success: user redirected to frontendURL/user

## /api/user

- GET:
  - If user is loggedIn: server appends **user** object to **res.data** which contains logged-in user details
  - If user is loggedOut: server responds - { msg: 'user must login' }

## /api/user/:projectId

- PUT:
  - If project teamCount >= 5: server responds - { msg: 'project is full. please select another project.' }
  
  - REGISTER-TO-PROJECT CASE: user logged-in AND user projectId=NULL:
    - server registers user's projectID to specified project
    - server increments teamCount by 1 for specified project
    - server responds: {msg: `user with id ${id} signed up to project with id ${projectId}`}
  
  - DE-REGISTER-FROM-PROJECT CASE: user logged-in AND user projectID is NOT_NULL:
    - server de-registers user's projectID by reverting value to NULL
    - server decrements teamCount by 1 from specific project
    - server responds: { msg: `user removed from project with id ${projectId}` }

  - If user NOT logged-in:
    - server responds: { msg: 'user must be login' }
