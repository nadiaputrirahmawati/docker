import { Router } from "express";
import { dataBuku, deleteBuku, detailBuku, TambahBuku, updateBuku } from "../controllers/bukuContoller";
import { protect } from "../middleware/authMiddleware";

const routerBuku = Router();

/**
 * @swagger
 * tags:
 *   name: Buku
 *   description: Manajemen data buku
 */

/**
 * @swagger
 * /api/buku/data:
 *   get:
 *     summary: Dapatkan daftar semua buku
 *     tags: [Buku]
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
 */
routerBuku.get('/data', dataBuku);

/**
 * @swagger
 * /api/buku/data/{id}:
 *   get:
 *     summary: Dapatkan detail buku berdasarkan ID
 *     tags: [Buku]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Detail buku berhasil diambil
 *       404:
 *         description: Buku tidak ditemukan
 */
routerBuku.get('/data/:id', detailBuku);

/**
 * @swagger
 * /api/buku/tambah:
 *   post:
 *     summary: Tambah buku baru
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kodebuku:
 *                 type: number
 *               judul:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               tersedia:
 *                 type: boolean
 *               pengarang:
 *                 type: string
 *               harga:
 *                 type: number
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.post('/tambah', protect, TambahBuku);

/**
 * @swagger
 * /api/buku/data/{id}:
 *   put:
 *     summary: Update buku berdasarkan ID
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kodebuku:
 *                 type: number
 *               judul:
 *                 type: string
 *               deskripsi:
 *                 type: string
 *               tersedia:
 *                 type: boolean
 *               pengarang:
 *                 type: string
 *               harga:
 *                 type: number
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       404:
 *         description: Buku tidak ditemukan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.put('/data/:id', protect, updateBuku);

/**
 * @swagger
 * /api/buku/data/{id}:
 *   delete:
 *     summary: Hapus buku berdasarkan ID
 *     tags: [Buku]
 *     security:
 *       - bearerAuth: []  # Menggunakan skema keamanan JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 *       401:
 *         description: Token tidak valid atau tidak ada
 */
routerBuku.delete('/data/:id', protect, deleteBuku);

export default routerBuku;
