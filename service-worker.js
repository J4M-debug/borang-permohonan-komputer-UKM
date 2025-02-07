// ✅ Minta Kebenaran Pengguna untuk Notifikasi
if ("Notification" in window && "serviceWorker" in navigator) {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notifikasi dibenarkan oleh pengguna.");
        }
    });
}

// ✅ Hantar Notifikasi Automatik Selepas Tindakan
function showNotification(message) {
    if (Notification.permission === "granted" && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then((reg) => {
            if (reg) {
                reg.showNotification("Permohonan Pinjaman UKM", {
                    body: message,
                    icon: "/icons/icon-192x192.png",
                });
            }
        });
    }
}

// ✅ Panggil Fungsi Notifikasi dalam Fungsi Sedia Ada
function saveData() {
    alert("Permohonan berjaya disimpan!");
    showNotification("Permohonan anda telah berjaya dihantar!");
}

function searchData() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let storedData = JSON.parse(localStorage.getItem("loanData")) || [];
    let results = document.getElementById("searchResults");
    results.innerHTML = "";
    
    let found = false;
    storedData.forEach(entry => {
        if (entry.ukmper.toLowerCase().includes(keyword) || entry.nama.toLowerCase().includes(keyword)) {
            let li = document.createElement("li");
            li.textContent = `UKMPer: ${entry.ukmper}, Nama: ${entry.nama}`;
            results.appendChild(li);
            found = true;
        }
    });

    if (found) {
        alert("Rekod ditemui!");
        showNotification("Rekod berjaya ditemui!");
    } else {
        alert("Tiada rekod yang sepadan.");
        showNotification("Tiada rekod dijumpai.");
    }
}

function resetForm() {
    document.getElementById("loanForm").reset();
    localStorage.removeItem("loanData");
    document.getElementById("searchResults").innerHTML = "";
    alert("Semua data telah dipadam!");
    showNotification("Semua data telah dipadamkan!");
}
