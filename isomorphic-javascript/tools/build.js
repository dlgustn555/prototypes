import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import Promise from 'bluebird';
import run from './run';


async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
}

// 정적 파일을 결과물 디렉토리에 복사
async function copy() {
 const ncp = Promise.promisify(require('ncp'));
 // public 폴더 전체와 package.json을 build 폴더로 복사
 await ncp('public', 'build/public');
 await ncp('package.json', 'build/package.json');
}

// 웹팩으로 소스 코드 번들링
async function bundle({ watch }) {
  return new Promise((resolve, reject) => {
    let runCount = 0;
    const bundler = webpack(webpackConfig);
    const cb = (err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig[0].stats));

      if (++runCount === (watch ? webpackConfig.length : 1)) {
        return resolve();
      }
    };

    if (watch) {
      bundler.watch(200, cb);
    } else {
      bunderl.run(cb);
    }
  });
}

async function build(options = { watch: false }) {
  await run(clean);
  await run(copy);
  await run(bundle, options);
}

export default build;