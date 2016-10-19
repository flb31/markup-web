
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
  runSequence = require('run-sequence'),
  uglyfile = require('gulp-uglify');


gulp.task('js', function(){
  
  if(isDev){
    return gulp
      .src('src/js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('public/assets/js'))
      .pipe(connect.reload());
  }else{
    return gulp
      .src('src/js/**/*.js')
      .pipe(uglyfile())
      .pipe(gulp.dest('public/assets/js'));
  }
});


gulp.task('sass', function(){
  var conf = (!isDev)? {outputStyle: 'compressed'}: {};
  return gulp
    .src('src/sass/*.scss')
    .pipe(sass(conf).on('error', sass.logError))
    .pipe(gulp.dest('public/assets/css'))
    .pipe( gulpIf(isDev, connect.reload()) );
});

gulp.task('jade', ['clean:jade'], function(){
  return gulp
    .src(['src/jade/**/*.jade'])
    .pipe(jade({ pretty: isDev }) )
    .pipe(gulp.dest('public'))
    .pipe( gulpIf(isDev, connect.reload()) );
});


gulp.task('watch', function(){

  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(['src/jade/**/*.jade'], ['jade']);
  
  //vendors
  gulp.watch(['src/vendors/**/*'], ['vendors']);
  //img
  gulp.watch(['src/assets/**/*'], ['assets:img']);
  //bower
  gulp.watch(['src/bower_components/**/*'], ['bower']);
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

gulp.task('clean:jade', function(){
  return gulp
    .src(['public/*.html','public/tpl'], {read: false})
    .pipe(clean());
});

gulp.task('clean:bower', function(){
  return gulp
    .src(['public/bower_components'], {read: false})
    .pipe(clean());
});

gulp.task('clean:vendors', function(){
  return gulp
    .src(['public/vendors'], {read: false})
    .pipe(clean());
});

gulp.task('clean:img', function(){
  return gulp
    .src(['public/assets/img'], {read: false})
    .pipe(clean());
});

gulp.task('vendors', ['clean:vendors'], function() {
  return gulp
    .src('src/vendors/**/*', { base: 'src' })
    .pipe(gulp.dest('public'));
});

gulp.task('assets:img', ['clean:img'], function() {
  return gulp
    .src('src/assets/img/**/*', { base: 'src' })
    .pipe(gulp.dest('public'));
});

gulp.task('bower', ['clean:bower'], function() {
  return gulp
    .src('src/bower_components/**/*', { base: 'src' })
    .pipe(gulp.dest('public'));
});

gulp.task('build', function(callback) {
  runSequence('bower', 'vendors', 'assets:img', 'jade', 'js', 'sass', 'connect', 'watch', callback);
});

gulp.task('run', ['build']);