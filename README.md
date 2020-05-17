# TUGAS BESAR PEMROGRAMAN WEB LANJUT
## BACKEND WITH NODEJS + EXPRESSJS + MONGODB
### BUNDLE CLOTHES E-COMMERCE
| Nama | NIM |
|--|--|
| Muhammad Taufiq Hidayat | 14116162  |
| Isnedi Candra Kusuma | 14116136 |
| Aditya Ricky Pratama | 14116142 |

---
Untuk dokumentasi API lengkap dapat dilihat pada link [Postman disini](https://documenter.getpostman.com/view/8530975/Szmh4Hb6?version=latest#62ea36a3-2afa-44f8-9913-592348f9c07a)
untuk frontend dapat dilihat [pada repository ini](https://github.com/mtfiqh/bundleClothes-ecommerce-frontend)
---
### Penjelasan API
- Total API : 39 API
- functional API : 37 API
- git pull API : 1 API
- test API : 1 API
--
struktur Folder dokumentasi
![enter image description here](https://raw.githubusercontent.com/mtfiqh/bundleClothes-ecommerce-backend/master/github/Struktur%20API.png)
Setiap API yang di dalam folder: 
- User membutuhkan auth user
- Admin membutuhkan auth admin

**Auth menggunakan token yang dikirim bersamaan menggunakan *headers***
token didapatkan bersamaan dengan response ketika melakukan login
---
# Dependencies yang digunakan
|Name| Version |Link  | Description |
|--|--|--|--|
| bcrypt | 4.0.1 |[https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) | Untuk melakukan enkripsi pada password (hashing) |
| cors | 2.8.5 | [https://www.npmjs.com/package/cors](https://www.npmjs.com/package/cors) | Untuk mengaktifkan middleware cors, dan mengatasi permasalahan limited cors connection antara front end ke backend |
| dotenv | 8.2.0 | [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) | Menggunakan .env agar memudahkan penggunaan variable yang dibedakan pada tahap development dan produksi |
| express | 4.17.1 | [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express) | Web application framework untuk NodeJS |
| fs | 0.0.1-security | [https://www.npmjs.com/package/fs](https://www.npmjs.com/package/fs) | digunakan untuk melakukan pengoperasian pada file (save dan hapus file) |
| mongoose | 5.9.13 | [https://mongoosejs.com/](https://mongoosejs.com/) | Digunakan untuk konektifitas antara mongodb dan nodejs |
| multer | 1.4.2 | [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer) | digunakan untuk menerima request multipart/form-data (upload image / file) |
| simple-git | 2.4.0 | [https://www.npmjs.com/package/simple-git](https://www.npmjs.com/package/simple-git) | digunakan untuk melakukan pull pada github secara programmatically |
| uuid | 8.0.0 | [https://www.npmjs.com/package/uuid](https://www.npmjs.com/package/uuid) | melakukan generate uuid yang digunakan sebagai token |
|nodemon | 2.0.3 | [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon) | digunakan untuk menjalankan server, akan melakukan auto restart ketika melakukan perubahan 
