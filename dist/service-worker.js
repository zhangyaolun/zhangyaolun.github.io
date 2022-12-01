// self 是 worker 子线程的标准
//  waiting.postMessage({ type: "SKIP_WAITING" }) 会触发下面事件监听
self.addEventListener('message', (event) => {
  console.log('message')
  console.log(event)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    //   调用 触发 controllerchange
    self.skipWaiting();
  }
});
