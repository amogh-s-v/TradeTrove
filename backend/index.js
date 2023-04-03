import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

const itemSchema = mongoose.Schema({
    title:String,
    image:String,
    price:Number
},{ timestamps: false })
const Item = mongoose.model('Item',itemSchema);


app.get("/items", async(req,res)=>{
    try {
        const item =await Item.find()
       
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
})


app.post("/items", async(req,res)=>{
    const item = new Item(req.body);
    try {
        console.log(item)
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        
    }
})

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user, success: 1})
            } else {
                res.send({ message: "Password didn't match", success: 0})
            }
        } else {
            res.send({message: "User not registered", success: 0})
        }
    })

}) 
app.get('/getIMG', function(req, res){
    res.sendFile('D:/Amogh/foodImages/delivery_app.png');
})
app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.get('/contact', function(req, res){
    res.sendFile('D:/Amogh/WT_Project/frontend/contact.html');
})


const mongodb = "mongodb://localhost:27017/webtechProject";
const PORT = process.env.PORT || 9002;
mongoose.connect(mongodb,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
    .then(()=>app.listen(PORT,console.log(`Server running on ${PORT}`))).catch(err=>console.log(err));