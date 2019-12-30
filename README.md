# MOHLTC Data Web App Prototype

## Setup

### Local Setup

#### Database

You must have MongoDB set up locally. Install [here](https://www.mongodb.com/download-center/community).

#### Package Manager

Currently, the script commands are only set for [yarn](https://yarnpkg.com/lang/en/) (not npm).

#### Installing Dependencies

Run the command `yarn deps`. This will install the root, frontend, and backend dependencies. If you're on windows, you could also install the dependencies by running the executable (shortcut) ```windows-run-deps```.

#### Starting the Application

The backend is set to port 3000 and the frontend is set to port 3003. If you have any conflicts in port, adjust the ports in the [backend](/backend/app.js) or [frontend](/frontend/webpack.dev.js).

Run the command `yarn dev`. Both the frontend and backend will be started. Open the application on your browser [here](http://localhost:3003). If you're on windows, you could also run locally by running the executable ```windows-run-local-dev```.

##### Admin Access

A dummy admin is automatically created, with the ```username: sampleuser``` and  ```password: password123@```.

##### Account Email verification

A test email from ```Ethereal``` is used to accept all incoming email messages.

Login with ```email: julio32@ethereal.email``` and ```password: qdjK2XgTyyHtR9zScz``` [here](https://ethereal.email/login).

## Testing

Currently, there is no testing in the application due to time constraints. However, this is something that must be implemented in the future.

Possible Libraries: [Jest](https://jestjs.io/docs/en/tutorial-react), [Enzyme](https://airbnb.io/enzyme/), [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/)

## Issues

### Libraries

#### Xlsx-Populate

There are many functions of Excel that has not been implemented in Xlsx-populate, ranging from commonly to rarely used functions.

## Resources

[Todos](docs/TODOS.md), [Bugs](docs/BUGS.md), [Redo/Undo](docs/HISTORY.md), [Notes](docs/NOTES.md), [Workflow](docs/WORKFLOW.md), [Optimizations](docs/OPTIMIZATIONS.md)
