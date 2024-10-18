class ResponseHandler { 
    constructor(public statusCode : number , public message : string, public data : any) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
};

export { ResponseHandler };
