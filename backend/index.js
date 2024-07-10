//aim: connect to database and start the server

//access app
import app from "./server.js";
//access database
import mongodb from "mongodb";
//access environmental variables
import dotenv from "dotenv";
//reference to moviesDAO
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
//asychronous function to connect to
//MongoDB cluster abd call function to
//access our database
async function main() {
  //load environmental variables
  dotenv.config();

  //create an instance of MongoClient and pass the URI
  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
  //retrieve port from environment variables, otherwise use port 8000
  const port = process.env.PORT || 8000;

  try {
    //Connect to the MongoDB cluster
    await client.connect(); //returns a promise.block further execution
    //after connecting to db 
    //and before server  start
    //injectDB to get initial refernce to 
    //movies collectoin in database
    await MoviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client);
    //start the server
    app.listen(port, () => {
      console.log("server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
//call main and send any error to catch
main().catch(console.error);
