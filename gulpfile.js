require('es6-promise').polyfill();

var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require( 'gulp-util' );
var imagemin = require('gulp-imagemin');
var spawn = require('child_process').spawn;

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())  
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('copy', function(){
  gulp.src('src/fonts/*', {base: 'src'})
  .pipe(gulp.dest('dist/'));

  gulp.src('src/video/*', {base: 'src'})
  .pipe(gulp.dest('dist/'));

  return gulp.src('src/*.html', {base: 'src'})
  .pipe(gulp.dest('dist/'));
})

gulp.task('js', function(){
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('serve', ['copy','js','images','sass'], function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('images', function(){
  gulp.src('src/logos/*')
  .pipe(imagemin({
      progressive: true
    }))
  .pipe(gulp.dest('dist/images/logos'));

  var child = spawn("bash", ["image.sh"], {cwd: process.cwd()}),
            stdout = '',
            stderr = '';
  child.stdout.setEncoding('utf8');
  child.on('close', function(){
    return true;
  })

  gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/images/highres'));
});

gulp.task('default', ['serve'], function(){
  gulp.watch('src/*.html', ['copy']);
  gulp.watch('src/js/*', ['js']);
  gulp.watch('src/scss/*', ['sass']);
  gulp.watch('src/images/*', ['images']);
})
/*
add autoprefixer
*/