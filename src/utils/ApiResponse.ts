class ApiResponse<T = any> {
    public statusCode: number;
    public data: T;
    public message: string;
    public success: boolean;
  
    constructor(statusCode: number, message: string = "Success" , data: T = {} as T) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.success = statusCode < 400;
    }
  
    static success<T = any>(data: T, message: string = "Success", statusCode: number = 200) {
      return new ApiResponse(statusCode, message , data);
    }
  
    static created<T = any>(data: T, message: string = "Created") {
      return new ApiResponse(201, message , data);
    }
  }
  
  export default ApiResponse;
  