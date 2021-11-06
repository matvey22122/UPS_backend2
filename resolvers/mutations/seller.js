import { ApolloError } from "apollo-server-express"
import { uploadImage } from "./services/upload"
import { removeImage } from "./services/remove"

const createSeller = async (_, { file, input }, { models }) => {
  try {
    if (file) {
      const url = await uploadImage(file)
      if (url) {
        input.image = url
      }
    }

    return await models.SellerModel.create(input)
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updateSeller = async (_, { idSeller, file, input }, { models }) => {
  try {
    const sellerToUpdate = await models.SellerModel.findOne({ _id: idSeller })

    if (file) {
      if (sellerToUpdate.image) {
        await removeImage(sellerToUpdate.image)
      }
      const url = await uploadImage(file)

      if (url) {
        sellerToUpdate.image = url
      }
    }

    if (input) {
      Object.keys(input).forEach((val) => {
        sellerToUpdate[val] = input[val]
      })
    }

    return await sellerToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deleteSeller = async (_, { idSeller }, { models }) => {
  try {
    let sellerToDelete = await models.SellerModel.findOne({ _id: idSeller })

    if (sellerToDelete && sellerToDelete.image) {
      await removeImage(sellerToDelete.image)
    }

    sellerToDelete = await models.SellerModel.deleteOne({ _id: idSeller })
    return !!sellerToDelete.deletedCount
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const sellerMutations = {
  createSeller,
  updateSeller,
  deleteSeller,
}
