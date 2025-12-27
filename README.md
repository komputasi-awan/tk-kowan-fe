# JobFit AI - Frontend
Sistem analisis resume berbasis AI yang dibangun dengan Next.js dan terintegrasi dengan backend FastAPI yang menggunakan Google Gemini AI.

## Link Repository
- **Frontend:** https://github.com/komputasi-awan/tk-kowan-fe
- **Backend:** https://github.com/komputasi-awan/tk-kowan

## Penjelasan Aplikasi
JobFit AI dapat membantu pencari kerja mengoptimalkan resume mereka dengan menganalisis konten CV terhadap deskripsi pekerjaan menggunakan AI. Sistem ini memberikan skor kecocokan, ringkasan, dan rekomendasi skill pekerja yang masih perlu ditingkatkan.

**Fitur Utama:**
- **Authentication:** Firebase Authentication dengan Email/Password & Google OAuth
- **CV Upload:** Upload file PDF yang aman ke AWS S3 (Private Bucket)
- **Secure Access:** Menggunakan Presigned URLs untuk akses file sementara
- **PDF Parsing:** Ekstraksi teks otomatis dari PDF (via AWS Lambda)
- **AI Analysis:** Integrasi dengan Google Gemini untuk mencocokkan CV vs Job Description
- **Analysis Result:** Menampilkan skor kecocokan, ringkasan CV, dan skill yang kurang

**Alur Pengguna:**
```
Login/Register → Dashboard → Upload CV + Job Description → Analisis AI → Lihat Hasil
```

## Tech Stack

| Teknologi | Fungsi |
|-----------|--------|
| Next.js | React framework dengan App Router |
| TypeScript | Pengembangan dengan type-safe |
| Tailwind CSS | Styling UI yang responsif |
| Firebase Auth | Autentikasi pengguna |
| Axios | Komunikasi dengan backend API |

**Integrasi Backend:** FastAPI (AWS EC2 + Docker), Amazon S3 (penyimpanan file), Google Gemini AI (analisis CV), AWS Lambda (parsing PDF)

## Setup Development

### Prerequisites
- Node.js 18.x atau lebih tinggi
- Kredensial Firebase project
- Akses ke backend API

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/komputasi-awan/tk-kowan-fe
cd tk-kowan-fe

# 2. Install dependencies
npm install

# 3. Buat file `.env.local` dan salin isi berkas `.env.example` ke file tersebut.

# 4. Jalankan development server
npm run dev
```

**Catatan:** 
- Semua variabel `NEXT_PUBLIC_*` adalah **client-side** dan akan ter-expose di browser
- Firebase API Key bukan secret, keamanan dijaga oleh Firebase Security Rules

## Panduan Deployment (Vercel)

### Langkah 1: Push Kode ke GitHub
```bash
git add .
git commit -m "Siap untuk deployment"
git push origin main
```

### Langkah 2: Import ke Vercel
1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New Project"**
3. Pilih **"Import Git Repository"**
4. Pilih repository: `komputasi-awan/tk-kowan-fe`
5. Klik **"Import"**

### Langkah 3: Konfigurasi Build Settings
- **Framework:** Next.js
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### Langkah 4: Tambahkan Environment Variables
Di pengaturan project Vercel, salin semua variabel dari `.env.local` (atau lihat berkas .env.example).

### Langkah 5: Deploy
1. Klik **"Deploy"**
2. Tunggu 2-5 menit hingga build selesai
3. Akses aplikasi di: `https://your-app.vercel.app`

## Struktur Project
```
src/
├── app/              # Halaman Next.js (App Router)
├── components/       # Komponen UI
├── services/         # Logika API & auth
└── lib/              # Utilities
```

## Anggota Tim
1. Arya Kusuma Daniswara - 2206083546
2. Sabrina Atha Shania - 2206829591
3. Wahyu Hidayat - 2206081894
4. Ratu Nadya Anjania - 2206029752
5. Muhammad Pendar Bintang Kasdiono - 2206083174