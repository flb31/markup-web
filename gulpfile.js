
var argv = require('yargs').argv;
var env = (argv.env === 'dev') ? 'dev' : 'prod';
var isDev = (env == 'dev');

if(env === 'dev'){
  var express = require('gulp-express'),
  livereload = require('gulp-livereload'),
  jshint = require('gulp-jshint'); 
}else{
  var livereload = function(){return true;};
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
      .pipe(livereload());
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
    .pipe( gulpIf(isDev, livereload()) );
});

gulp.task('jade', function(){
  
  gulp
    .src(['src/*.jade', 'src/**/*.jade'])
    .pipe(jade({ pretty: isDev }) )
    .pipe(gulp.dest('public'))
    .pipe( gulpIf(isDev, livereload()) );
});


gulp.task('watch', function(){
  livereload.listen();
  express.run(['server.js']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(['src/*.jade', 'src/**/*.jade'], ['jade']);
});

gulp.task('clean', function(){
  gulp
    .src(['public/*.html','public/tpl'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean','jade', 'js', 'sass']);
gulp.task('run', ['build', 'watch']);