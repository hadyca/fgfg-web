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
      language
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

export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($guideId: Int!) {
    createChatRoom(guideId: $guideId) {
      id
    }
  }
`;
