import express, { Application } from 'express'
import MyPractice from './Practice'

const app:Application = express()
app.use(express.json())

const port = 3000

MyPractice(app)

const server = app.listen(port, ()=>{
    console.log("Port running on", port)
})
 
process.on("uncaughtException", (error: Error)=>{
    console.log("uncaughtException: ", error );
    process.exit(1)
})

process.on("rejectionHandled", (reason:any)=>{
    console.log("rejectionHandled: ", reason)

    server.close(()=>{
        process.exit(1)
    })
})
