# OuYuan Backend 
by [@krainet](https://github.com/krainet)


## Table of Content

  * [Getting Started](#getting-started)
  * [Useful Commands](#useful-commands)
  * [Make It Your Own](#make-it-your-own)
  * [Learning Materials](#learning-materials)
  * [Features](#features)
  * [Stack](#stack)
  


## Getting started
```bash
git clone https://github.com/krainet/oubackend3.git oubackend
cd new-project
npm install
npm start
```

## Useful Commands
  * `npm start` - starts a dev server and opens browser with running app
  * `npm run test` - runs lint and tests
  * `npm run watch` - runs tests in watch mode
  * `npm run prod` - runs full prod build and serves prod bundle
  * `npm run prettier` - runs prettier to format whole code base (`.ts` and `.scss`) 
  * `npm run analyze` - runs full prod build and `webpack-bundle-analyzer` to visualize how much code is shipped (dependencies & application) 
  

## Features

* custom themes support (3 themes included)
* lazy-loading of feature modules
* lazy reducers
* localStorage ui state persistence
* `@ngrx/effects` for API requests
* fully responsive design
* angular-material and custom components in `SharedModule`
 
## Stack

* Angular
* ngrx (or try [ngx-model](https://github.com/tomastrajan/ngx-model) if you prefer less boilerplate)
* Angular Material
* Bootstrap 4 (only reset, utils and grids)

