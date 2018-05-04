const gulp         = require('gulp'),
      autoprefixer  = require('gulp-autoprefixer'),
      sass         = require('gulp-sass');

/**
 * SASS Task
 * 
 * Compile SASS, and autoprefixer 
 * CSS for browser compatibility
 * 
 * Compile SASS/SCSS from the 
 * 'assets/sass'directory, then 
 * create CSS file in 'src/css'
 */
gulp.task('sass', () => {
    return gulp.src('assets/sass/*.scss')
               .pipe(sass({ style: 'expanded' }))
               .pipe(autoprefixer(
                   /** 
                    * Autoprefixer Settings
                    * 
                    * Autoprefixer for:
                    *   - Last 15 version of each browser
                    *   - Versions with greater than 1% of global usage
                    *   - Internet Explorer versions 7 and 8
                    * 
                    * Browser version options available here:
                    * https://github.com/ai/browserslist#queries
                    */
                   ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
               ))
               .pipe(gulp.dest('public/assets/css'));
});

/**
 * Watch Task
 * 
 * Watch files with the '.scss' 
 * extension within the 'assets/sass'
 * directory and all subdirectories
 */
gulp.task('watch', () => {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

/**
 * Default Task
 * 
 * Sets the 'watch' task to run by default 
 * when the 'gulp' command is used
 */
gulp.task('default', ['watch']);