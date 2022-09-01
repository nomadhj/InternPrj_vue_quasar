# 기업 협업 프로젝트 (Vue.js & Quasar 프로젝트)

## 프로젝트 배포 Link

- github 프로젝트 배포용 url : https://extraordinary-pudding-b04856.netlify.app/
  - (실제 서비스 앱인 만큼 배포한 코드에서 문제 될 만한 부분을 삭제하고 데이터베이스를 별도로 구현하였습니다.)
- 실제 서비스 App url (모든 구현 기능 확인 가능) : https://trippy.place/

## 프로젝트 개요

- 내용 : 기업 인턴 프로젝트로 실제 서비스 app의 **소개 및 신규 기능 설명 페이지 구현**
- 기간 : ‘22.6.20 ~ ‘22.7.13 (4주)
- 인원 : 프론트엔드 2명
- 기술스택 및 협업 tool
  - **Vue.js**
  - **Quasar**
  - JavaScript
  - HTML/CSS(SCSS)
  - 협업 툴 : Figma, Slack, Notion

## 구현 기능 설명
**(실제 APP 적용 기능 위주 설명)**
  ### 메인 페이지 
    - 각 아이콘을 클릭함으로써 해당 스토리의 모달창을 띄우는 형태
    - 사용자가 방문한 스토리의 아이콘은 외곽 highlight가 사라지도록 구현 (스토리 방문 여부 확인 기능)
    - 단, 서버에 저장 된 마지막 업데이트 일자와 클라이언트의 localStorage에 저장 된 날짜를 비교해서,
    서버의 마지막 업데이트가 더 최근일 경우 아이콘의 외곽 highlight 다시 생성
    - 각 스토리는 하나의 컴포넌트로 구현되어 서버에 저장된 데이터의 수에 맞게 각 모달 및 아이콘이 동적으로 생성 됨
    
 ![스크린샷 2022-08-24 오후 10 25 31](https://user-images.githubusercontent.com/101119985/186430245-de9da46f-ba01-47b7-b5b3-8ecfe465fa1a.png)

  ### 스토리 
    1. auto slide 기능
      - 자동 슬라이드 및 상단 인디케이터 구현
      - 자동 슬라이드 멈춤/재생 버튼 구현
    2. 화면 클릭/스와이프
      - 페이지 좌/우 클릭을 통한 화면 전환 (다음 페이지로 이동)
      - 화면 스와이프 기능 (다음 스토리로 이동)
      - 상하 스와이프 기능 (모달 창 닫기)
    3. 기타 구현 사항
      - 데이터 로딩 중 스켈레톤 UI + spinner 적용
      - fetch 함수 사용 시 기존 프로젝트에 별도 구현되어 있던 커스텀 함수를 적용 
      (유지보수성 증대 및 관심사 분리 목적)
      
 ![스크린샷 2022-08-24 오후 10 26 57](https://user-images.githubusercontent.com/101119985/186430511-e6c79eb6-7b1f-49cf-839c-187af23e0d4d.png)


### (참고) Quasar 프로젝트 명령어

- 개발 모드
  ```bash
  quasar dev
  ```
- 앱 빌드
  ```bash
  quasar build
  ```
