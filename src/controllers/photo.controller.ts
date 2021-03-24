import {Request,Response} from 'express'
import Photo from '../models/Photo'

//para el borrado en disco de la imagen
import path from 'path'
import fs from 'fs-extra'

export async function getPhotos(req: Request,res: Response): Promise<Response>{
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req:Request,res:Response):Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function createPhoto (req: Request,res: Response): Promise<Response>{
    
    // necesito extraer del body los datos que voy a guardar en la base de datos
    const {title, description} = req.body;
    // console.log(req.file);
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    };
    
    // necesito crear un objeto documento de mongodb 
    const photo = new Photo(newPhoto);
    await photo.save()
    return res.json({
        message:'Photo seccessfully saved',
        photo
    })
}

export async function deletePhoto( req:Request, res:Response):Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if (photo){
        fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({
        message:'Photo Deleted',
        photo
    });
}

export async function updatePhoto(req:Request,res:Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id,{
        title,
        description
    });
    return res.json({
        message:'Seccessfully Updated',
        updatedPhoto
    });
}