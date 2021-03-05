const app = require("express")();
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv =require("dotenv");

app.use(cors());
app.use(bodyParser.json());

// for Security Purpose
dotenv.config();

const PORT = process.env.PORT || 1337;

app.get("/a.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "a.svg"));
});


const razorpay = new Razorpay({
  key_id: "rzp_test_61DgSea4l7DbDm",
  key_secret: "jpfrg4yTvhFTHByR6CplZBhs",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      receipt: response.receipt,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Listening on 1337");
});
