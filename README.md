# gitfame
A Github contributions analyser

[![Build Status](https://travis-ci.org/hereisnaman/gitfame.svg?branch=master)](https://travis-ci.org/hereisnaman/gitfame)

## Environment Setup
Generate env config for development and production in `env/`.
### env/dev.env
```
NODE_ENV=development
BACKEND_URL=localhost:4000
GIT_ID= #github client id
GIT_SECRET= #github client secret
```
### env/prod.env
```
NODE_ENV=production
BACKEND_URL=https://backend.gitfa.me
GIT_ID= #github client id
GIT_SECRET= #github client secret
```

## Build Setup
```
#install dependencies
npm install

#serve with hot reload at localhost:5000
npm start

#build for production
npm run build
```

Run [backend](https://github.com/hereisnaman/gitfame-backend) parallely.
