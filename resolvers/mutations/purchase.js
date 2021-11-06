import { ApolloError } from "apollo-server-express"

const purchaseBouquet = async (_, { input }, { models }) => {
  try {
    return await models.PurchaseModel.create({
      ...input,
      revenue: input.price * 0.3,
    })
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updatePurchase = async (_, { idPurchase, input }, { models }) => {
  try {
    const purchaseToUpdate = await models.PurchaseModel.findOne({
      _id: idPurchase,
    })

    if (input) {
      Object.keys(input).forEach((val) => {
        purchaseToUpdate[val] = input[val]
      })
      purchaseToUpdate.revenue = purchaseToUpdate.price * 0.3
    }

    return await purchaseToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deletePurchase = async (_, { idPurchase }, { models }) => {
  try {
    const purchaseToDelete = await models.PurchaseModel.deleteOne({
      _id: idPurchase,
    })
    return !!purchaseToDelete.deletedCount
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const purchaseMutations = {
  purchaseBouquet,
  updatePurchase,
  deletePurchase,
}
