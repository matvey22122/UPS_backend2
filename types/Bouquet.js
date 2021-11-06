import { gql } from "apollo-server-express"

export const BouquetType = gql`
  type Bouquet {
    id: ID!
    name: String!
    price: String!
    image: String
    seller: ID
  }

  input GetBouquetsInput {
    _id: ID
    name: String
    price: String
    image: String
    seller: ID
  }

  extend type Query {
    bouquets(input: GetBouquetsInput): [Bouquet]
  }

  input CreateBouquetInput {
    name: String!
    price: Float!
  }

  input UpdateBouquetInput {
    name: String
    price: Float
  }

  extend type Mutation {
    createBouquet(
      idSeller: ID!
      file: Upload
      input: CreateBouquetInput
    ): Bouquet!
    updateBouquet(
      idBouquet: ID!
      file: Upload
      input: UpdateBouquetInput
    ): Bouquet!
    deleteBouquet(idBouquet: ID!): Boolean!
  }
`
