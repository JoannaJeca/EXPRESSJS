import express, { Application } from 'express'
import Main from './Main'

const port = 2222

const app:Application = express()
app.use(express.json())

const server = app.listen(()=>{
    console.log("Port running on ", port);
    
})
process.on("uncaughtException", (error:Error)=>{
    console.log("uncaughtException", error);
    process.exit(1)
    
})

process.on("rejectionHandled", (reason:any)=>{
    console.log("rejectionHandled", reason);

    server.close(()=>{
        process.exit(1)
    })
    
})