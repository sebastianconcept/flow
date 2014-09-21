flow
====

A full-stack living framework for the web. 

## Why flow?

There are plenty of stacks available for the web and yet there is none that sticks to *developer productivity*, *intuition*, *discovery*, *mastery* and *fast feedback loops* for the modern web. With [Amber](http://amber-lang.net/) taking care of html5 and doing everything in the browser and [Pharo](http://pharo.org/) being incredibly productive in the backend, this stack is an answer to that call. 

## General view

Flow is a full stack framework so it has two important directories:  `backend/` and `frontend/`. It also has the `public/` directory that's used as output of the frontend's build process and meant to be used only for production (or staging).

- **flow/** the root directory of your flow based app.
- **backend/** where you'll find the development Pharo worker image and all the things needed for the backend to run.
- **frontend/** where you have Amber, its configuration material and requisites, the sources of your particular Amber app and  also `css/` `img/` and `views/` where flow finds your app's stylesheets, images and templates sources respectively.
- **public/** is the directory used by the http server for the static content. You basically ignore this directory during development because is supposed to be cacheable and gets automatically re-built every time you change the sources by the `grunt watch` task.

##Development workflow
Once your backend is built (see how-to below), the typical development workflow in flow  apps goes like this:

1. Start things going to the `flow/` directory 
2. Execute `./flowStart`. That will open some terminal tabs. One with Amber listening in 3000, another with the Pharo image listening in 3333 and finally another with `grunt watch`.
2. Point your browser to `http://flow.dev`
3. Open Amber's IDE and start coding your Controllers, Models and any other thing there.
4. Commit the packages you changed.
5. Reload `http://flow.dev` and enjoy your new code.
6. Discover new things, review, code more, repeat from 4 all you need until you're ready for staging or production (more on that below).

## Deploying

### Frontend
To put the frontend app in production (or staging) all you'll need is in the `public/` directory. Flow has a grunt task that continuously watches changes in the `frontend/` sources and rebuilds `public/` every time it perceives one.

### Backend
The backend is the Pharo image you were working on. The suggested strategy for setting a **prototypical backend** that you'll typically need for a first demo of your app goes like this:

1. Upload all (`flow/`) to your server. 
2. Use your favorite supervisor script to start and stop the worker image as a service ([this](http://supervisord.org/) one is quite good).
3. Install [MongoDB](http://www.mongodb.org/) in that server.
4. Start the service of that worker image.
5. Setup [nginx](http://en.wikipedia.org/wiki/Nginx) so everything points where it should (we can't recommend Apache for flow since it doesn't officially support [WebSockets](http://en.wikipedia.org/wiki/WebSocket)).

**Note** that optionally, if your server has a GUI, you can manually open the worker image with GUI and have an environment with the full living debugging and inspecting power that [Smalltalk](http://en.wikipedia.org/wiki/Smalltalk) gives to you.

Setting up a **serious production backend** will require additional work and that varies quite a lot depending on the app's architecture and business demands so is out of scope here. 

But here you have the suggested strategy for setting that up: 

1. A [CI](http://en.wikipedia.org/wiki/Continuous_integration) (like [this one](http://jenkins-ci.org/)). 
2. A git server like [gitlab](https://about.gitlab.com/) or [this](https://github.com/) or [this](https://bitbucket.org/) or any other you like (should have the commit hook feature).
3. Setup hooks in your CI so the CI can react building a new version of your app every time you commit code.
3. Setup your CI to do all the necessary moves for stoping things, installing the new version and starting things with the new version.

**Note** you could do load balancing of your backend in several worker images and/or servers. Is out of scope here but totally doable.

## Direction?

Flow is open-source and the basic mission of this project is to provide *Smalltalk consultants* and *Smalltalk software houses* with **a competitive full-stack framework** that allows them to quickly deliver a demo with all the modern html5 features the market expects today (2014) so they can keep momentum up among their prospects and clients and scale things to full successful projects delivered by kickass productive teams or individuals.

If you resonate with this, please don't forget to give it a star. Thank you!

## Contributing

If you want more you can 
We're organising the project in this Trello board [here](https://trello.com/b/oQ17lPpV/flow). If you're having ideas you'd like to see added to flow, please make a new card in the 'Input / Feedback' column with a shot title and elaborating in the card description. Start a conversation and lets make it rock!

And documenting in the wiki [here](https://github.com/sebastianconcept/flow/wiki)


____

MIT - License