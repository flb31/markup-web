
var argv = require('yargs').argv;
var env = (argv.env === 'dev') ? 'dev' : 'prod';
var isDev = (env == 'dev');
var port = argv.port || 8080;
var live_port = argv.live_port || 35729;

if(env === 'dev'){
  var express = require('gulp-express'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'); 
}else{
  var connect = { reload: function(){ return true; } };
}


var gulp = require('gulp'),
  clean = require('gulp-clean'),
  gulpIf = require('gulp-if'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  uglyfile = require('gulp-uglify');


gulp.task('js', function(){
  
  if(isDev){
    gulp
      .src('src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('public/assets/js'))
      .pipe(connect.reload());
  }else{
    gulp
      .src('src/js/**/*.js')
      .pipe(uglyfile())
      .pipe(gulp.dest('public/assets/js'));
  }
});


gulp.task('sass', function(){
  var conf = (!isDev)? {outputStyle: 'compressed'}: {};
  gulp
    .src('src/sass/**/*.scss')
    .pipe(sass(conf).on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe( gulpIf(isDev, connect.reload()) );
});

gulp.task('jade', function(){
  
  gulp
    .src(['src/*.jade', 'src/**/*.jade'])
    .pipe(jade({ pretty: isDev }) )
    .pipe(gulp.dest('public'))
    .pipe( gulpIf(isDev, connect.reload()) );
});


gulp.task('watch', function(){
  //express.run(['server.js']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(['src/*.jade', 'src/**/*.jade'], ['jade']);
});

gulp.task('clean', function(){
  gulp
    .src(['public/*.html','public/tpl'], {read: false})
    .pipe(clean());
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: port,
    livereload: {
      port: live_port
    }
  });
});

gulp.task('build', ['clean','jade', 'js', 'sass']);
gulp.task('run', ['build', 'connect', 'watch']);