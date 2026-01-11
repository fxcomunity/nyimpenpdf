# PDF Library (Vercel)

Ini website statis (HTML) buat nampilin daftar PDF dari Google Drive pake embed preview.

## Deploy ke Vercel (paling gampang)
1. Extract ZIP ini
2. Upload foldernya ke GitHub (atau GitLab/Bitbucket)
3. Buka Vercel -> New Project -> Import repo
4. Framework Preset: **Other**
5. Build Command: **(kosong / none)**
6. Output Directory: **.** (root)
7. Deploy

## Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```
Pilih project settings default (karena static).

## Catatan
- Pastikan setiap file PDF di Google Drive: **Anyone with the link can view**
- Kalau mau ada Search, judul custom, atau password, bilang aja.
