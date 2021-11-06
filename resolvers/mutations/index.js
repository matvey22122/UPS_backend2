import { purchaseMutations } from "./purchase"
import { bouquetMutations } from "./bouquet"
import { customerMutations } from "./customer"
import { sellerMutations } from "./seller"

export const mutations = {
  ...purchaseMutations,
  ...bouquetMutations,
  ...customerMutations,
  ...sellerMutations,
}
