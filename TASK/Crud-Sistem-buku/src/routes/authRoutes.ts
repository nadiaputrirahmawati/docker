import { Router } from 'express';
import { Login, registerUser } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoint untuk autentikasi pengguna
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Mendaftarkan pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Pengguna berhasil didaftarkan
 *       400:
 *         description: Permintaan tidak valid (misalnya, email sudah digunakan)
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil, token JWT dikembalikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token untuk autentikasi
 *       401:
 *         description: Kredensial tidak valid
 */
router.post('/login', Login);

export default router;
