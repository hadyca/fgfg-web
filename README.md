##TO-BE LIST (필수)

- (인증)비번찾기
- (달력)달력 locale에 따라서 언어 변경 및 value값 변경, 하지만 action에서 url 넘길 때는 yyyy-MM-dd 형식으로 보낼 것
- (가이드)가이드 인원 많아지면 페이지네이션으로 변경
- (백엔드)모델부분에 language 필드, 추 후 postgresql사용 시 String -> Json으로 교체 해야함 (관련 create, 호출부분도 다시 교체)
- (글로벌 서비스 후)백엔드는 UTC기준, 클라이언트의 시간 부분은 베트남에 다 맞추어져 있는데, 이를 베트남이 아니라 각 로컬 국가에 맞게 바꾸어야함.
- (예약)예약 하는 부분에서, 가이드 존중하고, 성희롱 하지 말라는 내용 넣기

##TO-BE LIST (보류)

- (인증)문자인증
- (인증)소셜로그인
- (인증)이메일 인증
- (가이드)가이드 프로필 생성 시, 불가능한 날짜, 시간대, 요일 기능 추가
- (가이드 프로필 생성)가이드 프로필 생성할 때, 고객이 할 수 없는 것들 넣기 (흡연, 멀리 가는 데이트 등...)

##버그

- 모바일 환경에서 아바타기본값 안보임

에어비엔비 메시지 검토한다는 내용
https://www.airbnb.co.kr/help/article/1121
