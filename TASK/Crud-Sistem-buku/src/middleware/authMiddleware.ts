import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import apiResponse from '../utils/apiResponse';

interface DecodedToken {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

      // User Berdasarkan Id
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        res.status(401).json(apiResponse(false, 'Maaf, User Tidak Di Temukan', {decoded}));
        return;
      }

      console.log(req.user)
      next();
    } else {
      res.status(401).json(apiResponse(false, 'Maaf, Fitur Ini Tidak Bisa Di akses,  Login Terlebih Dahulu'));
    }
  } catch (error) {
    res.status(401).json(apiResponse(false, 'Maaf, Fitur Ini Tidak Bisa Di akses, Login Terlebih Dahulu'));
  }
};

export { protect };
