export default async (_, { input }, { models }) => {
  return await models.CustomerModel.find(input)
}
