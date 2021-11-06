export default async (_, { input }, { models }) => {
  return await models.BouquetModel.find(input)
}
