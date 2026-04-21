'use strict';
const autoprefixer = require('autoprefixer')
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const postcss = require('postcss')
const sass = require('sass');
const sh = require('shelljs');

const stylesPath = upath.resolve(upath.dirname(__filename), '../src/scss/styles.scss');
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css');

module.exports = function renderSCSS() {
    try {
        const results = sass.compile(stylesPath, {
            loadPaths: [
                upath.resolve(upath.dirname(__filename), '../node_modules')
            ]
        });

        const destPathDirname = upath.dirname(destPath);
        if (!sh.test('-e', destPathDirname)) {
            sh.mkdir('-p', destPathDirname);
        }

        const bannerComment = `/*!
* Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
*/
`;

        return postcss([autoprefixer]).process(results.css, {
            from: 'styles.css',
            to: 'styles.css'
        }).then(result => {
            result.warnings().forEach(warn => {
                console.warn(warn.toString())
            })
            fs.writeFileSync(destPath, bannerComment + result.css.toString());
        }).catch(err => {
            console.error('PostCSS error:', err);
            throw err;
        });
    } catch (err) {
        console.error('SCSS compilation error:', err);
        throw err;
    }
};
