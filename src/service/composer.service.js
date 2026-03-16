import { Composer } from "../models/Composer.js";
import { FilesUtils } from "../utils/file.util.js";
export class ComposerService {
  static #Pathfile = "./src/data/composer.json";

  static async create(composer) {
    try {
      await FilesUtils.pathEnsure(this.#Pathfile); //se asegura que el archivo exista
      const composers = await FilesUtils.readFile(this.#Pathfile); // lee los compositores actuales
      const newComposer = Composer.create(composer); // crea un nuevo compositor a partir de los datos proporcionados

      //Asegurar que los compositores existen
      if (!composers) {
        const composerData = [newComposer.toFullJSON()];
        await FilesUtils.writeFile(this.#Pathfile, composerData);
        return newComposer.toJSON();
      }

      composers.push(newComposer.toFullJSON()); // agregar el nuevo compositor al arreglo
      await FilesUtils.writeFile(this.#Pathfile, composers);
      return newComposer.toJSON();
    } catch (error) {
      console.error("Error al crear el compositor:", error.message);
      throw new Error(error.message);
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
      throw new Error(`Error: no se pudo leer los datos`);
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
      throw new Error(`Error: no se pudo leer los datos`);
    }
  }

  static async getByID(id) {
    try {
      const data = await FilesUtils.readFile(this.#Pathfile);
      const composerFound = data.find((composer) => {
        return composer.id === id;
      });
      if (!composerFound) throw new Error("Compositor no encontrado");
      return composerFound;
    } catch (error) {
      console.log("No se pudo encontrar el compositor");
      throw new Error("Error: no se encontró al compositor");
    }
  }

  static async getActiveByID(id) {
    try {
      const data = await FilesUtils.readFile(this.#Pathfile);
      const composerFound = data.find((composer) => {
        return composer.id === id;
      });

      if (!composerFound || !composerFound.isActive) throw new Error("Compositor no encontrado");

      const composerInstance = Composer.create(composerFound);
      console.log(composerInstance.toFullJSON());

      return composerInstance.toJSON();
    } catch (error) {
      console.log("No se pudo encontrar el compositor");
      throw new Error("Error: no se encontró al compositor");
    }
  }

  static async update(id, newComposer) {
    try {
      const previewComposer = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = previewComposer.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
        throw new Error("No se encontró el compositor para actualizar");

      const composerUpdated = Composer.create({ ...newComposer, id });

      previewComposer[indexComposer] = composerUpdated.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, previewComposer);
      return composerUpdated.toJSON();
    } catch (error) {
      console.log("Error al actualizar el compositor:", error.message);
      throw new Error(error.message);
    }
  }

  static async updateActive(id, newComposer) {
    try {
      const previewComposer = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = previewComposer.findIndex(
        (composer) => composer.id === id && composer.isActive,
      );

      if (indexComposer === -1)
        throw new Error("No se encontró el compositor para actualizar");

      const composerUpdated = Composer.create({ ...newComposer, id });

      previewComposer[indexComposer] = composerUpdated.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, previewComposer);
      return composerUpdated.toJSON();
    } catch (error) {
      console.log("Error al actualizar el compositor:", error.message);
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = composers.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
        throw new Error("No pudimos encontrar al compositor");

      composers.splice(indexComposer, 1);

      await FilesUtils.writeFile(this.#Pathfile, composers);
    } catch (error) {
      console.log("Error al eliminar el compositor:", error.message);
      throw new Error(error.message);
    }
  }

  static async softDelete(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile);
      const indexComposer = composers.findIndex(
        (composer) => composer.id === id,
      );

      if (indexComposer === -1)
        throw new Error("No pudimos encontrar al compositor");

      const composerToDelete = composers[indexComposer];

      const composerInstance = Composer.create(composerToDelete);

      composerInstance.desactivate();

      composers[indexComposer] = composerInstance.toFullJSON();

      await FilesUtils.writeFile(this.#Pathfile, composers);
    } catch (error) {
      console.log("Error al eliminar el compositor:", error.message);
      throw new Error(error.message);
    }
  }

  static async restore(id) {
    try {
      const composers = await FilesUtils.readFile(this.#Pathfile)
      const indexComposer = composers.findIndex(composer => composer.id === id)

      if(indexComposer === -1) throw new Error('No pudimos encontrar al compositor');

      const composerToRestore = composers[indexComposer]
      const composerInstance = Composer.create(composerToRestore)

      composerInstance.activate()

      composers[indexComposer] = composerInstance.toFullJSON()

      await FilesUtils.writeFile(this.#Pathfile, composers)
      return composerInstance.toJSON()
    } catch (error) {
      console.log("Error al restaurar el compositor:", error.message);
      throw new Error(error.message);
    }
  }
}

