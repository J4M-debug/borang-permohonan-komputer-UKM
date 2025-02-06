self.addEventListener("install", (event) => {
    console.log("Service Worker: Berjaya Dipasang");
});

self.addEventListener("fetch", (event) => {
    console.log("Fetching:", event.request.url);
});
