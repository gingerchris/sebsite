var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');



gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())  
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('copy', function(){
  return gulp.src('src/*.html', {base: 'src'})
  .pipe(gulp.dest('dist/'));
})

gulp.task('js', function(){
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
})

gulp.task('serve', ['copy','js','sass'], function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('images', function(){
  return gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/images/lores'));
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