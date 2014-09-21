flow
====

A full-stack living development environment for the web. Built on top of Amber and Pharo.

## Motivation

There are plenty of stacks available for the web and yet there is none that sticks to developer productivity, intuition, discovery, mastery and fast feedback loops for the modern web. This stack is an answer to that call.

## General view

Flow is a full stack framework so it has two important directories:  `backend` and `frontend`. It also has the `public` directory that's used as output of the build process

- **flow/** the root directory of your flow based app.
- **backend/** where you'll find the development Pharo worker image and all the things needed for the backend to run.
- **frontend/** where you have Amber, its configuration material and requisites, the sources of your particular amber app and  also `css/` `img/` and `views/` where flow find your app's stylesheets, images and templates sources respectively.
- **public/** is the directory used by the http server for the static content. You basically ignore this dir because is suposed to be cacheable and gets re-built every time you change the sources by the `grunt watch` task.

##Development workflow
Once your backend is built (see below for how-to instructions for  building a fresh one), the typical development workflow in a flow based app goes like this:

1. You start things going to the `flow/` directory and executing `./flowStart`. That will open a 
2. 


## Project

We're organising the project in this trello board [here](https://trello.com/b/oQ17lPpV/flow)

And documenting in the wiki [here](https://github.com/sebastianconcept/flow/wiki)

## Direction?

1. make 
2. it
3. rock

____

MIT - License