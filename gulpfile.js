const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')

function compSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function compJs() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compImage() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

exports.default = ()=> {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compSass))
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(compJs))
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(compImage))
}
