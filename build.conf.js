({
   //appDir: "src/",
    baseUrl: ".",
    dir: "./build/js",
    paths: {
    	"amber/devel": "bower_components/amber/src/",
    	"app/MiniMapless": "src"
    },
    modules: [
        {name: "amber/devel"}
        ,{name: "app/MiniMapless"}
    ]
})