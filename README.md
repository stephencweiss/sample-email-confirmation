This app is split into two components:
1. Web - Bootstrapped with Create-React-App
2. Server - A basic Express server

## Getting Started
To get the web side of this app running:
```shell
$ yarn web:start
```

To start the server (from the project's root):
```shell
$ yarn server:start
```

## Configuration

This app expects several environment secrets to run:
```
DB_USER= # For connecting to a hosted db
DB_PW= # For connecting to a hosted db
DB_URL= # For connecting to a hosted db
EMAIL_USER= # Currently replaced with test accounts provided by nodemailer
EMAIL_PW=  # Currently replaced with test accounts provided by nodemailer
```