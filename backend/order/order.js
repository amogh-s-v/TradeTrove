import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const orderSchema = mongoose.Schema({
    items: Array,
    buyer: String,
    address: String,
    country: String,
    pincode: String,
    contact: String,
    upi: String,
    price: Number,
}, { timestamps: true })
const Order = mongoose.model('Order', orderSchema);

app.post('/order', async (req, res) => {
    const {order, totalPrice} = req.body;
    const orderdetails = new Order(order);
    try {
        orderdetails.price = totalPrice;
        await orderdetails.save();
        await CartItem.remove({ owner: orderdetails.buyer })
        res.status(201).json(orderdetails);
    } catch (error) {
    }
})

app.post('/orderhistory', async (req, res) => {
    const { user } = req.body;
    let orders;
    try {
        console.log(user.name)
        orders = await Order.find({ buyer: user.name });
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
})

const mongodb = "mongodb://localhost:27017/TradeTrove";
const PORT = process.env.PORT || 9002;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, console.log(`Server running on ${PORT}`))).catch(err => console.log(err));