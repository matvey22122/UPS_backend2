import { ApolloError } from "apollo-server-express"
import { uploadImage } from "./services/upload"
import { removeImage } from "./services/remove"

const createBouquet = async (_, { idSeller, file, input }, { models }) => {
  try {
    if (file) {
      const url = await uploadImage(file)
      if (url) {
        input.image = url
      }
    }

    const createdBouquet = await models.BouquetModel.create({
      ...input,
      seller: idSeller,
    })

    const sellerToUpdate = await models.SellerModel.findOne({
      _id: idSeller,
    })

    sellerToUpdate.bouquets.push({ _id: createdBouquet._id })
    await sellerToUpdate.save()

    return createdBouquet
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updateBouquet = async (_, { idBouquet, file, input }, { models }) => {
  try {
    const bouquetToUpdate = await models.BouquetModel.findOne({
      _id: idBouquet,
    })

    if (file) {
      if (bouquetToUpdate && bouquetToUpdate.image) {
        await removeImage(bouquetToUpdate.image)
      }
      const url = await uploadImage(file)

      if (url) {
        bouquetToUpdate.image = url
      }
    }

    if (input) {
      Object.keys(input).forEach((val) => {
        bouquetToUpdate[val] = input[val]
      })
    }

    return await bouquetToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deleteBouquet = async (_, { idBouquet }, { models }) => {
  try {
    let bouquetToDelete = await models.BouquetModel.findOne({ _id: idBouquet })

    if (bouquetToDelete && bouquetToDelete.image) {
      await removeImage(bouquetToDelete.image)
    }

    bouquetToDelete = await models.BouquetModel.deleteOne({ _id: idBouquet })
    return !!bouquetToDelete.deletedCount
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const bouquetMutations = {
  createBouquet,
  updateBouquet,
  deleteBouquet,
}
