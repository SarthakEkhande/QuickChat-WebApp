
const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
const cors =require("cors")
 const dbconfig=require("./config/dbConfig.js")

const app = require("./app");
app.use(cors({
  origin: 'http://localhost:5173', // or '*' for all
  credentials: true
}));
const PORT=process.env.PORT_NUMBER || 3000
app.listen(PORT,()=>{
    console.log("Listening to requests on PORT :" + PORT);
    
})