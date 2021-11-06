import { gql } from "apollo-server-express"

export const SellerType = gql`
  type Seller {
    id: ID!
    name_of_shop: String!
    image: String
    foundation_date: String!
    cnt_sold: Int!
    bouquets: [Bouquet]!
  }

  input GetSellersInput {
    _id: ID
    name_of_shop: String
    image: String
    foundation_date: String
    cnt_sold: Int
  }

  extend type Query {
    sellers(input: GetSellersInput): [Seller]
  }

  input CreateSellerInput {
    name_of_shop: String!
    foundation_date: String!
  }

  input UpdateSellerInput {
    name_of_shop: String
    foundation_date: String
  }

  extend type Mutation {
    createSeller(file: Upload, input: CreateSellerInput): Seller!
    updateSeller(idSeller: ID!, file: Upload, input: UpdateSellerInput): Seller!
    deleteSeller(idSeller: ID!): Boolean!
  }
`
