'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');

gulp.task('watch', () => gulp.watch(['src/krakout.js'], ['build']));

gulp.task('build', () =>
  gulp.src('src/krakout.js').pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
  }))
	.pipe(gulp.dest('dist'))
);


gulp.task('default', ['build'])
