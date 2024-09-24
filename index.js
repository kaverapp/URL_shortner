const express=require("express");
const path =require("path");
const env=require("dotenv").config();
const database=require("./models/main.database");
const shortid=require("shortid");
const bodyParser=require("body-parser");
const app=express()
const validUrl=require("valid-url")

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

const PORT=process.env.PORT;

app.get("/",(req,res)=>{

    res.render("main")
    console.log(shortid.generate());
    
});

app.post("/sh",async(req,res)=>{
 const {longurl}=req.body;
 // Validate the URL (you can use a library like valid-url here)
 if (!validUrl.isUri(longurl)) {
    return res.status(400).send("Invalid URL");
}
 const shortCode = shortid.generate();
 console.log("Short code generated:", shortCode);
 
 const newUrl = new database({ longurl, shortCode });
 await newUrl.save();

 console.log("Saved URL:", newUrl); // Log the saved URL

    res.json({ shortUrl: `http://localhost:${PORT}/${shortCode}` });
 
   
});

app.get("/:code", async (req, res) => {
    const url = await database.findOne({ shortCode: req.params.code });
    if (url) {
        console.log("Redirecting to:", url.longurl); // Log the URL being redirected to
        return res.redirect(url.longurl);
    }
    res.status(404).send("URL not found");
});

app.listen(PORT,()=>{
    console.log("app is running on the server",PORT)
});
