# React Maze game with Express server

v 1.0
 Base init stable application


##  How to install

```bash
# Install dependencies
cd react-maze
npm install
```

Main plot
 Maze Game uses classical redux pattern, with store and reducers.
 Uses axios for backend http client to get backend movies information.
 Backend uses plain Express lightweight server engine.

 It's classical maze game where your player must reach end (last very right box).
 Use Arrow keys to navigate and avoid walls!
 If hit wall you will start from start position!

 Backend find shortest path
 basic recursive check if virtual player can go (if box or wall)
 if so continue walking and check minimum of those.


## How to test
Currently using react-scripts build-in test tool based on jest with test help of enzyme.
Tests are commonly spread among component folders
Exm. utils tests are in folder  utils/test this way, in my opinion, is more comfortable for importing
required files

cmd -> npm run test


## How to run

### The backend serve
Backend data is coming from correct backend server
Which is located here:  http://localhost:3600
To start server: npm run server


### The client side
Use command: npm run start
Program will start localhost:3000


```bash
 Check the page in desired Browser

 Best viewed in Firefox, Chrome

 # Table libraries
  Uses react-bootstrap-table-next as base and filter react-bootstrap-table2-filter
  CSS  Plain SCSS with CSS Grid as game grid layout

	Plot
   Uses redux pattern.
   Consists of components: lists
   And actions with reducers

     Libraries:
	  react-bootstrap
	  axios - http client
	  express - lightweight server
	  body-parser,
	  node-sass - sass
	  sass-loader

     Server Scheme:
       index.js - main server component, entry point
       game
         game.js - all game logic
         dist.js - calculation of shortest distance
       utils - utilities
       maps.js - maps to load

    Dockerfile - docker container, it's first time for add project to this type of file
      It should work


     Scheme:
	   Contents
	    pages - pages of application
	    actions - redux actions (send signals to get data to server)
	    components - parts, that are required for pages
		types - enums, lists, constants
	    reducers - redux building blocks of handling state change with business logic (gets data from server)
		styles/ - common scss styles

		App.js - main page declaration
	    store.js - redux store
	    index.js - starting point whole application
	    setupTests - setup enzyme adapter
		tests are spread among folders

		App ->  choose-quiz is entry point page where you select username, quiz
		         after that press Start ->

		  Game page -> main page with importing Game Component

		  MazaGame component -> game component which handles game logic
		  MazeError component -> shows error if data not loading, rejected or some other error occurs

		 You also can adjust number of maps, rows, columns.



  Enjoy the app and do call if you have some feedback.
  Thanks for the task!


