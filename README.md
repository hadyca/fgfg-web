##TO-BE LIST (필수/단기)

.

- (번역) 베트남어로 전체 번역 (에러 메시지 포함) / chatgpt로 1차 번역 이 후, 가을샘한테 페이지 별로 검토 부탁 (11월 휴가 갔을때 같이 수고비 드림 - 5만원)
- (달력)달력 locale에 따라서 언어 변경 및 value값 변경(?), 하지만 action에서 url넘길 때는 yyyy-MM-dd 형식으로 보낼 것
- (예약 관리(유저/가이드 모두))

  1.가이드가 24시간 이내 예약확정 안하면 자동으로 예약 캔슬 되게 로직 구성

##TO-BE LIST (필수/장기)

- 현재는 돈 입금 후에 내가 수동으로 가이드한테 메신저로 알려줘야 하는데, 나중에 아임포트 연동 후에는 자동으로 유저 예약 후에 가이드에게 메일 발송해야함

- (결제)사업자등록증 발급 후, 아임포트 연동
- (카카오id) 현재 임의로 한국 고객상담은 내 원래 카카오 id 사용중 -> 추 후 다른 id로 사용 or 이메일로 변경
- 현재 임시로 카카오톡 연동해서 수동 작업중인데, 나중에 아임포트로 바꾼 후에는 (프론트,백엔드)isDeposited관련 모두 삭제해야함 (위 내용 연동)
- 완료된 예약 + 취소된 예약에 대해 한달치만 보여주고, 전체보기 누르면 전체보여주는식으로 하자
- (인증)비번찾기 (이메일로 대체 예정)
- (가이드)가이드 인원 많아지면 페이지네이션으로 변경
- (글로벌 서비스 후)백엔드는 UTC기준, 클라이언트의 시간 부분은 베트남에 다 맞추어져 있는데, 이를 베트남이 아니라 각 로컬 국가에 맞게 바꾸어야함.
- (알람) 메시지 보냈을 때, 아직 안읽은게 있거나, 실시간으로 메시지로 온게 있을 때 알람 되게끔 해주기 (아바타에 점으로 표시하거나,, 알람 아이콘을 하나더 만들던가,,)

  ##TO-BE LIST (보류/고민)

- (인증)문자인증
- (인증)소셜로그인
- (인증)이메일 인증
- (가이드)가이드 프로필 생성 시, 불가능한 날짜, 시간대, 요일 기능 추가
- (가이드 프로필 생성)가이드 프로필 생성할 때, 고객이 할 수 없는 것들 넣기 (흡연, 멀리 가는 데이트 등...)

##버그

##참고

- 에어비엔비 메시지 검토한다는 내용
  https://www.airbnb.co.kr/help/article/1121

  이용약관
  https://rentalkanojo.com/rules/

##가을샘 질문 할 것

1. 베트남 달력 보여줄때, 값 한국처럼 해도 될지?
2. 가이드한테 반드시 zalo연락처 받아놓을것 (입금 받은 후에, 예약 수락or 거절하라고 알려줘야함)
3. 번역 문의
