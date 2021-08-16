const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass-compile', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
})
gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
})