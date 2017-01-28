/* global env, rm, mkdir, cp, echo */

// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs');

var spinner = ora('building with stats...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpackConfig.stats = 'verbose'

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  fs.writeFile(path.join(__dirname, '../stats.json'),
               JSON.stringify(stats.toJson({chunkModules: true})),
               () => console.log('done'))
})
