##TO-BE LIST (필수/단기)

- (가이드 대쉬보드)

1. 가이드 프로필 생성 or 수정 (이미 생성된거면 수정으로 표시 / 삭제는 불가능)
2. 예약 관리 (유저 내 예약 비슷하게 하기)
3. 계좌정보 (입금받을 계좌정보) - 정책 알려주기 (1주에 한번 2주에 한번)
4. 수입 - 총 수익(미입금 수입 포함) / 미입금 수입 (reservation 모델에 계좌이체 여부 추가해야함)
5. 가이드 규칙 - 가이드 운영방침(이용약관에 넣기 어려운 디테일한 부분)

- (reservation페이지)

1. 예약 결제 - stripe 바로 되는게 아니라 가이드 예약 컨펌 시 결제 되게끔 로직 수정 (payment 대신에 manual 추가 수정 - 챗지피티문의)
2. 결제 완료 페이지 꾸미기 (가이드 예약 컨펌 후 결제된다고 알려주기)
3. 나머지 이용 약관 규칙 등은 가이드 대쉬 보드 및 약관 및 개인정보처리방침 완료 후 마무리 하기

- (인증)비번찾기
- (달력)달력 locale에 따라서 언어 변경 및 value값 변경(?), 하지만 action에서 url 넘길 때는 yyyy-MM-dd 형식으로 보낼 것
- (백엔드)모델부분에 language 필드, 추 후 postgresql사용 시 String -> Json으로 교체 해야함 (관련 create, 호출부분도 다시 교체)
- (예약)예약 하는 부분에서, 가이드 존중하고, 성희롱 하지 말라는 내용 넣기
- (알람) 메시지 보냈을 때, 아직 안읽은게 있거나, 실시간으로 메시지로 온게 있을 때 알람 되게끔 해주기 (아바타에 점으로 표시하거나,, 알람 아이콘을 하나더 만들던가,,)

##TO-BE LIST (필수/장기)

- (가이드)가이드 인원 많아지면 페이지네이션으로 변경
- (글로벌 서비스 후)백엔드는 UTC기준, 클라이언트의 시간 부분은 베트남에 다 맞추어져 있는데, 이를 베트남이 아니라 각 로컬 국가에 맞게 바꾸어야함.

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
