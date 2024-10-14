import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      email
      guide {
        id
        fullname
        isApproved
      }
      chatRooms {
        id
        otherUserId
        users {
          id
        }
      }
    }
  }
`;

export const SEE_MY_GUIDE = gql`
  query seeMyGuide {
    seeMyGuide {
      fullname
      birthdate
      height
      address
      phone
      language
      mainGuidePhoto {
        id
      }
      guidePhotos {
        fileUrlOrder
        fileUrl
      }

      personality
      guideIntro
      pickupPlaceMain
      pickupPlaceLat
      pickupPlaceLng
      pickupPlaceDetail
    }
  }
`;
