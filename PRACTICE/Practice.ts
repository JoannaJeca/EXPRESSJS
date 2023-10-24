import express, { Application, Request, Response  } from 'express'
import { statusCode } from '../Utils/StatusCode';
import {v4 as uuid} from 'uuid'
import moment from 'moment';
import { isDataView } from 'util/types';

interface iData{
    id:string,
    name:string,
    course:string,
    time:string
}

let database:iData[] =[
    {
        id: "10e044ed-306d-4190-8f63-2aa41269fdcd",
        name: "Ewuzie",
        course: "ExpressJS",
        time: "12:22:13 AM"
    },{
        id: "2c0a13fc-33b8-44fc-8de3-20bbd5eff921",
        name: "Joan",
        course: "ExpressJS",
        time: "12:22:54 AM"
    },{
        id: "78e7d786-9a97-4239-9004-c06484552a52",
        name: "Adanna",
        course: "NodeJS",
        time: "12:23:35 AM"
    },
    
]

const MyPractice = (app:Application)=>{
    app.get("/api/read-data", (req:Request, res:Response)=>{
        
        try{
            res.status(statusCode.Ok).json({
                message:"Successfully good",
                status:200,
                data:database
            })
        }catch(error){
            res.status(statusCode.BAD_REQUEST).json({
                message:"Error reading file"
            })
        }
    })


    app.post("/api/create-data", (req:Request, res:Response)=>{
        try{
            const {name, course} = req.body

            const data:iData={
                id:uuid(),
                name,
                course,
                time:moment(new Date().getTime()).format("LTS")
            }
            database.push(data)

            return res.status(statusCode.Created).json({
                message:"Data created!!",
                data:database
            })


        }catch(error){
            res.status(statusCode.BAD_REQUEST).json({
                message:"Error detected when creating data"
            })
        }
    })


    // app.get("/api/get-one:userID", (req:Request, res:Response)=>{
    //     try{
    //         const {userID} = req.params

    //         const user:iData | any= database.find((el:iData)=>{
    //             return el.id === userID
    //         })
            
    //         return res.status(statusCode.Ok).json({
    //             message:"Successfully found said user",
    //             data:user
    //         })


    //     }catch(error){
    //         res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error in trying to get only one user"
    //         })
    //     }
    // })

    app.patch("/api/update-one-user:userID", (req:Request, res:Response)=>{
        try{
            const {course} = req.body
            const {userID} = req.params

            const user:iData | any=database.find((el:iData)=>{
                return el.id === userID 
            
            })
            user.course = course

            return res.status(statusCode.Ok).json({
                message:"Success in updating the course of user",
                data:user
            })

        }catch(error){
            res.status(statusCode.BAD_REQUEST).json({
                message:"Error in updating course!"
            })
        }
    })

    app.delete("/api/delete-user:userID", (req:Request, res:Response)=>{
        try{
            const {userID} =req.params

            const user:iData | any = database.find((el:iData)=>{
                return el.id === userID
            })

            let newDB:any= database.find((el:iData)=>{
                return el.id !== userID
            }) 
            newDB = database

            return res.status(statusCode.Ok).json({
                message:"Success delete",
                data:newDB
            })

        }catch(error){
            res.status(statusCode.BAD_REQUEST).json({
                message:"User not deleted *_*! Check error from client side"
            })
        }
    })

};
export default MyPractice