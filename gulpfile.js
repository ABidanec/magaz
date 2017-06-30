var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require("browser-sync");

// компиляция sass
gulp.task('sass', function(){ 
	gulp.src("app/sass/**/*.scss")
		.pipe(sass().on('error', sass.logError)) // .on('error', sass.logError) - чтобы не было фатальной ошибки при синтаксической ошибки в sass файле, а только уведомление
		.pipe(gulp.dest("app/css"));
});

gulp.task('browser-sync', function(){
	browserSync({
		server : {
			baseDir : "app"
		},
		notify: false
	})
});

gulp.task("watch", ['browser-sync'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('default', ['watch']);