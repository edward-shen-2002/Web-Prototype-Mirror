# Setup

## Local Setup

### Requirements

#### Database

You must have MongoDB set up locally. Install [here](https://www.mongodb.com/download-center/community).

#### Package Manager

You can either use [Yarn](https://yarnpkg.com/lang/en/) or [npm (Node.js comes with npm)](https://nodejs.org/en/).

Currently, the script commands are only set for yarn.

#### Installing Dependencies

Run the command `yarn deps`. This will install the root, frontend, and backend dependencies.

#### Starting the application

The backend is set to port 3000 and the frontend is set to port 3003. If you have any conflicts in port, adjust the ports in the [backend](/backend/app.js) or [frontend](/frontend/webpack.dev.js).

Run the command `yarn dev`. Both the frontend and backend will be started. Open the application on your browser [here](http://localhost:3003).
