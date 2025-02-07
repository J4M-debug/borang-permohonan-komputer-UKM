// Nama fail: service-worker.js

const CACHE_NAME = "loan_app_cache_v1";
const FILES_TO_CACHE = [
    "index.html",
    "manifest.json",
    "styles.css", // Pastikan fail CSS wujud dalam projek
    "script.js",  // Pastikan fail JS wujud dalam projek
    "icons/icon-192.png", // Pastikan ikon wujud dalam folder yang betul
    "icons/icon-512.png"
];

// Pasang Service Worker dan cache fail statik
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: Caching Files");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Aktifkan Service Worker dan hapus cache lama jika ada
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Service Worker: Menghapus cache lama");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Tangkap permintaan rangkaian dan berikan respons dari cache jika boleh
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Tambah fungsi validasi input sebelum hantar borang
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loanForm")?.addEventListener("submit", function(event) {
        let ukmper = document.getElementById("ukmper").value.trim();
        let nama = document.getElementById("nama").value.trim();
        let email = document.getElementById("email").value.trim();
        
        if (ukmper === "" || nama === "" || email === "") {
            alert("Sila isi semua ruangan yang wajib diisi (UKMper, Nama, dan Email). ");
            event.preventDefault(); // Halang penghantaran borang jika kosong
        }
    });
});

// Fungsi carian untuk UKMper dan Nama
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton")?.addEventListener("click", function() {
        let keyword = document.getElementById("searchInput").value.trim().toLowerCase();
        let records = document.querySelectorAll(".record");
        
        records.forEach(record => {
            let ukmper = record.querySelector(".ukmper").textContent.toLowerCase();
            let nama = record.querySelector(".nama").textContent.toLowerCase();
    
            if (ukmper.includes(keyword) || nama.includes(keyword)) {
                record.style.display = ""; // Tunjukkan rekod yang sepadan
            } else {
                record.style.display = "none"; // Sembunyikan rekod lain
            }
        });
    });
});
