import mongoose from "mongoose"
import { Schema } from "mongoose"

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: false,
  },
  email: {
    type: String,
    required: true,
    trim: false,
  },
  purchases: [
    {
      _id: {
        type: Schema.ObjectId,
        ref: "Purchase",
        index: true,
      },
    },
  ],
})

export const CustomerModel = mongoose.model("Customer", customerSchema)
