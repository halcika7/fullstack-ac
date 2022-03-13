import argon from 'argon2';

export class Hash {
  private static Instance: Hash;

  private constructor() {}

  static get instance(): Hash {
    if (!this.Instance) {
      this.Instance = new Hash();
    }

    return this.Instance;
  }

  hash(value: string) {
    return argon.hash(value);
  }

  verify(hash: string, plain: string) {
    return argon.verify(hash, plain);
  }
}
