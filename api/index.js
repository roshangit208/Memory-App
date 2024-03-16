const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const path = require("path");
const app = express();

mongoose.connect(process.env.DATABASE_CLUSTER, {useNewUrlParser:true});
// app.use(bodyParser.urlencoded({extended:true}));

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
const memorySchema = {
    title : String ,
    desc : String ,
    img : String ,
}

const Memory = mongoose.model("memory",memorySchema);

// view all memory 
app.get("/memory",async  (req,res)=>
{
    const foundMemory = await Memory.find({});
     res.status(200).json(foundMemory);
     

});

// post a memory 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({storage: storage})
app.post("/upload",upload.single("file") , (req,res)=>
{
    try{
        res.status(200).json("uploaded successfully");
    }
    catch(error)
    {
        console.error(error);
    }
})

app.post("/", async(req,res)=>
{
    const reqMemory = {
        title : req.body.title,
        desc : req.body.desc,
        img : req.body.img,
    }
    const memory = new Memory(req.body);
    try {
  const savedMemory = await memory.save();
   res.status(200).json(savedMemory);
    }
    catch(err)
    {
       res.status(500).json(err);
    }
});


// delete a memory 
app.post("/delete",  async (req,res)=>
{
    try{
         await Memory.findByIdAndDelete({ _id : req.body.id });
res.status(200).json("deleted Successfully");
    }
    catch(err){
        res.status(500).json(err);
      }

});



app.listen(8085,()=>
{
    console.log("Server is running on port 8085");
});