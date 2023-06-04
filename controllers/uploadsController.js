import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {v4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathToShedules = path.resolve(__dirname, '..', 'static/shedules');

class uploadsController {
    async sheduleUpload (req, res) {
        try {
            const extensions = ['pdf', 'doc', 'docx', 'rtf', 'txt', 'pptx', 'ppt', 'pps', 'odp', 'zip'];

            let extension = null;
        
            const file = req.files.file;
    
            file.name.split('.').forEach((i) => {
                if(extensions.includes(i)){
                    return extension = i;
                }else{
                    extension = 'docx';
                };
            });
    
            const uniqueFileName = v4() + `.${extension}`;
    
            file.mv(path.resolve(__dirname, '..', 'static/shedules', uniqueFileName));
            
            res.status(200).json({name: uniqueFileName});
        } catch (error) {
            console.log(error);
            res.json({message: 'Ошибка загрузки расписания'});
        };
    };
}

export default new uploadsController();