'use strict';
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    const cnamePath = upath.resolve(upath.dirname(__filename), '../CNAME');

    sh.cp('-R', sourcePath, destPath);

    if (sh.test('-f', cnamePath)) {
        sh.cp(cnamePath, destPath);
    }
};
