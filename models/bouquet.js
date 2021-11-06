import mongoose from "mongoose"
import { Schema } from "mongoose"
import { SellerModel } from "./seller"

const bouquetSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Just bouquet",
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  seller: {
    type: Schema.ObjectId,
    ref: "Seller",
    default: null,
  },
})

bouquetSchema.pre("deleteOne", async function (next) {
  const idBouquet = this.getQuery()["_id"]
  const idSeller = this.getQuery()["seller"]
  const sellerToUpdate = await SellerModel.findOne({ _id: idSeller })
  console.log(sellerToUpdate)
  if (!sellerToUpdate || !sellerToUpdate.bouquets) {
    next()
    return
  }

  for (let i = 0; i < sellerToUpdate.bouquets.length(); i++) {
    if (sellerToUpdate.bouquets[i]._id == idBouquet) {
      sellerToUpdate.bouquets.splice(i, 1)
      break
    }
  }

  await sellerToUpdate.save()

  next()
})

export const BouquetModel = mongoose.model("Bouquet", bouquetSchema)
