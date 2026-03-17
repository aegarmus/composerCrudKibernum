/*

Composer
    id
    name
    nationality
    birthdate
    dateDeath
*/

import { Validate } from "../utils/validator.util.js";

export class Composer {
  #id;
  #name;
  #nationality;
  #birthdate;
  #dateDeath;
  #isActive;

  constructor(name, nationality, birthdate, dateDeath, id, isActive) {
    this.#id = id || crypto.randomUUID();
    this.#name = Validate.name(name, 'nombre');
    this.#nationality = Validate.name(nationality, 'Nacionalidad');
    this.#birthdate = Validate.date(birthdate, 'Fecha de nacimiento');
    this.#dateDeath = Validate.date(dateDeath, 'Fecha de defunción');
    this.#isActive = isActive ?? true;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get nationality() {
    return this.#nationality;
  }

  get birthdate() {
    return this.#birthdate;
  }

  get dateDeath() {
    return this.#dateDeath;
  }

  get isActive() {
    return this.#isActive;
  }

  setName(name) {
    this.#name = Validate.name(name, 'nombre');
  }
  setNationality(nationality) {
    this.#nationality = Validate.name(nationality, ' Nacionalidad');
  }
  setBirthdate(birthdate) {
    this.#birthdate = Validate.date(birthdate, 'fecha nacimiento');
  }
  setDateDeath(dateDeath) {
    this.#dateDeath = Validate.date(dateDeath, 'fecha de defunción');
  }

  desactivate() {
    this.#isActive = false;
  }

  activate() {
    this.#isActive = true;
  }

  toFullJSON() {
    return {
      id: this.#id,
      name: this.#name,
      nationality: this.#nationality,
      birthdate: this.#birthdate,
      dateDeath: this.#dateDeath,
      isActive: this.#isActive,
    };
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      nationality: this.#nationality,
      birthdate: this.#birthdate,
      dateDeath: this.#dateDeath
    };
  }

  static create(data) {
    try {
      const { name, nationality, birthdate, dateDeath, id, isActive } = data;
      return new Composer(
        name,
        nationality,
        birthdate,
        dateDeath,
        id,
        isActive
      );
      
    } catch (error) {
      console.error("Error creating composer:", error);
      throw new Error("Failed to create composer");
    }
  }
}

