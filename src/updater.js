const Updater = require('auto-updater');

module.exports = () => {
    const updater = new Updater({
        pathToJson: '',
        autoupdate: true,
        checkgit: false,
        jsonhost: 'raw.githubusercontent.com',
        contenthost: 'codeload.github.com',
        progressDebounce: 0,
        devmode: false
    });

    updater.on('check.up-to-date', (version) => {
        printVersion(version);
        console.log('최신버전입니다.');
    });

    updater.on('check.out-dated', (oldVersion, newVersion) => {
        printVersion(oldVersion);
        console.log('오래된 버전입니다. 자동 업데이트합니다');
        console.log(`새 버전 : ${newVersion}`);
        //TODO print changelogs
    });

    updater.on('download.start', (name) => {
        console.log('다운로드가 시작됐습니다.');
        console.log(`파일명 : ${name}`);
    });

    updater.on('download.error', (err) => {
        console.log('다운로드에 실패했습니다.');
        console.log(err);
    });

    updater.on('error', (name, err) => {
        console.log('업데이트 중에 에러가 났습니다.');
        console.log(`${name}: ${err}`);
        console.error(err);
    });

    updater.on('update.downloaded', () => {
        console.log('다운로드가 끝났습니다. 곧 설치가 시작됩니다.');
    });

    updater.on('update.not-installed', () => {
        console.log('다운로드가 끝났습니다. 곧 설치가 시작됩니다.');
    });

    updater.on('update.extracted', () => {
        console.log('업데이트가 성공적으로 끝났습니다.');
        console.log('재실행해주세요.');
    });

    updater.fire('check');
};

function printVersion(ver) {
    console.log(`Online Assignment Manager ver. ${ver}`);
    console.log('Author: MuRye(박성민)');
    console.log('Email: dreamaker7770@gmail.com');
    console.log('Github: @110EIm');
    console.log('Website: https://murye.io');
}
