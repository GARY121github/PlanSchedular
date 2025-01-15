class ApiResponse<T = any> {
    public statusCode: number;
    public data: T;
    public message: string;
    public success: boolean;
  
    constructor(statusCode: number, data: T, message: string = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  
    static success<T = any>(data: T, message: string = "Success", statusCode: number = 200) {
      return new ApiResponse(statusCode, data, message);
    }
  
    static created<T = any>(data: T, message: string = "Created") {
      return new ApiResponse(201, data, message);
    }
  }
  
  export default ApiResponse;
  