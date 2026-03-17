import fs from 'fs/promises'
import path from 'path'
import { InternalServerError } from './errors.util.js';

export class FilesUtils{

  static async readFile(pathFile){
      try {
          const data  = await fs.readFile(pathFile, 'utf-8');
          return JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') return false;

        console.error('[ERROR], no se pudo leer el archivo', error);
        throw new InternalServerError(`[ERROR] Error crítico al leer ${pathFile}:`, error)
      }
  }

  static async writeFile(pathFile, data){
    try {
      await fs.writeFile(pathFile, JSON.stringify(data), 'utf-8')
    } catch (error){
      console.error(`[ERROR] no pudimos escribir el archivo`)
      throw new InternalServerError('Error al escribir el archivo')
    }
  }

  static async pathEnsure(pathFile) {
      try {
          const file = path.dirname(pathFile)
          await fs.mkdir(file, { recursive:true })
      } catch (error) {
          console.error('[ERROR] Error al asegurar la ruta')
          throw new InternalServerError('Error al asegurar la ruta')
      }
  }

}