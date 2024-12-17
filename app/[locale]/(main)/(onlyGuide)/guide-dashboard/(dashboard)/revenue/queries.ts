import { gql } from "@apollo/client";

export const SEE_ALL_UNTRANSFERRED_REVENUE = gql`
  query seeAllunTransferredRevenue {
    seeAllunTransferredRevenue {
      amount
      reservation {
        id
      }
      createdAt
    }
  }
`;
