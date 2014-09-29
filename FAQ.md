#*flow* FAQ

###Can I use double data-binding? How do I bind the model in a *flow* controller? 

Yes. When you set the model in a *flow* controller which is a subclass of `BindingController` you'll have available that model in the template and do things like `{ model. name }` to make the template be rendered with the model's properties. Check the `RivetsJSTestsController` class for more examples.

###How do I compose *flow* controllers?

Controllers can have controllers. See the `StuffController` for an example on how it's done.

###How does *flow* routes? How URL changes map to controllers?
By reacting to the `onhashchange` event and reflecting about its new value. It will ask the `RouteableController` hierarchy to detect who answers `true` to the `isValidFor: anURI` message. If you follow *flow*'s convention, you create a `YourNamedController` subclass of `RouteableController` and it will be rendered when the URI matches `http://flow.dev/YourNamed` (tip: you can manipulate that arbitrarily by changing  `isValidFor: anURI`)

###Can I use the html canvas or I need to use templates?

Whatever you like it better. You can use the 'traditional' canvas or you can use the also 'traditional' templates. 

###How do I change the CSS style in a controller?

Editing the `.css` files found in `frontend/css/`

###How does *flow* persists models in the localStorage?

Using MiniMapless.

###How do a flow-based app gets deployed?

###Is the framework SEO friendly?
Currently, probably not. For now, the advice is to make SEO things with already SEO friendly arctifacts and let *flow* for the app itself. If the app itself needs SEO really bad (like ecommerce or things like that) then that would be a wall to climb. Good news is Google (and friends) eventually will solve that for us but if you need that in a project now, you can use your favorite tool from [any of the listed here](https://www.google.com/search?q=angular+seo&oq=angular+seo&aqs=chrome..69i57j0l5.2531j0j7&sourceid=chrome&es_sm=91&ie=UTF-8#q=angular+seo). Many of them prerender for the bots and are probably adaptable for *flow*.