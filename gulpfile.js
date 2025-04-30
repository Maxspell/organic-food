import * as dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        main: 'src/styles/main.scss',
        dest: './dist/css'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        main: 'src/scripts/main.js',
        dest: './dist/js'
    }
};

function buildStyles() {
    return gulp
        .src(paths.styles.main)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

function buildScripts () {
    return gulp
        .src(paths.scripts.main, { allowEmpty: true })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watchFiles() {
    gulp.watch(paths.styles.src, buildStyles);
    gulp.watch(paths.scripts.src, buildScripts);
}

export const build = gulp.series(buildStyles, buildScripts);
export const watch = gulp.series(buildStyles, watchFiles);
export default gulp.series(build, watch);