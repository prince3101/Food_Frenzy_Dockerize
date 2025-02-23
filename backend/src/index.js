const express = require("express");
const cors = require("cors");
const connectionToDB = require("./db/database");
const authRouter = require('./routers/auth.router')
const adminRouter = require('./routers/admin.router')
const userRouter = require('./routers/user.router')
const adminInventory = require('./routers/admin.inventory')

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use('/admin', adminRouter);
app.use('/adminIn', adminInventory);

//handle uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("serever down due to uncaughtExection")
})

//config 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: ".env"
    })
}

//connect db
connectionToDB();

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server runnning on ${process.env.PORT}`);
});

//unhandle promise
process.on("unhandledRejection", (err) => {
  console.log(`unhandle promise ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
