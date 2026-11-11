# Laporan UTS Web Software Tools

**Nama:** Abdullah Andrian Saputra
**Nomor Induk Mahasiswa:** 1252301
**Kelas:** Teknik Informatika
**Tanggal:** 11 November 2026

## A. Bukti pemeriksaan masalah
| Masalah | Alat yang digunakan | Bukti pemeriksaan | Perkiraan penyebab | Perbaikan | Hasil setelah perbaikan |
|---|---|---|---|---|---|
| Produk tidak muncul di halaman | Browser DevTools (tab Network) | Request ke `/api/barang` mengembalikan status 404 | Endpoint yang dipanggil di `app.js` baris 48 adalah `/api/barang`, sedangkan server hanya mendaftarkan `/api/products` | Mengubah `fetch("/api/barang")` menjadi `fetch("/api/products")` di `public/app.js` | Produk berhasil tampil — status menjadi "4 produk tersedia" |
| Tombol "+ Tambah ke Keranjang" tidak berfungsi | Browser DevTools (tab Console) + inspeksi kode | Klik tombol tidak memicu event apapun; `querySelectorAll(".add-to-cart")` mengembalikan NodeList kosong | Template HTML di `renderProducts()` memberi class `add-button` pada tombol, namun event listener dipasang pada selector `.add-to-cart` yang tidak ada | Mengubah `querySelectorAll(".add-to-cart")` menjadi `querySelectorAll(".add-button")` di `public/app.js` baris 27 | Tombol berhasil menambahkan produk ke keranjang |
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
- Hasil pemeriksaan `git status`: `On branch master — nothing to commit, working tree clean`

## E. Pemakaian kecerdasan buatan (jika digunakan)
- Nama alat: Antigravity (Google DeepMind) dengan model Claude Sonnet 4.6 Thinking
- Pertanyaan/instruksi yang diberikan: "Tolong bantu saya mengerjakan UTS project, pahami dulu ketentuan soalnya lalu kerjakan project-nya."
- Bagian jawaban yang diterapkan: Identifikasi tiga bug (endpoint salah, selector salah, logika total salah) beserta lokasi baris kode persisnya; penerapan perbaikan pada `src/cart.js` dan `public/app.js`; inisialisasi Git dan penulisan commit message.
- Cara memeriksa apakah saran tersebut benar: Menjalankan `npm run test:once` — dari 2 tes gagal menjadi 7/7 lulus; membuka aplikasi di browser dan mengklik tombol "+ Tambah ke Keranjang" — produk berhasil masuk keranjang dan total dihitung dengan benar.

## F. Refleksi singkat
- Satu pelajaran paling penting dari ujian ini: Bug kecil seperti nama selector yang tidak cocok (`.add-to-cart` vs `.add-button`) atau lupa mengalikan kuantitas (`price` vs `price * quantity`) bisa membuat seluruh fitur tidak berfungsi. Alat pengujian otomatis dan browser DevTools sangat membantu menemukan akar masalah dengan cepat sebelum mencoba memperbaikinya secara spekulatif.
