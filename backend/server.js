
//import express middleware
import express from 'express'
//import cors middleware
import cors from 'cors'
//import movie route
import movies from './api/movies.route.js'
//create server
const app=express();
//attach cors and express middleware
    //use function registers a middleware
app.use(cors);
    //express.json is the parsing middleware 
    //to enable the server to read abd accept
    //json in a request's body

    //it enable to retrieve data from request data
    //via body attribute
        //middleware :function that execute after
        //the incoming request and before the output
app.use(express.json())

//intial route
//general convnetion for api
// /api/>version_number>
app.use("/api/v1/movies",movies)
    //if someone tries to go to route 
    //that doesnt exist,wiild card 
    //route * returns 404
app.use('*',(req,res)=>{
    res.status(404).json({error:"not found"})
})
//export app as a module so other file can import it
    //file that access database
    //file that starts the server
export default app;

