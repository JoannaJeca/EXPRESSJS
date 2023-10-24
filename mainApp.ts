import express, {Request, Response, Application } from "express";
import { statusCode } from "./Utils/StatusCode";
import moment from "moment";
import {v4 as uuid} from "uuid"
import { stat } from "fs/promises";

interface iData{
    id:string
    time:string,
    name:string
    course:string
}

let database:Array<iData> =[
    {    id:'',
        name:"joan",
        course:"React",
        time:""
    }
]

const mainApp = (app:Application) =>{
    // app.get("/", (req:Request, res:Response):Response=>{
    //     // res.send("working well")
    //     try{
    //         return res.status(statusCode.Ok).json({
    //             message: "Welcome to my api"
    //         })
    //     }catch (error) {
    //         return res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error"
    //         })
    //     }
    // })

    // app.get("/api/v1/read-data", (req:Request, res:Response)=>{
    //     try{
    //         return res.status(statusCode.Ok).json({
    //             message:"Reading from database",
    //             data:database,
    //         })
    //     }catch (error){
    //         return res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error reading from database"
    //         })
    //     }
    // })


    app.post("/api/v1/create-data", (req:Request, res:Response):Response=>{
        try{
            const {name, course} = req.body

            const data:iData ={
                name,
                id:uuid(),
                time:moment(new Date().getTime()).format("LTS"),
                course
            }

            database.push(data)

            return res.status(statusCode.Ok).json({
                message:"Craeting  data to database",
                data:database,
            })
        }catch (error){
            return res.status(statusCode.BAD_REQUEST).json({
                message:"Error creating to database"
            })
        }
    })
   
    // app.get("/api/v1/get-one-data/:userID", (req:Request, res:Response):Response=>{
    //     try{
    //         const {name, course} = req.body
    //         const {userID} = req.params;

    //         const user:iData | any = database.find((el:iData)=>{
    //             return el.id === userID
    //         });
    //         return res.status(statusCode.Ok).json({
    //             message:"getting from database",
    //             data:user
    //         })

    //     }catch (error){
    //         return res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error in getting one user"
    //         })
    //     }
    // })

    app.patch("/api/v1/update-one-data/:userID", (req:Request, res:Response):Response=>{
        try{
            const {course} = req.body;
            const {userID} = req.params;

            const user: iData | any = database.find((el:iData) =>{
                return el.id === userID
            });

            user.course = course;

            return res.status(statusCode.Ok).json({
                message:"Updating from database",
                data:user,
            });
            
        }catch (error){
            return res.status(statusCode.BAD_REQUEST).json({
                message:"error"
            })
        }
    })

    app.delete("/api/v1/delete-one-user/:userID", (req:Request, res:Response):Response=>{
        try{
            const {userID} = req.params;

            const user:iData | any = database.find((el:iData)=>{
                return el.id === userID
            });

            const newDataBase = database.filter((el:iData)=>{
                return el.id !== userID
            });

            database= newDataBase

            return res.status(statusCode.Ok).json({
                
            })
        }catch(error){
            return res.status(statusCode.BAD_REQUEST).json({
                message:"Error from client side"
            })
        }
    })
  
};

export default mainApp

