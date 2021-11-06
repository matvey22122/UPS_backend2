import { ApolloError } from "apollo-server-express"

const incSoldCnt = async (idBouquet, val, models) => {
  let bouquet = await models.BouquetModel.findOne({
    _id: idBouquet,
  })
  let sellerToUpdate = await models.SellerModel.findOne({
    _id: bouquet.seller,
  })

  sellerToUpdate.cnt_sold += val
  await sellerToUpdate.save()
}

const purchaseBouquet = async (_, { input }, { models }) => {
  try {
    await incSoldCnt(input.bouquet, 1, models)

    const bouquet = await models.BouquetModel.findOne({ _id: input.bouquet })

    return await models.PurchaseModel.create({
      ...input,
      price: bouquet.price,
      revenue: bouquet.price * 0.3,
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
    if (input && input.bouquet) {
      await incSoldCnt(purchaseToUpdate.bouquet, -1, models)
      await incSoldCnt(input.bouquet, 1, models)
    }

    if (input) {
      Object.keys(input).forEach((val) => {
        purchaseToUpdate[val] = input[val]
      })
    }

    return await purchaseToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deletePurchase = async (_, { idPurchase }, { models }) => {
  try {
    const purchase = await models.PurchaseModel.findOne({
      _id: idPurchase,
    })

    await incSoldCnt(purchase.bouquet, -1, models)

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
