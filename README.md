#Lumen FrontEnd

###Prerequisites:
  - npm: http://nodejs.org/
  - Bower: http://bower.io/
  - Gulp: http://gulpjs.com/
  - RubyGems: https://rubygems.org/


###Structure:
- src/
  - assets/
    - img/
  - bower_components/
  - jade/
    - tpl/
    - index.jade
  - js/
  - sass/
  - vendors/
- .gitignore
- .bowerrc
- bower.json
- gruntfile.js
- package.json
- Procfile
- README.md
- server.js

###Clone markup-web
> 
  `git clone https://lumendig@bitbucket.org/lumendig/markup-web.git`  
  `cd markup-web`
  
###Bourbon
> 
  `https://github.com/thoughtbot/bourbon`

###Getting Started
> 
  `ENV=dev npm install`: Install packages.  
  `gulp run --env=dev`: Compile and Run Server.  
  `gulp build --env=dev`: Export project to **public/** without minify css and js.


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
Info: https://bitbucket.org/lumendig/  
Email: fabian@lumendigital.co
  