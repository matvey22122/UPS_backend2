import { gql } from "apollo-server-express"

export const CustomerType = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
  }

  input getCustomers {
    _id: ID
    name: String
    email: String
  }

  extend type Query {
    customers(input: getCustomers): [Customer]
  }

  input CreateCustomerInput {
    name: String!
    email: String!
  }

  input UpdateCustomerInput {
    name: String
    email: String
  }

  extend type Mutation {
    createCustomer(input: CreateCustomerInput): Customer!
    updateCustomer(idCustomer: ID!, input: UpdateCustomerInput): Customer!
    deleteCustomer(idCustomer: ID!): Boolean!
  }
`
