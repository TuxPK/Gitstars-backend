class ServiceError extends Error {
  constructor({ message, status, service } = {}) {
    super();

    this.name = 'ServiceError';
    this.message = message;
    this.status = status;
    this.service = service;
  }
}

export default ServiceError;
