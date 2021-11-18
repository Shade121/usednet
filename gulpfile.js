const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const htmlmin = require('gulp-htmlmin');


gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/*.js").on('change', gulp.parallel('script'));
});

gulp.task('html', function(){
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task('script', function(){
    return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"));
});
 
gulp.task('imageminWebp', () =>
    gulp.src("src/img/**/*")
        .pipe(webp())
        .pipe(gulp.dest("dist/img"))    
);

gulp.task('downloads', function(){
    return gulp.src("src/downloads/**/*")
    .pipe(gulp.dest("dist/downloads"));
});
gulp.task('video', function(){
    return gulp.src("src/video/**/*")
    .pipe(gulp.dest("dist/video"));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'script', 'fonts', 'icons', 'mailer', 'downloads', 'imageminWebp', 'video' ));