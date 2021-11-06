import mongoose from "mongoose"
import { Schema } from "mongoose"
import { BouquetModel } from "./bouquet"

const sellerSchema = new Schema({
  name_of_shop: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  foundation_date: {
    type: String,
    required: true,
    default: "",
  },
  cnt_sold: {
    type: Number,
    required: true,
    default: 0,
  },
  bouquets: [
    {
      type: Schema.ObjectId,
      ref: "Bouquet",
      index: true,
    },
  ],
})

sellerSchema.pre("deleteOne", async function (next) {
  const id = this.getQuery()["_id"]
  await BouquetModel.deleteMany({ seller: id })
  next()
})

export const SellerModel = mongoose.model("Seller", sellerSchema)
