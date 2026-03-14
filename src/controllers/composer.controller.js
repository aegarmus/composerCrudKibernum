import { ComposerService } from "../service/composer.service.js";

export class ComposerController {
  static async create(req, res) {
    try {
      const data = await ComposerService.create(req.body);
      res.status(201).json({
        message: "Creado con éxito",
        code: 201,
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "No se creó el compositor",
        code: 500,
        error,
      });
    }
  }
  static async getAllData(req, res) {
    try {
      const data = await ComposerService.readData();

      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      res.status(404).json({
        message: "No se pudo encontrar la data",
        statusCode: 404,
        error,
      });
    }
  }

  static async getByID(req, res) {
    try {
      const data = await ComposerService.getByID(req.params.id);
      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      res.status(404).json({
        message: `Compositor no encontrado`,
        statusCode: 404,
        error,
      });
    }
  }

  static async update(req, res) {
    try {
        const data = await ComposerService.update(req.params.id, req.body);
        res.status(200).json({
            message: 'Compositor editado con éxito',
            statusCode: 200,
            data
        })
    } catch(error) {
        res.status(500).json({
            message: 'No se pudo editar compositor',
            statusCode: 500,
            error
        })
    }
  }

  static async delete(req, res) {
    try {
        await ComposerService.delete(req.params.id)

        res.status(200).json({
            message: 'Compositor eliminado con éxito',
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
          message: "No se pudo eliminar al compositor",
          statusCode: 500,
          error,
        });
    }
  }
}
