import { Application, Request, Response } from 'express'
import { statusCode } from '../Utils/StatusCode';


const Main =(app:Application)=>{
    app.get("/default",(req:Request, res:Response)=>{
        try {
            res.status(statusCode.Ok).json({
                messsage:"Great job on achievingt he GET method"
            })
        } catch (error:any) {
           return res.status(statusCode.BAD_REQUEST).json({
                message:"Warning! Warning! Warning!"
            })
        }
    })
};

export default Main