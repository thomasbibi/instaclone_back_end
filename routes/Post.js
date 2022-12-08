const express = require('express');
const bodyParser = require('body-parser');
const postModel = require('../models/Post');
// const {UploadApiResponse,v2 } = require('cloudinary');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    /*Appending extension with original name*/
    cb(null, file.originalname) 
  }
})

var upload = multer({ storage: storage });

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", async (req,res)=>{
    try{
        console.log("api called");
        const posts = await postModel.find()
        res.status(200).json({
            data : posts
        });
    }catch(err){
        res.status(400).json({error : err.message})
    }
});

router.post("/create",upload.single('postimage'),async(req,res)=>{

    try{
    const {name,location,description} = await req.body
   
    console.log(req.file)
    const path = "http://127.0.0.1:8887/" + req.file.originalname
     const post = await postModel.create({
        "name" : name,
         "location": location,
         "description": description,
         "likes": 0,
         "date": new Date(),
         "imageurl": path
     })
    res.status(200).json(post)
    }
    catch(e){
        res.status(404).json({
            status : "failed",
            message : e.message
        })
    }

})
module.exports = router;