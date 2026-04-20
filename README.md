# Frontend Movies

영화 검색 + 평가 기능을 구현해본 프로젝트입니다.  
TMDB API랑 Firebase를 같이 써서 실제 서비스처럼 데이터 흐름을 만들어보려고 했습니다.

---

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS 4

- React Query (서버 데이터 관리)
- Zustand (UI 상태 관리)

- Firebase (Auth + Firestore)
- TMDB API
- Netlify(배포)

---

## 주요 기능

- 영화 검색
- 영화 상세 페이지

- 로그인 (이메일 / 구글)
- 리뷰 작성 / 삭제
- 평점 등록 / 수정
- 좋아요(즐겨찾기)

- 마이페이지 (내 활동 확인)

---

## 구조

```bash
src/
 ├─ app/
 ├─ entities/
 ├─ features/
 ├─ shared/
 ├─ store/
```
- 기능 단위 구분(auth, review, rating 같은 것들)
- 공통 shared 분리

---

### 구현하면서 신경 쓴 부분

## 1. 상태 분리

서버 데이터는 React Query로 관리하고
UI 상태는 Zustand로 따로 분리했습니다.

처음에는 섞어서 쓰다가 구조가 너무 복잡해져서 나눴습니다.

## 2. API 분리

컴포넌트에서 바로 API 호출 안 하고
api 파일 따로 만들어서 관리했습니다.

나중에 유지보수할 때 훨씬 편했습니다.

## 3. Firebase 데이터 구조
- users
- reviews
- ratings
- favorites

이렇게 나눠서 관리했습니다.

특히 평점은 userId + movieId 기준으로 하나만 저장되게 처리했습니다.

## 4. UX

평점이나 좋아요 누르면 바로 반영되게
낙관적 업데이트 적용했습니다.

---

## 실행방법

```bash
npm install
npm run dev
```
---

## 환경변수

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_TMDB_TOKEN=
```
