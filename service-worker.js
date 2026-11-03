/* EMVE app: makes the home-screen app installable.
   Only the app's own pages are handled (always fresh from the network);
   Google Sheet / Apps Script requests are left to the browser. */
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e) {
  var req = e.request;
  if (req.mode !== 'navigate' || req.method !== 'GET') return;
  e.respondWith(fetch(req).catch(function() {
    return new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<body style="font-family:sans-serif;text-align:center;padding:60px 20px;color:#0f172a">' +
      '<h2>Internet नाही</h2><p>Internet सुरू करून पुन्हा उघडा.</p></body>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
