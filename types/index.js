import { gql } from "apollo-server-express"
import { CustomerType } from "./Customer"
import { PurchaseType } from "./Purchase"
import { SellerType } from "./Seller"
import { BouquetType } from "./Bouquet"

const defaultQuery = gql`
  type Query {
    _empty: String
  }
`

const defaultMutation = gql`
  type Mutation {
    _empty: String
  }
`

export const typeDefs = [
  defaultQuery,
  defaultMutation,
  SellerType,
  CustomerType,
  PurchaseType,
  BouquetType,
]
