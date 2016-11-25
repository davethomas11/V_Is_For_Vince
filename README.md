# V is for Vince

Welcome to Dave and Tyler's awesome HTML5 game.

The game runs in index.html. Scripts and styles go in the _src/_ folder and are compiled to the _app/_ folder by babel
and sass, respectively.

You must run the app using `npm start`. Trying to simply open index.html in the browser will cause cross-origin request
errors.

## NPM Scripts

`npm run build` to build all the styles and scripts.
`npm run clean` to delete all generated styles and scripts.
`npm run watch` to watch the source folder and build on changes.
`npm start` to build, watch, and run the app. This will open the site in the browser using lite-server, which
automatically refreshes the browser with changes.