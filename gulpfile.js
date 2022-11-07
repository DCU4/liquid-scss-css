var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('compilesass', function() {
	// root SASS file (contains all your includes)
	return gulp.src('./temp/style.scss')
		// compile SASS to CSS
    // expanded
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		// add vendor prefixes
		.pipe(autoprefixer())
		// change the file name to be a liquid file
		.pipe(concat('style.css.liquid'))
		// remove the extra set of quotations used for escaping the liquid string
		.pipe(replace('"{{', '{{'))
		.pipe(replace('}}"', '}}'))
		// save the file to the theme assets directory
		.pipe(gulp.dest('./temp/'))
    .on('error',(error) => {
      console.log('err', error.toString());
      this.emit('end');
    });
});

gulp.task('minifysass', function() {
	// root SASS file (contains all your includes)
	return gulp.src('./temp/style.scss')
		// compile SASS to CSS
    // expanded
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		// add vendor prefixes
		.pipe(autoprefixer())
		// change the file name to be a liquid file
		.pipe(concat('style.css.liquid'))
		// remove the extra set of quotations used for escaping the liquid string
		.pipe(replace('"{{', '{{'))
		.pipe(replace('}}"', '}}'))
		// save the file to the theme assets directory
		.pipe(gulp.dest('./temp/'));
});
 
gulp.task('default', function() {
	// watch all SASS (.scss) files
	gulp.watch(['./src/**/*.scss'], ['compilesass']);
});