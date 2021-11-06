import { ApolloError } from "apollo-server-express"

const createCustomer = async (_, { input }, { models }) => {
  try {
    return await models.CustomerModel.create(input)
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updateCustomer = async (_, { idCustomer, input }, { models }) => {
  try {
    const customerToUpdate = await models.CustomerModel.findOne({
      _id: idCustomer,
    })

    if (input) {
      Object.keys(input).forEach((val) => {
        customerToUpdate[val] = input[val]
      })
    }

    return await customerToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deleteCustomer = async (_, { idCustomer }, { models }) => {
  try {
    const customerToDelete = await models.CustomerModel.deleteOne({
      _id: idCustomer,
    })
    return !!customerToDelete.deletedCount
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const customerMutations = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
