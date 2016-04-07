const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');

const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.js');
const bundler = webpack(webpackConfig);

const stylePath = 'src/**/*.{css,sass}';
gulp.task('css', () => {
    gulp.src(stylePath)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync-server', () => {
    browserSync({
        https: false,
        ws: true,
        server: {
            baseDir: './',
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {colors: true}
                }),
                webpackHotMiddleware(bundler)
            ]
        },
        open: 'external'
    });
});

gulp.task('watch', ['css', 'browser-sync-server'], function () {
    gulp.watch([stylePath], ['css']);
});

gulp.task('build-demo', ['css', 'webpack:build-demo']);

gulp.task('webpack:build-demo', (callback) => {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = null;
    myConfig.entry = './index';
    myConfig.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(myConfig, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack:build', err);
        callback();
    });
});
