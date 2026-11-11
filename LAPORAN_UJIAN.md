# Laporan UTS Web Software Tools

**Nama:** Abdullah Andrian Saputra
**Nomor Induk Mahasiswa:** 1252301
**Kelas:** Teknik Informatika
**Tanggal:** 11 November 2026

## A. Bukti pemeriksaan masalah
| Masalah | Alat yang digunakan | Bukti pemeriksaan | Perkiraan penyebab | Perbaikan | Hasil setelah perbaikan |
|---|---|---|---|---|---|
| Produk tidak muncul di halaman | Inspeksi kode `public/app.js` + permintaan HTTP ke server lokal (`npm run dev`) | Kode awal memanggil `fetch("/api/barang")`; permintaan `GET /api/barang` ke server lokal menghasilkan status **404**, sedangkan `GET /api/products` menghasilkan **200** | Endpoint yang dipanggil di `app.js` (`/api/barang`) tidak sama dengan endpoint yang didaftarkan di `server.mjs` (`/api/products`) | Mengubah `fetch("/api/barang")` menjadi `fetch("/api/products")` di `public/app.js` | Permintaan sekarang mengarah ke endpoint yang mengembalikan 200 dengan 4 produk |
| Tombol "+ Tambah ke Keranjang" tidak berfungsi | Inspeksi kode `public/app.js` | Template di `renderProducts()` membuat tombol dengan class `add-button`, tetapi event listener dipasang dengan `querySelectorAll(".add-to-cart")` yang tidak cocok dengan elemen apa pun | Nama class pada selector berbeda dengan class tombol yang dibuat, sehingga listener tidak pernah terpasang | Mengubah selector menjadi `querySelectorAll(".add-button")` di `public/app.js` | Selector kini cocok dengan tombol yang dibuat sehingga listener terpasang |
| Total belanja tidak sesuai (tidak kalikan quantity) | `npm run test:once` | 2 dari 7 tes gagal: "satu jenis barang dengan jumlah dua" (75000 ≠ 150000) dan "dua jenis barang dengan jumlah berbeda" (225000 ≠ 600000) | Fungsi `calculateTotal` di `src/cart.js` menjumlahkan `item.price` saja tanpa mengalikan `item.quantity`; juga terdapat variabel `discount` yang dideklarasikan tapi tidak pernah dipakai | Mengubah `item.price` menjadi `item.price * item.quantity` dan menghapus deklarasi `var discount` yang tidak terpakai | Semua 7 tes lulus (pass 7/7) |

## B. Hasil pengujian
- Jumlah pengujian sebelum perbaikan: 7 tes dijalankan, **5 lulus / 2 gagal**
- Jumlah pengujian berhasil setelah perbaikan: 7 tes dijalankan, **7 lulus / 0 gagal**
- Catatan perubahan pada fungsi yang diperiksa: Fungsi `calculateTotal` di `src/cart.js` diperbaiki — reducer kini menghitung `item.price * item.quantity` sehingga kuantitas setiap item diperhitungkan dengan benar dalam total belanja.

## C. Kualitas kode
- Temuan sebelum perbaikan: Variabel `var discount = 0` dideklarasikan di dalam `calculateTotal` namun tidak pernah digunakan (unused variable); penggunaan `var` yang sudah usang seharusnya diganti `const`/`let`.
- Perbaikan yang dilakukan: Menghapus `var discount = 0` yang tidak terpakai sekaligus memperbaiki logika `calculateTotal`.
- Hasil pemeriksaan ulang: Setelah perbaikan, `src/cart.js` tidak lagi memiliki variabel yang tidak terpakai; kode menggunakan sintaks modern ES module yang konsisten.

## D. Git
- Repository GitHub: https://github.com/driannn04/wst-uts-mini-toko
- Branch (jika membuat): Tidak membuat branch baru; semua perbaikan dilakukan pada branch `master`.
- Ringkasan commit:
  1. `0294f2b` — `chore: initial exam project` *(snapshot kondisi awal project sebelum perbaikan)*
  2. `2366b76` — `fix: perbaiki tiga bug pada cart.js dan app.js` *(perbaikan endpoint API, selector tombol, dan perhitungan total)*
  3. `75a9bf8` — `docs: lengkapi LAPORAN_UJIAN.md dengan semua temuan dan perbaikan`
  4. `be707cd` — `style: format app.js dengan Biome dan tambahkan package-lock.json`
  5. `a56bcea` — `docs: tambahkan link repository GitHub ke laporan`
  6. `da5b7af` — `feat: tambah konfigurasi Netlify dan identitas mahasiswa di laporan`
  7. `7c9729a` — `style: rapikan baris akhir berkas Netlify`
  8. `3e51a1f` — `docs: perbarui daftar commit pada laporan`
  9. `c64e246` — `feat: tambah konfigurasi deploy Vercel (api/products dan vercel.json)`
  10. `93dabe0` — `fix: paksa Vercel memakai situs statis dan abaikan server.mjs`
  11. `e736d70` — `chore: hapus konfigurasi Netlify, deploy memakai Vercel`
- Hasil pemeriksaan `git status`: `On branch master — nothing to commit, working tree clean`

## E. Pemakaian kecerdasan buatan (jika digunakan)
- Nama alat: Antigravity (asisten AI pemrograman)
- Pertanyaan/instruksi yang diberikan: "Tolong bantu saya mengerjakan UTS project, pahami dulu ketentuan soalnya lalu kerjakan project-nya."
- Bagian jawaban yang diterapkan: Identifikasi tiga bug (endpoint salah, selector salah, logika total salah) beserta lokasi baris kode persisnya; penerapan perbaikan pada `src/cart.js` dan `public/app.js`; inisialisasi Git dan penulisan commit message; konfigurasi deploy Vercel.
- Cara memeriksa apakah saran tersebut benar: Menjalankan `npm run test:once` (dari 5 lulus/2 gagal menjadi 7/7 lulus), menjalankan `npm run quality:check` (bersih), dan meminta `/api/barang` serta `/api/products` ke server lokal (404 berbanding 200). Pemeriksaan di browser perlu dilakukan sendiri oleh mahasiswa.

## F. Refleksi singkat
- Satu pelajaran paling penting dari ujian ini: Bug kecil seperti nama selector yang tidak cocok (`.add-to-cart` vs `.add-button`) atau lupa mengalikan kuantitas (`price` vs `price * quantity`) bisa membuat seluruh fitur tidak berfungsi. Alat pengujian otomatis dan browser DevTools sangat membantu menemukan akar masalah dengan cepat sebelum mencoba memperbaikinya secara spekulatif.
