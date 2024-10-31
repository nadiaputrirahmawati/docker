import { User } from "../models/User";
import { Response, Request, RequestHandler } from "express";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Jwt  from "jsonwebtoken";
import apiResponse from "../utils/apiResponse";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

export const registerUser: RequestHandler = async (req: Request, res: Response): Promise<void> =>{
    const { username, email, password } = req.body;

    try {
        const cekEmail = await User.findOne({ email });

        if (cekEmail) {
             res.status(401).json(apiResponse(false, 'Email Sudah Terdaftar'));
        }

        const hashPw = await bcrypt.hash(password, 17);

        const user = new User({
            username,
            email,
            password: hashPw,
        });

        await user.save();

         res.status(201).json(apiResponse(true, 'Registrasi Berhasil, Silahkan Login'));

    } catch (error) {
         res.status(500).json(apiResponse(false, 'Registrasi Gagal !!'));
    }
};

export const Login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const users = await User.findOne({ email });

        if (!users) {
            res.status(401).json(apiResponse(false, 'Email Tidak Ditemukan'));
            return; 
        }

        const checkPw = await bcrypt.compare(password, users.password);
        if (!checkPw) {
            res.status(400).json(apiResponse(false, 'Password Salah'));
            return;
        }

        const payload = { userId: users.id };
        const token = Jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json(apiResponse(true, 'Login Berhasil', { token }));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Login Gagal !!'));
    }
};