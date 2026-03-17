import { ComposerService } from "../service/composer.service.js";

export class ComposerController {
  static async create(req, res, next) {
    try {
      const data = await ComposerService.create(req.body);
      res.status(201).json({
        message: "Creado con éxito",
        code: 201,
        data,
      });
    } catch (error) {
      next(error)
    }
  }
  static async getAllData(req, res, next) {
    try {
      const data = await ComposerService.readData();

      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllActive(req, res, next) {
    try {
      const data = await ComposerService.getAllActive();

      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getByID(req, res, next) {
    try {
      const data = await ComposerService.getByID(req.params.id);
      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getActiveByID(req, res, next) {
    try {
      const data = await ComposerService.getActiveByID(req.params.id);
      res.status(200).json({
        message: "Archivo leido con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const data = await ComposerService.update(req.params.id, req.body);
      res.status(200).json({
        message: "Compositor editado con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateActive(req, res, next) {
    try {
      const data = await ComposerService.updateActive(req.params.id, req.body);
      res.status(200).json({
        message: "Compositor editado con éxito",
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async permaDelete(req, res, next) {
    try {
      await ComposerService.delete(req.params.id);

      res.status(200).json({
        message: "Compositor eliminado permantemente con éxito",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await ComposerService.softDelete(req.params.id);
      res.status(200).json({
        message: "Compositor eliminado con éxito",
        statusCode: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async restore(req, res, next) {
    try {
      const data = await ComposerService.restore(req.params.id)

      res.status(200).json({
        message: "Compositor restaurado con éxito",
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

