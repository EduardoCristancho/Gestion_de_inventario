import { Injectable } from "@nestjs/common";
import * as fs from 'fs'
import { join } from "path";
@Injectable()
export class StorageService {

    async savePhoto(photo : Express.Multer.File): Promise<string>{
        const directory = join(process.cwd(), 'uploads')

        //Creamos el directorio si no existe 
        if(!fs.existsSync(directory)){
            fs.mkdirSync(directory, { recursive: true });
        }

        //Creamos un codigo unico para identificar la imagen
        const fileExtension = photo.originalname.split('.').pop()
        const filename = `${Date.now()}-${this.generarCodigoString(9)}.${fileExtension}`
        const fullpath = join(directory, filename);

        //guardamos la imagen en el directorio
        fs.writeFileSync(fullpath, photo.buffer)

        //Devolvemos la url
        const baseUrl = process.env.BASE_URL || "http://localhost:3001"
        return `${baseUrl}/uploads/${filename}`;
    }

    generarCodigoString(digitos: number) {
        let codigo = "";
        for (let i = 0; i < digitos; i++) {
            codigo += Math.floor(Math.random() * 10); // Añade un dígito del 0 al 9
        }
    return codigo;
    }


}