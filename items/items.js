import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const itemSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: Number,
    uploader: String
}, { timestamps: false })
const Item = mongoose.model('Item', itemSchema);

app.get("/items", async (req, res) => {
    try {
        const item = await Item.find()

        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
})


app.post("/items", async (req, res) => {
    const item = new Item(req.body);
    try {
        console.log(item)
        await item.save();
        res.status(201).json(item);
    } catch (error) {
    }
})

app.get('/getIMG', function (req, res) {
    res.sendFile('E:/Amogh/PES/Semester-VI/CC/Project/TradeTrove/delivery_app.png');
})

app.get('/contact', function (req, res) {
    res.sendFile('D:/Amogh/WT_Project/frontend/contact.html');
})


const mongodb = "mongodb+srv://username:password@cluster0.cwqcvrn.mongodb.net/TradeTrove?retryWrites=true&w=majority";
const PORT = 5002;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, console.log(`Server running on ${PORT}`))).catch(err => console.log(err));