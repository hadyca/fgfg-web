import { gql } from "@apollo/client";

export const SEE_GUIDE = gql`
  query seeGuide($guideId: Int!) {
    seeGuide(guideId: $guideId) {
      id
      fullname
      birthdate
      height
      personality
      guideIntro
      language {
        id
        language
        level
      }
      mainGuidePhoto {
        id
        fileUrl
      }
      guidePhotos {
        id
        fileUrl
      }
      isActive
      pickupPlaceMain
      pickupPlaceLat
      pickupPlaceLng
      pickupPlaceDetail
      reservations {
        id
        startTime
        endTime
        userCancel
        guideCancel
      }
      user {
        id
        avatar
        chatRooms {
          id
        }
      }
    }
  }
`;

export const REPORT_GUIDE = gql`
  mutation createReportGuide($guideId: Int!, $reason: String!) {
    createReportGuide(guideId: $guideId, reason: $reason) {
      ok
      error
    }
  }
`;
