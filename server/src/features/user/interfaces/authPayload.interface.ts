
declare global {
   namespace Express {
      interface Request {
         currentUser?: UserPayload;
         jwt?:string
      }


   }
}

//SOLID INTERFACE SEGRETATION

export interface UserPayload {
   userId:string;
   email: string;
   name: string;
}

