import { Request, Response, RequestHandler } from "express";
import { Buku } from "../models/Buku";
import apiResponse from "../utils/apiResponse";

export const TambahBuku: RequestHandler = async (Req: Request, Res: Response): Promise<void> => {
    const { kodebuku, judul, deskripsi, tersedia, pengarang, harga } = Req.body;
    try {
        
        const cekKode = await Buku.findOne({ kodebuku });
        if (cekKode) {
            Res.status(400).json(apiResponse(false, 'Maaf, Kode Buku Sudah Terdaftar'));
            return;
        }

        const buku = new Buku({
            kodebuku,
            judul,
            deskripsi,
            tersedia,
            pengarang,
            harga
        });

        await buku.save();
        Res.status(200).json(apiResponse(true, 'Buku Berhasil Di Tambahkan', { buku }))

    } catch (error) {
        const errorMessage = (error as Error).message
        Res.status(500).json(apiResponse(false, 'Gagal Tambahkan Buku', {error: errorMessage}))
    }
}

export const dataBuku = async (Req: Request, Res: Response): Promise<void> => {
    try {

        const buku = await Buku.find();
        Res.status(200).json(apiResponse(true, 'Data Buku Tesedia', { buku }))
    } catch (error) {
        Res.status(500).json(apiResponse(false, 'Data Buku Tidak Tersedia'))
    }
}

export const detailBuku = async (Req: Request, Res: Response): Promise<void> => {
    const { kodebuku } = Req.params;

    try {
        const detail = await Buku.findOne({kodebuku});
        if (!detail) {
            Res.status(404).json(apiResponse(false, 'Data Buku Tidak Ditemukan'));
            return;
        }
        Res.status(200).json(apiResponse(true, 'Detail Data Berhasil', { detail }));
    } catch (error) {
        const errorMessage = (error as Error).message;
        Res.status(500).json(apiResponse(false, 'Gagal Mendapatkan Detail Buku', { error: errorMessage }));
    }
};

export const deleteBuku = async(Req: Request, Res: Response): Promise<void> => {

    const {id} = Req.params;
    try {
        const buku = await Buku.findByIdAndDelete(id)

        Res.status(200).json(apiResponse(true, 'Buku Berhasil Di Hapus', {buku}))

    }catch(error){
        const errorMessage = (error as Error).message;
        Res.status(500).json(apiResponse(false, 'Gagal Mendapatkan Detail Buku', { error: errorMessage }));
    }
}

export const updateBuku = async (Req: Request, Res: Response): Promise<void> => {

    const {id} = Req.params;
    try {

        const update = await Buku.findByIdAndUpdate(id, Req.body, { new: true });

        if(!update){
            Res.status(404).json(apiResponse(false, 'Buku Tidak Ditemukan'));
        }

        Res.status(200).json(apiResponse(true, 'Data Berhasil Di Update', { update }));

    }catch(error){
        Res.status(500).json(apiResponse(false, 'Gagal Update Buku'));
    }
}