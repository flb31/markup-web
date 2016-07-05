#Flb31 FrontEnd

###Prerequisites:
  - npm: http://nodejs.org/
  - Bower: http://bower.io/
  - Gulp: http://gulpjs.com/


###Structure:
- public
  - assets/
    - img/
    - vendors/ 
    - bower_components/
- src/
  - js/
  - sass/
  - tpl/
  - index.jade
  
- .gitignore
- .bowerrc
- bower.json
- gruntfile.js
- package.json
- Procfile
- README.md
- server.js

###Clone flb31-frontend
> 
  `git clone https://github.com/flb31/flb31-frontend.git`  
  `cd flb31-frontend`

###Getting Started
> 
  `ENV=dev npm install`: Install packages.  
  `gulp run --env=dev`: Compile and Run Server.  
  `gulp build --env=dev`: Export project to **dist/** without minify css and js.


###Production Enviroment
> 
  `gulp build`: Export project.  
  `node server.js`: Run server  

###Heroku CLI
Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-command

> 
  `heroku login`  
  `heroku create NAME-APP`  
  `git push heroku master`  
  `heroku open`  

###Contact
Info: https://github.com/flb31/flb31-frontend  
Email: flb031@gmail.com
  