const concurrently = require('concurrently');
const upath = require('upath');

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

async function start() {
    try {
        await concurrently([
            { command: 'node --inspect scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' },
            { 
                command: `${browserSyncPath} dist -w --no-online`,
                name: 'SB_BROWSER_SYNC', 
                prefixColor: 'bgBlue.bold',
            }
        ], {
            prefix: 'name',
            killOthers: ['failure', 'success'],
        });
        success();
    } catch (error) {
        failure();
    }
}

function success() {
    console.log('Success');
}

function failure() {
    console.log('Failure');
}

start();
