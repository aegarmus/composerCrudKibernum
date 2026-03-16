/*

Composer
    id
    name
    nationality
    birthdate
    dateDeath
*/

export class Composer {
  #id;
  #name;
  #nationality;
  #birthdate;
  #dateDeath;
  #isActive;

  constructor(name, nationality, birthdate, dateDeath, id, isActive) {
    this.#id = id || crypto.randomUUID();
    this.#name = name;
    this.#nationality = nationality;
    this.#birthdate = birthdate;
    this.#dateDeath = dateDeath;
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
    this.#name = name;
  }
  setNationality(nationality) {
    this.#nationality = nationality;
  }
  setBirthdate(birthdate) {
    this.#birthdate = birthdate;
  }
  setDateDeath(dateDeath) {
    this.#dateDeath = dateDeath;
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
      const composer = new Composer(
        name,
        nationality,
        birthdate,
        dateDeath,
        id,
        isActive
      );
      return composer;
    } catch (error) {
      console.error("Error creating composer:", error);
      throw new Error("Failed to create composer");
    }
  }
}

