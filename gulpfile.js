/**
 * candor gulpfile
 *
 * inspired by https://ahmadawais.com/my-advanced-gulp-workflow-for-wordpress-themes/
 *
 * @package candor
 * @since 1.0
 */

 /**
  * Variables
  * ==========================================================================
  */
 var url 		      = 'http://localhost:8888' // Local Development URL for BrowserSync. Change if needed.
     themeName    = require('./package.json').name;
     themeVersion = require('./package.json').version;
     ;
/**
 * Required Modules
 * ==========================================================================
 */
var gulp          = require('gulp'),
    browserSync   = require('browser-sync'), // Asynchronous browser loading on file changes
    notify        = require("gulp-notify"), // Notifications

  // style
    sass          = require('gulp-sass'),           // compile sass files
    cleanCSS      = require('gulp-clean-css'),      // compress the css file
    sourcemaps    = require('gulp-sourcemaps'),     // make it easier to find where the code comes from
    prefix        = require('gulp-autoprefixer'),   // compiles for more browser support

  // javascript
    plumber       = require('gulp-plumber'), // if there is a error in the code it won't kick us out of the watch task
    uglify        = require('gulp-uglify'),  // compress the js file

  // universal
    cache         = require('gulp-cache'); // Clear browser caches
    concat        = require('gulp-concat'),  // make multiple files to one
    imagemin      = require('gulp-imagemin'), // compress images
    rename        = require("gulp-rename"),  // rename files
    zip           = require('gulp-zip') // Using to zip up our packaged theme into a tasty zip file that can be installed in WordPress!
;


/**
 * Scripts
 * ==========================================================================
 */
gulp.task('bsync', function() {
  browserSync.init({
   proxy: url,
   port: 3000,
   open: false,
   stream: true,
   reloadDelay: 500,
   injectChanges: true
 })
});

/* Images
 ========================================================================== */
gulp.task('img-min', function() {
// Add the newer pipe to pass through newer images only
  return gulp.src(['./assets/img/src/**/*.{png,jpg,jpeg,gif,svg}'])
				.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
				.pipe(gulp.dest('./assets/img/'))
        .pipe(notify({
            title: "Succesfully compressed!",
            message: "🖼  <%= file.relative %>",
        }));
});


/* SASS / SCSS / CSS
 ========================================================================== */
 gulp.task('sass', function () {
   return gulp.src('./assets/scss/*.scss')
   .pipe(plumber({errorHandler: notify.onError(
     {   sound: "Basso",
         title: "Error!",
         message: "⚠️  <%= error.message %>",
     })}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefix({overrideBrowserslist: ['last 2 version']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(notify({
        title: "Succesfully compiled!",
        message: "🎨  <%= file.relative %>",
    }))
    .pipe(browserSync.stream({match: "*.css"}));
 });


 gulp.task('css-min', function () {
   return gulp.src('./style.css')
    .pipe(rename( {
       basename: "style",
       suffix: '.min'
     }))
    .pipe(cleanCSS(
       {debug: true, keepBreaks: false}, function(details) {
             console.log(details.name + ' – before: ' + details.stats.originalSize + 'B');
             console.log(details.name + ' – after:  ' + details.stats.minifiedSize + 'B');
     }))
    .pipe(gulp.dest('./'))
    .pipe(notify({
        title: "Succesfully minified!",
        message: "📦  <%= file.relative %>",
    }))
    .pipe(browserSync.stream());
 });



/* Javascript
 ========================================================================== */
 var onError = function(err) {
    notify.onError({
      sound: "Basso",
      title: "Error!",
      message:  "⚠️  " + err.toString()
    })(err);
    this.emit('end');
};


  gulp.task('js', function() {
   return gulp.src('./assets/js/src/*.js')
   .pipe(plumber({ errorHandler: onError }))
   .pipe(uglify())
     .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('./assets/js/'))
     .pipe(notify({
         title: "Succesfully concated!",
         message: "⚙️  <%= file.relative %>",
     }))
     .pipe(browserSync.stream())
 });

/* Build zip files
 ========================================================================== */
 var buildInclude 	= [
    // include common file types
    '**/*.php',
    '**/*.html',
    '**/*.css',
    '**/*.min.css',
    '**/*.js',
    '**/*.min.js',
    '**/*.svg',
    '**/*.ttf',
    '**/*.otf',
    '**/*.eot',
    '**/*.woff',
    '**/*.woff2',
    '**/*.png',
    '**/*.jpeg',
    '**/*.jpg',
    '**/*.gif',
    '**/*.md',
    '**/*.txt',
    '**/*/LICENSE',
    '.gitignore',

    // exclude files and folders
    '!node_modules/**/*',
    '!assets/js/src/*',
    '!assets/img/src/*',
    '!_releases/**/*',
    '!style.css.map',
    '!**/*/.DS_Store',
    '!**/*/.autohidefiles',
    '!**/*/gulpfile.js'

  ];

  gulp.task('build', function() {
  	return 	gulp.src(buildInclude)
      .pipe(zip(themeName+themeVersion+'.zip'))
   		.pipe(gulp.dest('./_releases/'))
      .pipe(notify({
          title: "Success!",
          message: "🚀 "+themeName+themeVersion+" ready for distribution.",
      }));
  });


 // Package Distributable Theme
 gulp.task('release', gulp.series('sass', 'css-min', 'js', 'img-min', 'build'));


 /* Clear Caches
  ========================================================================== */
 gulp.task('clearCache', function () {
    return cache.clearAll();
 })

/* Watch Tasks
 ========================================================================== */
gulp.task('watch', gulp.parallel('bsync', function(){
   gulp.watch(['./assets/scss/**/*', './assets/js/src/*'],
   gulp.series('js', 'sass', 'clearCache')).on('change',  gulp.series('clearCache', browserSync.reload));
}));

gulp.task('watch-min', gulp.parallel('bsync', function(){
   gulp.watch('./assets/img/**/*', gulp.series('img-min')),
   gulp.watch(['./assets/js/*', '!./assets/js/*.min.js'],
   gulp.watch(['./assets/scss/**/*'], gulp.series('sass', 'css-min', 'clearCache')).on('change', browserSync.reload),
   gulp.series('js')).on('change', browserSync.reload);
}));

/* Default Task
 ========================================================================== */
gulp.task('default', gulp.series('js', 'sass', 'watch'));
gulp.task('min', gulp.series('img-min', 'js', 'sass', 'css-min',  'watch-min'));
