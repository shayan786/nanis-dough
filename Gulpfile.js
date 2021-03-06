'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    importOnce = require('node-sass-import-once'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    vfs = require('vinyl-fs'),
    pngquant = require('imagemin-pngquant');

//////////////////////////////
// Variables
//////////////////////////////
var dirs = {
  'js': {
    'uglify': [
      'src/js/**/*.js',
      '!src/js/**/*.min.js'
    ]
  },
  'server': {
    'main': 'index.js',
    'watch': [
      'index.js',
      'src/views'
    ],
    'types': 'js html'
  },
  'sass': 'src/sass/**/*.scss',
  'vendor': 'src/vendor/**/*.*',
  'videos': 'src/videos/*.*',
  'images': 'src/images/**/*.*',
  'public': 'public/'
};

var isCI = (typeof process.env.CI === 'undefined') ? process.env.CI : false;

//////////////////////////////
// Update BrowserSync
//////////////////////////////
browserSync = browserSync.create();

//////////////////////////////
// JavaScript Tasks
//////////////////////////////
gulp.task('uglify', function () {
  gulp.src(dirs.js.uglify)
    .pipe(gulpif(!isCI, sourcemaps.init()))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify({
        'mangle': isCI ? true : false
      }))
    .pipe(gulpif(!isCI, sourcemaps.write('maps')))
    .pipe(gulp.dest(dirs.public + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('uglify:watch', function () {
  gulp.watch(dirs.js.uglify, ['uglify']);
});

//////////////////////////////
// Vendor Tasks
//////////////////////////////
gulp.task('vendor', function () {
  gulp.src(dirs.vendor)
    .pipe(gulp.dest(dirs.public + 'vendor'));
});


//////////////////////////////
// Sass Tasks
//////////////////////////////
gulp.task('sass', function () {
  gulp.src(dirs.sass)
    .pipe(gulpif(!isCI, sourcemaps.init()))
    .pipe(sass({
      'outputStyle': isCI ? 'expanded' : 'compressed',
      'importer': importOnce,
      'importOnce': {
        'index': true,
        'css': true,
        'bower': true
      }
    }))
    .pipe(autoprefixer())
    .pipe(gulpif(!isCI, sourcemaps.write('maps')))
    .pipe(gulp.dest(dirs.public + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch(dirs.sass, ['sass']);
});

//////////////////////////////
// Image Tasks
//////////////////////////////
gulp.task('images', function (cb) {
  return gulp.src(dirs.images)
    .pipe(imagemin({
      'progressive': true,
      'svgoPlugins': [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.public + '/images'));

    if(err){console.log(err)}
});

gulp.task('images:watch', function () {
  gulp.watch(dirs.images, ['images']);
});


//////////////////////////////
// Video Tasks
//////////////////////////////
gulp.task('videos', function () {
  return vfs.src(dirs.videos, {followSymlinks: false})
  .pipe(vfs.symlink(dirs.public + 'videos'))
});

gulp.task('videos:watch', function () {
  gulp.watch(dirs.videos, ['videos']);
});


//////////////////////////////
// Nodemon Task
//////////////////////////////
gulp.task('nodemon', function (cb) {
  var started = false;

  nodemon({
    'script': dirs.server.main,
    'watch': dirs.server.watch,
    'ext': dirs.server.types,
    'env': {
      'NODE_ENV': 'development'
    }
  })
  .once('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('start', function () {
    setTimeout(function () {
      browserSync.reload();
    }, 500);
  })
  .on('restart', function () {
    // console.log('Restarted');
  });
});

//////////////////////////////
// Browser Sync Task
//////////////////////////////
gulp.task('browser-sync', ['nodemon'], function () {
  const url = "localhost:3000";

  browserSync.init({
    proxy: url,
    port: 3001
  });
});

//////////////////////////////
// Running Tasks
//////////////////////////////
gulp.task('build', ['uglify', 'sass', 'images', 'videos', 'vendor']);

gulp.task('test', ['build']);

gulp.task('watch', ['uglify:watch', 'sass:watch', 'images:watch', 'videos:watch']);

gulp.task('default', ['browser-sync', 'build', 'watch']);
