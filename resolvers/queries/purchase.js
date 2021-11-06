export default async (_, { input }, { models }) => {
  return await models.PurchaseModel.find(input)
}
