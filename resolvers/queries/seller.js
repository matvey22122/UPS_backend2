export default async (_, { input }, { models }) => {
  return await models.SellerModel.find(input).populate({
    path: "bouquets",
  })
}
