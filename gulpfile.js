"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("minifyImg", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src(["source/img/**/index-can-*.{png,jpg}", "source/img/**/*-small-*.{png,jpg}", "source/img/**/*-big-*.{png,jpg}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("svgSprite", function() {
  return gulp.src("source/img/sp-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite-social.svg"))
    .pipe(gulp.dest("build/img"))
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("myScripts", function() {
  return gulp.src(["source/js/*.js", "!source/js/picturefill.js",
  "!source/js/svgxuse.js"])
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest('build/js'));
});

gulp.task("minifyJS", function() {
  return gulp.src(["source/js/picturefill.js",
  "source/js/svgxuse.js"])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/*.min.js"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html",["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js",["scripts"]).on("change", server.reload);
});


gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "minifyImg",
    "svgSprite",
    "webp",
    "myScripts",
    "minifyJS",
    "html",
    done
  );
});
