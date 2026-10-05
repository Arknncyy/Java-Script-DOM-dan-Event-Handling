const dataPortofolio = [
    {
        judul: "Anggota Divisi Dokumentasi — Komisi Komunikasi Sosial Gereja Boro",
        waktu: "2022 – Sekarang",
        deskripsi: "Aktif berkontribusi sejak tahun 2022 dalam perencanaan konten visual, pengelolaan arsip dokumentasi kegiatan, serta produksi materi publikasi digital gereja."
    },
    {
        judul: "Tim Dokumentasi Festival Kesenian Tradisional",
        waktu: "November 2025",
        deskripsi: "Bertanggung jawab dalam pengambilan rekaman visual udara (aerial footage) untuk dokumentasi dan siaran kegiatan seni budaya tradisional."
    },
    {
        judul: "Tim Dokumentasi Inisiasi Sanata Dharma",
        waktu: "Agustus 2026",
        deskripsi: "Bertanggung jawab dalam pengambilan dokumentasi untuk Inisiasi Sanata Dharma (Insadha)."
    }
];

const containerPortofolio = document.querySelector("#container-portofolio");

function renderItemPortofolio(item) {
    const article = document.createElement("article");

    const judul = document.createElement("h3");
    judul.textContent = item.judul;

    const waktu = document.createElement("p");
    waktu.innerHTML = `<time>${item.waktu}</time>`;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = item.deskripsi;

    const tombolLike = document.createElement("button");
    tombolLike.textContent = "Like (0)";
    tombolLike.style.marginRight = "8px";

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus Item";
    tombolHapus.classList.add("btn-danger");

    article.appendChild(judul);
    article.appendChild(waktu);
    article.appendChild(deskripsi);
    article.appendChild(tombolLike);
    article.appendChild(tombolHapus);

    containerPortofolio.appendChild(article);
}

if (containerPortofolio) {
    dataPortofolio.forEach(renderItemPortofolio);
}

const btnTema = document.querySelector("#btn-tema");
if (btnTema) {
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        btnTema.textContent = document.body.classList.contains("dark-mode") ? "Mode Terang" : "Mode Gelap";
    });
}

const btnInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");
if (btnInfo && kotakAside) {
    btnInfo.addEventListener("click", () => {
        kotakAside.classList.toggle("tersembunyi");
    });
}

document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement.tagName;
    if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

    if (e.key.toLowerCase() === "d") {
        document.body.classList.toggle("dark-mode");
        if (btnTema) {
            btnTema.textContent = document.body.classList.contains("dark-mode") ? "Mode Terang" : "Mode Gelap";
        }
    }
});

const formPortofolio = document.querySelector("#form-portofolio");
if (formPortofolio) {
    formPortofolio.addEventListener("submit", (e) => {
        e.preventDefault();

        const judul = document.querySelector("#input-judul-porto").value.trim();
        const waktu = document.querySelector("#input-waktu-porto").value.trim();
        const deskripsi = document.querySelector("#input-deskripsi-porto").value.trim();

        if (judul && waktu && deskripsi) {
            renderItemPortofolio({ judul, waktu, deskripsi });
            formPortofolio.reset();
        }
    });
}

if (containerPortofolio) {
    containerPortofolio.addEventListener("mouseover", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.add("artikel-hover");
    });

    containerPortofolio.addEventListener("mouseout", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.remove("artikel-hover");
    });

    containerPortofolio.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Hapus Item") {
            e.target.closest("article").remove();
        }

        if (e.target.tagName === "BUTTON" && e.target.textContent.startsWith("Like")) {
            let jumlah = parseInt(e.target.dataset.like || 0);
            jumlah++;
            e.target.dataset.like = jumlah;
            e.target.textContent = `Like (${jumlah})`;
        }
    });
}


const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");
const btnHapusSemua = document.querySelector("#btn-hapus-semua");

if (formKomentar) {
    formKomentar.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = document.querySelector("#input-nama").value.trim();
        const pesan = document.querySelector("#input-pesan").value.trim();

        if (nama === "" || pesan.length < 5) {
            if (pesanError) {
                pesanError.textContent = "Nama wajib diisi dan komentar minimal 5 karakter!";
                pesanError.classList.remove("tersembunyi");
            }
            return;
        }

        if (pesanError) pesanError.classList.add("tersembunyi");

        const li = document.createElement("li");
        
        const teksKomentar = document.createElement("span");
        teksKomentar.textContent = `${nama}: ${pesan}`;

        const btnHapusKomentar = document.createElement("button");
        btnHapusKomentar.textContent = "Hapus";
        btnHapusKomentar.classList.add("btn-danger");
        btnHapusKomentar.style.marginLeft = "10px";

        li.appendChild(teksKomentar);
        li.appendChild(btnHapusKomentar);
        daftarKomentar.appendChild(li);

        formKomentar.reset();
    });
}

if (daftarKomentar) {
    daftarKomentar.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Hapus") {
            e.target.closest("li").remove();
        }
    });
}

if (btnHapusSemua && daftarKomentar) {
    btnHapusSemua.addEventListener("click", () => {
        daftarKomentar.innerHTML = "";
    });
}