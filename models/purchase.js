import mongoose from "mongoose"
import { Schema } from "mongoose"

const purchaseSchema = new Schema({
  bouquet: {
    type: Schema.ObjectId,
    ref: "Bouquet",
    required: true,
  },
  customer: {
    type: Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
})

export const PurchaseModel = mongoose.model("Purchase", purchaseSchema)
