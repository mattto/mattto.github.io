function busySleep(millisec)
{
    var start = new Date();
    var date = null;
    do {
      date = new Date();
    } while(date - start < millisec);
}

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  if (!event.preloadResponse) {
    console.log("event.preloadResponse is null");
    return;
  }

  if (event.request.url.indexOf('no_respondWith.html') != -1) {
    return;
  }

  if (event.request.url.indexOf('respondWith_preloadResponse.html') != -1) {
    const t0 = performance.now();
    event.respondWith(event.preloadResponse.then(resp => {
      if (resp == undefined) {
        return new Response('undef');
      }
      const t2 = performance.now();
      console.error('resolution_time_split: ' + (t2 - t1));
      console.error('resolution_time: ' + (t2 - t0));
      return resp;
    }));
    const t1 = performance.now();
    return;
  }
});
