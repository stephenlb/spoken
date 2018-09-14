const gulp    = require('gulp');
const wrapper = require('gulp-wrapper');
const babel   = require('gulp-babel');

gulp.task( 'spoken-module', e => {
    return gulp
    .src('src/spoken.js')
    .pipe(wrapper({ header : 'function spoken(){}\nexport default spoken;\n' }))
    .pipe(babel())
    .pipe(gulp.dest('build'));
} );

gulp.task( 'spoken', e => {
    return gulp
    .src('src/spoken.js')
    .pipe(wrapper({ header : [
        '// DO NOT EDIT FILE',
        '// THIS FILE IS BUILT WITH GULP',
        'function spoken(){}\n'].join('\n') }))
    .pipe(gulp.dest('./'));
} );

gulp.task( 'default', gulp.series('spoken','spoken-module') );
