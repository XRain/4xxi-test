var gulp = require('gulp');
var insert = require('gulp-insert');
var path = require('path');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');

var through = require('through2');
var nodemon = require('gulp-nodemon');
gulp.task('sass', function() {
    return gulp.src('app/frontend/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('static/css'))
});
gulp.task('libs', function() {
    return gulp.src('app/frontend/js/libs/*.js')
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('static/js'))
});
gulp.task('scripts', function() {
    return gulp.src('app/frontend/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('static/js'))
});
gulp.task('jade_client_compilation', function() {
    gulp.src('app/backend/templates/client/**/*.jade')
        .pipe(jade({
            client: true
        }))
        .pipe(modify())
        .pipe(concat('1_templates.js'))
        .pipe(insert.prepend('window.templates = {};\n'))
        .pipe(gulp.dest('app/frontend/js/'))
});

//dev watcher
gulp.task('dev', function () {
    nodemon({ script: 'app/backend/main.js', ext: 'js', ignore: ['static/*', 'frontend/*', 'gulpfile.js'] })
        .on('restart', function () {
            console.log('App restarted by nodemon!')
        });
});

gulp.task('watch', function() {
    gulp.watch('app/frontend/js/*.js', ['scripts']);
    gulp.watch('app/frontend/js/libs/*.js', ['libs']);
    gulp.watch('app/frontend/scss/**/*.scss', ['sass']);
    gulp.watch('app/backend/templates/client/**/*.jade', ['jade_client_compilation']);
    gulp.watch('app/backend/templates/cl_*.jade', ['jade_client_includes']);
});

// Dev start
gulp.task('default', ['sass', 'libs', 'jade_client_compilation', 'scripts', 'watch', 'dev']);

//Jade client templates binding
function modify() {
    function transform(file, enc, callback) {
        if (!file.isBuffer()) {
            this.push(file);
            callback();
            return;
        }
        var funcName = path.basename(file.path, '.js');
        var from = 'function template(locals) {';
        var to = 'window.templates.' + funcName + ' = function(locals) {';
        var contents = file.contents.toString().replace(from, to);
        file.contents = new Buffer(contents);
        this.push(file);
        callback();
    }
    return through.obj(transform);
}
