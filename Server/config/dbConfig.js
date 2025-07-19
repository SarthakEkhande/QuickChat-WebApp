const mongoose= require("mongoose")


//connect to mongodb database
mongoose.connect(process.env.CONN_STRING)

//connection state
const db= mongoose.connection

//check db connection
db.on("connected", ()=>{
    console.log("db connection successfull");
    
})

db.on("err", ()=>{
    console.log("db connection failed");
    
})

module.exports= db