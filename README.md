flow
====

An Amber-Pharo stack

## Motivation

There are plenty of stacks available for the web and yet there is none that sticks to developer productivity, intuition, discovery, mastery and fast feedback loops for the modern web. This stack is an answer to that call.

## Genral view

Flow is a full stack so it has two important directories

- backend/ where you'll find the Pharo image and all the things needed for the backend to run
- frontend/ where you have Amber, its configuration material, your amber app sources but also css/ img/ and views/ where flow find your app's templates sources
- public/ is the directory used by the http server for the static content. You basically ignore this dir because is suposed to be cacheable and gets re-built every time you change the sources by the `grunt watch` task.

## Project

We're organising the project in this trello board [here](https://trello.com/b/oQ17lPpV/flow)

And documenting in the wiki [here](https://github.com/sebastianconcept/flow/wiki)

## Direction?

1. make 
2. it
3. rock

____

MIT - License