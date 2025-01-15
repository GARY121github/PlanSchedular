class ApiError extends Error {
    public statusCode: number;
    public data: any;
    public success: boolean;
    public errors: Array<any>;
  
    constructor(
      statusCode: number,
      message: string = "Something went wrong",
      errors: Array<any> = [],
      stack: string = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    static badRequest(message: string = "Bad Request", errors: Array<any> = []) {
      return new ApiError(400, message, errors);
    }
  
    static unauthorized(message: string = "Unauthorized") {
      return new ApiError(401, message);
    }
  
    static forbidden(message: string = "Forbidden") {
      return new ApiError(403, message);
    }
  
    static notFound(message: string = "Not Found") {
      return new ApiError(404, message);
    }
  
    static internal(message: string = "Internal Server Error") {
      return new ApiError(500, message);
    }
  }
  
  export default ApiError;
  