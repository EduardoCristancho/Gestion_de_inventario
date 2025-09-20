export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
export class NotFoundError extends Error {
  constructor(message: string = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
  }
}
export class unhandledError extends Error {
  constructor(message: string = 'Unhandled Error') {
    super(message);
    this.name = 'UnhandledError';
  }
}
export class serverError extends Error {
  constructor(message: string = 'Server Error') {
    super(message);
    this.name = 'ServerError';
  }
}

export function handleError(error: Error, callback: (error: string) => void) {
  if (error instanceof NotFoundError) {
    callback(error.message);
  } else if (error instanceof unhandledError) {
    callback(error.message);
  } else if (error instanceof serverError) {
    callback(error.message);
  } else {
    callback('Ups, algo salio mal, intente de nuevo mas tarde.');
  }
}