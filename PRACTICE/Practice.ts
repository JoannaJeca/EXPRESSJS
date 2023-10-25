import { log } from 'console'
import express, { Application } from 'express'
import Main from './Main'

const app:Application = express()
app.use(express.json())

const port = 1090 

Main(app)

const server = app.listen(port, ()=>{
    console.log("Port up and running on", port);
    
})

process.on("uncaughtException", (error:Error)=>{
    console.log("uncaughtException: ", error);
    process.exit(1)
    
})

process.on("rejectionHandled", (reason:any)=>{
    console.log("rejectionHandled : ", reason);
    server.close(()=>{
        process.exit(1)
    })
    
})