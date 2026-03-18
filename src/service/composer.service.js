import { Composer } from "../models/Composer.js";
import { ComposerError, NotFoundError } from "../utils/errors.util.js";
import { FilesUtils } from "../utils/file.util.js";
import { Logger } from "../utils/logger.util.js";
export class ComposerService {
  static #Pathfile = "./src/data/composer.json";
  static logger = new Logger('Composer'); // Cambiar a estática

  static async create(composer) {

    try {
      this.logger.info('Inciando Proceso de creación de compositor')

      this.logger.info(`Asegurando ruta ${this.#Pathfile}`);
      await FilesUtils.pathEnsure(this.#Pathfile); //se asegura que el archivo exista

      this.logger.info('Buscando compositores registrados')
      const composers = await FilesUtils.readFile(this.#Pathfile); // lee los compositores actuales

      this.logger.debug('Creando nueva instancia de compositor')
      const newComposer = Composer.create(composer); // cr-ea un nuevo compositor a partir de los datos proporcionados
      this.logger.debug(`Nueva instancia creada: ${JSON.stringify(newComposer.toFullJSON())}`)

      //Asegurar que los compositores existen
      if (!composers) {
        this.logger.warn('No hay registro de compositores previos')
        const composerData = [newComposer.toFullJSON()];
        this.logger.debug(`Creando nueva estructura para archivo JSON: ${composerData}`)

        this.logger.info(`Creando el archivo`)
        await FilesUtils.writeFile(this.#Pathfile, composerData);
        this.logger.info(`Archivo creado con éxito`)
        return newComposer.toJSON();
      }
      
      this.logger.info('Agregando nuevo compositor')
      composers.push(newComposer.toFullJSON()); // agregar el nuevo compositor al arreglo

      this.logger.info(`Creando el archivo`)
      await FilesUtils.writeFile(this.#Pathfile, composers);
      this.logger.info(`Archivo creado con éxito`)
      return newComposer.toJSON();
    } catch (error) {
      this.logger.error(`Error al crear el compositor: ${error.message}`);
      throw new ComposerError('Error al crear al compositor', error.message);
    }
  }

  static async readData() {
    try {
      console.log(`Comienza a leer datos de ${this.#Pathfile}`);
      const composersRaw = await FilesUtils.readFile(this.#Pathfile);
      const composers = composersRaw.map((composer) => {
        const composerInstance = Composer.create(composer);
        return composerInstance.toJSON();
      });
      console.log(`Data recogida con Exito`);
      return composers;
    } catch (error) {
      console.log(`Error: no se pudo leer los datos`);
      throw new ComposerError('Error al leer los datos del compositor', error.message);
    }
  }

  static async getAllActive() {
    try {
      const composersRaw = await FilesUtils.readFile(this.#Pathfile);

      const composersActive = composersRaw.filter(
        (composer) => composer.isActive,
      );

      const composers = composersActive.map((composer) => {
        const composerInstance = Composer.create(composer);
        return composerInstance.toJSON();
      });

      return composers;
    } catch (error) {
      console.log(`Error: no se pudo leer los datos`);
      throw new ComposerError(
        "Error al leer los datos del compositor",
        error.message,
      );
    }
  }

  static async getByID(id) {
    try {
      const data = await FilesUtils.readFile(this.#Pathfile);
      const composerFound = data.find((composer) => {
        return composer.id === id;
      });
      if (!composerFound)  
        throw new NotFoundError(
          "Compositor no encontrado",
          `No se encontro al compositor con el id ${id}`,
        );
      return composerFound;
    } catch (error) {
      console.log("No se pudo encontrar el compositor");
      throw new ComposerError(
        "Error al leer los datos del compositor",
        error.message,
      );
    }
  }

  static async getActiveByID(id) {
    try {
      const data = await FilesUtils.readFile(this.#Pathfile);
      const composerFound = data.find((composer) => {
        return composer.id === id;
      });

      if (!composerFound || !composerFound.isActive) 
        throw new NotFoundError(
          "Compositor no encontrado", 
          `No se encontro al compositor con el id ${id}`
        );

      const composerInstance = Composer.create(composerFound);
      console.log(composerInstance.toFullJSON());

      return composerInstance.toJSON();
    } catch (error) {
      console.log("No se pudo encontrar el compositor");
      throw new ComposerError(
        "Error al leer los datos del compositor",
        error.message,
      );
    }
  }

  static async update(id, newComposer) {
    try {
      const previewComposer = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = previewComposer.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
         throw new NotFoundError(
           "Compositor no encontrado para actualizar",
           `No se encontro al compositor con el id ${id}`,
         );

      const composerUpdated = Composer.create({ ...newComposer, id });

      previewComposer[indexComposer] = composerUpdated.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, previewComposer);
      return composerUpdated.toJSON();
    } catch (error) {
      console.log("Error al actualizar el compositor:", error.message);
      throw new ComposerError('Error al actualizar al compositor',`${error.message}`);
    }
  }

  static async updateActive(id, newComposer) {
    try {
      const previewComposer = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = previewComposer.findIndex(
        (composer) => composer.id === id && composer.isActive,
      );

      if (indexComposer === -1)
              throw new NotFoundError(
                "Compositor no encontrado para actualizar",
                `No se encontro al compositor con el id ${id}`,
              );


      const composerUpdated = Composer.create({ ...newComposer, id });

      previewComposer[indexComposer] = composerUpdated.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, previewComposer);
      return composerUpdated.toJSON();
    } catch (error) {
      console.log("Error al actualizar el compositor:", error.message);
      throw new ComposerError(
        "Error al actualizar al compositor",
        `${error.message}`,
      );
    }
  }

  static async delete(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = composers.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
        throw new NotFoundError(
          "Compositor no encontrado para actualizar",
          `No se encontro al compositor con el id ${id}`,
        );

      composers.splice(indexComposer, 1);

      await FilesUtils.writeFile(this.#Pathfile, composers);
    } catch (error) {
      console.log("Error al eliminar el compositor:", error.message);
      throw new ComposerError(
        "Error al eliminar al compositor",
        `${error.message}`,
      );
    }
  }

  static async softDelete(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = composers.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
        throw new NotFoundError(
          "Compositor no encontrado para actualizar",
          `No se encontro al compositor con el id ${id}`,
        );
      const composerToDelete = composers[indexComposer];

      const composerInstance = Composer.create(composerToDelete);

      composerInstance.desactivate();

      composers[indexComposer] = composerInstance.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, composers);
    } catch (error) {
      console.log("Error al eliminar el compositor:", error.message);
      throw new ComposerError(
        "Error al eliminar al compositor",
        `${error.message}`,
      );
    }
  }

  static async restore(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile)
      const indexComposer = composers.findIndex(composer => composer.id === id)

      if(indexComposer === -1) 
        throw new NotFoundError(
          "Compositor no encontrado para actualizar",
          `No se encontro al compositor con el id ${id}`,
        );

      const composerToRestore = composers[indexComposer]
      const composerInstance = Composer.create(composerToRestore)

      composerInstance.activate()

      composers[indexComposer] = composerInstance.toFullJSON()

      await FilesUtils.writeFile(this.#Pathfile, composers)
      return composerInstance.toJSON()
    } catch (error) {
      console.log("Error al restaurar el compositor:", error.message);
      throw new ComposerError(
        "Error al restaurar al compositor",
        `${error.message}`,
      );
    }
  }
}

