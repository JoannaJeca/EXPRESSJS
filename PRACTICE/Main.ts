import  { Application, Request, Response } from 'express'
import { statusCode } from '../Utils/StatusCode'
import {v4 as uuid} from 'uuid'

interface iData{
    id:string,
    name?:string,
    subject?:string,
    age?:number
}

let database:Array<iData> =[
    {
        id: "411e7e72-9e57-4da3-ba3f-3697c3799afc"
    },
    {
        id: "77130b89-7136-41d8-9eaf-aec90125174e",
        name: "Joan",
        subject: "React",
        age: 16
    },
    {
        id: "e673c0c0-7f56-4da8-8a54-dab1c3876f28",
        name: "Jemima",
        subject: "Express",
        age: 21
    },
    {
        id: "8f792784-2d1f-4689-8d59-83b4df9acf41",
        name: "Jessica",
        subject: "MongoDB",
        age: 17
    }
]

const Main = (app:Application)=>{
    app.get("/testing", (req:Request, res:Response)=>{
        try{       

            return res.status(statusCode.Ok).json({
                message:"Data received",
                status:statusCode.Ok,
                data:database
            })
        }catch(error){

            res.status(404).json({
                message:"Error in receiving all data" ,
                data:error  
            })
        }
    })

    app.post("/creating", (req:Request, res:Response)=>{
        try {
            const {name, age, subject} = req.body

        const messagee:iData = {
            id:uuid(),
            name,
            subject,
            age
        }
        database.push(messagee)

        return res.status(statusCode.Created).json({
            message:"Created succesffully",
            status:statusCode.Ok,
            data:database
        })
        } catch (error) {
            res.status(statusCode.BAD_REQUEST).json({
                message:'Error in creating data'
            })
        }
    })

    app.patch("/update-one/:userID", (req:Request, res:Response)=>{
        try{
            const {name} = req.body
            const {userID} = req.params

            const findUser:any = database.find((el:any)=>{
                return el.id === userID
            })

            findUser.name =  name

            return res.status(statusCode.Ok).json({
                message:"Succesffuly updated ",
                data:findUser
            })

        }catch(error){
            res.status(statusCode.BAD_REQUEST).json({
                message:"Error",
                data:error
            })
        }
    })

    app.delete("delete-resource/:userID", (req:Request, res:Response)=>{
        try{
            const {userID} = req.params

            const FindUserFirst:any = database.find((el:any)=>{
                return el.id === userID
            })

        const DeleteUser = database.filter((el:any)=>{
            return el.id !== userID
        })

        database = DeleteUser

        return res.status(statusCode.Ok).json({
            message:`${FindUserFirst.name} has been removed`,
            data: DeleteUser
        })
        } catch(error){
            return res.status(statusCode.BAD_REQUEST).json({
                message:"Couldnt delete"
                
            })
        }
    })
};

export default Main;