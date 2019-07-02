function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

// 비동기 fn을 실행하고, 완료되는데 걸린 시간을 기록
async function run(fn, options) {
  const start = new Date();
  console.log(`[${format(start)}] Starting "${fn.name}"...`);
  
  await fn(options);
  
  const end = new Date();
  const time = end.getTime() - start.getTime();
  console.log(`[${format(end)}] Finished "${fn.name}" after ${time} ms`);
}

/* process.mainModule.children.length === 0 &&  */

console.log(process.mainModule.children.length);

if (process.argv.length > 2) {
  delete require.cache[__filename];
  const module = process.argv[2];
  
  console.log(module);
  console.log(require('./' + module + '.js'));
  
  run(require('./' + module + '.js'))
    .catch(error => console.error(error.stack));
}
export default run;