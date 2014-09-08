({
   //appDir: "src/",
    baseUrl: './src',
    dir: 'dist',
    modules: [
      'amber/deploy',
      'bower/rivets/dist/rivets.min',
      {
        name: 'app'
          // 'app/MiniMapless',
          // 'app/Flow',
          // 'app/Flow-Core',
          // 'app/Flow-API',
          // 'app/Flow-Templates',
          // 'app/Flow-Binding',
          // 'app/App'
      }
    ],
    removeCombined: true
})