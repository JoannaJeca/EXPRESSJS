import { MongoClient } from "mongodb";

const URL:string ="mongodb://localhost:27017"

export const client = new MongoClient(URL)

const mainConnection =async()=>{
    await client.connect()

    return 'Database sucesfully connected 🚀🚀. So lets fly! ✈'
};

mainConnection()
.then((res)=>res)
.catch(()=>console.error)
.finally(()=>client.close());

export const db = client.db("set08B").collection("students")