import { Application, Request, Response } from 'express'
import { statusCode } from '../Utils/StatusCode'
import { db, client } from '../Utils/dbConfig';
import { userModel } from '../Utils/userModel';
import {ObjectId} from "mongodb"
import path from 'path';
import fs from 'fs';
import lodash from 'lodash'



let database:Array<{}> = [
    {
        
            _id: "65383b6fc060dbc09f0d660b",
            name: "Joan",
            score: 45,
            subjects: [
                "ReactJS",
                "ExpressJS"
            ]
        },
        {
            _id: "65383bdfc060dbc09f0d660c",
            name: "Jessica",
            score: 65,
            subjects: [
                "NodeJS",
                "MOngoDB"
            ]
        },
        {
            _id: "65383c62c060dbc09f0d660d",
            name: "Jemima",
            score: 35,
            subjects: [
                "JS",
                "TS"
            ]
        }
]


const mainApp = (app:Application) =>{
   app.post("/creatingData", async(req:Request, res:Response)=>{
    try {
        await client.connect()
        const {name, score, subjects} = req.body

        const data = new userModel(name, score, subjects)

        await db.insertOne(data)

        database.push(data)

        return res.status(statusCode.Created).json({
            message:"Sucesfully created",
            data
        })
    } catch (error:any) {
        res.status(statusCode.BAD_REQUEST).json({
            message:"Error in creating one",
            data:error.message
        })
    }
   })

    
    // app.get("/gettingData", async(req:Request, res:Response)=>{
    //     try {
    //         await client.connect()

    //         const data = db.find({}, {}).toArray()

    //         return res.status(statusCode.Ok).json({
    //             messae:"Succcess(~_~",
    //             data:database
    //         })
            
    //     } catch (error:any) {
    //         res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error in getting",
    //             data:error.message
    //         })
    //     }
    // })

    // app.get("/getOne/:userID", async(req:Request, res:Response)=>{
    //     try {
    //         await client.connect()
    //         const {userID} = req.params

    //         console.log(new ObjectId(userID))

    //         const data = db.findOne({_id: new ObjectId(userID)})


    //         res.status(statusCode.Ok).json({
    //             message:"Error in getting",
    //             data
    //             })

    //     } catch (error:any) {
    //         res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error in getting",
    //             data:error.message   
    //     })
    // }
    // })

    // app.get("/reading", async(req:Request, res:Response)=>{
    //     try {
            
    //         await client.connect()

    //         const showPath =  path.join(__dirname, "data", "./database.json")

    //         fs.readFile(showPath, (err, data)=>{
    //             if(err){
    //                 return err;
                    
    //             }else{
    //                 const readingData = JSON.parse(Buffer.from(data).toString());

    //                 res.status(statusCode.Ok).json({
    //                     message:"Reading file from our  fake storage",
    //                     data:readingData 
    //                 })
    //             }
    //         })

    //     } catch (error:any) {
    //         res.status(statusCode.BAD_REQUEST).json({
    //             message:"Error in creating one",
    //             data:error.message
    //         })
    //     }
    // })

    app.post("/data", async(req:Request, res:Response)=>{
        try {
            const {data : userData} = req.body

            const showPath = path.join(__dirname, "../data", "database.json")

            fs.readFile(showPath, (err, data)=>{
                if(err){
                    return err
                }else{
                    const readingData = JSON.parse(Buffer.from(data).toString())

                    if(lodash.some(readingData, userData)){
                        console.log("Already in database");
                        res.status(statusCode.Created).json({
                            message:"Good",
                            data:readingData
                        })
                        
                    }else{
                        console.log("Read and store from API");
                        readingData.push(userData)

                        fs.writeFile(showPath, JSON.stringify(readingData), "utf-8", ()=>{
                            console.log('Done');                            
                        });
                        res.status(statusCode.Ok).json({
                            message:"Read", 
                            data:readingData
                        })
                         
                    }
                }
            })


        } catch (error:any) {
            res.status(statusCode.BAD_REQUEST).json({
                message:"Error in creating one",
                data:error.message
            })
        }
    })
};

export default mainApp; 