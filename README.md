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