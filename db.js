import mongoose from "mongoose"
import config from "config"

const DATABASE_URL = config.get("mongoUri")
//   "mongoUri": "mongodb+srv://dbUser:wRCjV2pfm3e4RxW3@cluster0.mvg33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

export const connectDb = () => {
  return mongoose.connect(
    DATABASE_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log("Connection to Database failed.")
      } else {
        console.log("Database connection successful.")
      }
    }
  )
}

const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))
