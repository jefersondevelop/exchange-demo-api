export class DuplicatedFieldError extends Error {
  constructor(field: string) {
    super(`Already exist an user with ${field}`);
  }
}
