import { gql } from "apollo-server-express"

export const PurchaseType = gql`
  scalar Date

  type Purchase {
    id: ID!
    bouquet: ID!
    customer: ID!
    price: Float!
    revenue: Float!
  }

  input getPurchases {
    _id: ID
    bouquet: ID
    customer: ID
    price: Float
    revenue: Float
  }

  extend type Query {
    purchases(input: getPurchases): [Purchase]
  }

  input CreatePurchaseInput {
    bouquet: ID!
    customer: ID!
  }

  input UpdatePurchaseInput {
    bouquet: ID
    customer: ID
  }

  extend type Mutation {
    purchaseBouquet(input: CreatePurchaseInput): Purchase!
    updatePurchase(idPurchase: ID!, input: UpdatePurchaseInput): Purchase!
    deletePurchase(idPurchase: ID!): Boolean!
  }
`
