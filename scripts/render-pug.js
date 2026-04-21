'use strict';
const fs = require('fs').promises;
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');
const { icon } = require('@fortawesome/fontawesome-svg-core');
const brandIcons = require('@fortawesome/free-brands-svg-icons');
const solidIcons = require('@fortawesome/free-solid-svg-icons');

function normalizePrefix(prefix) {
    const value = String(prefix || '').toLowerCase().trim();
    const aliases = {
        'fa-brands': 'fab',
        brands: 'fab',
        fab: 'fab',
        'fa-solid': 'fas',
        solid: 'fas',
        fas: 'fas'
    };

    return aliases[value] || value;
}

function toIconEntry(iconDef) {
    if (!iconDef) {
        return null;
    }

    return {
        svg: icon(iconDef).html.join('')
    };
}

function collectIconsByPrefix(pack) {
    return Object.values(pack).reduce((acc, iconDef) => {
        if (!iconDef || typeof iconDef !== 'object' || !iconDef.prefix || !iconDef.iconName) {
            return acc;
        }

        if (!acc[iconDef.prefix]) {
            acc[iconDef.prefix] = {};
        }

        acc[iconDef.prefix][iconDef.iconName] = iconDef;
        return acc;
    }, {});
}

const iconRegistry = [brandIcons, solidIcons].reduce((acc, pack) => {
    const collected = collectIconsByPrefix(pack);
    Object.keys(collected).forEach((prefix) => {
        if (!acc[prefix]) {
            acc[prefix] = {};
        }

        Object.assign(acc[prefix], collected[prefix]);
    });

    return acc;
}, {});

function resolveIcon(prefix, iconName) {
    const normalizedPrefix = normalizePrefix(prefix);
    const normalizedName = String(iconName || '').toLowerCase().trim();
    const iconDef = iconRegistry[normalizedPrefix]?.[normalizedName];

    return toIconEntry(iconDef);
};

module.exports = async function renderPug(filePath) {
    const destPath = filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, '.html');
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    const html = pug.renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath,
        resolveIcon
    });

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const prettified = await prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    await fs.writeFile(destPath, prettified);
};
