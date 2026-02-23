# 이모지월드 (EmojiWorld)

현재 버전은 순수 HTML/CSS/JavaScript로 구성된 단순 프로토타입입니다.

## 📁 현재 파일 구조

- `index.html` - 메인 이모지 랜덤 변경 페이지
- `style.css` - 스타일시트
- `utils.js` - 유틸리티 스크립트
- `summary.html` - Next.js 버전 점검 요약

## 🎯 기능

- 이모지 랜덤 변경 ("분위기 바꾸기" 버튼)
- 글래스모피즘 디자인
- 호버/클릭 애니메이션 효과

## 🔧 실행 방법

1. `index.html`을 브라우저에서 열기
2. 또는 로컬 서버 실행:
   ```bash
   npx serve .
   ```

## 📝 참고 사항

이 프로젝트는 원래 **Next.js + Firebase Hosting** 기반의 완전한 버전이 있었으나, 현재 로컬에서는 이 단순 버전만 확인됨.

완전한 버전의 특징:

- Next.js 프레임워크
- Firebase Hosting 배포
- `out/` 폴더로 정적 빌드
- `scripts/firebase-startup.sh` 실행 스크립트

자세한 점검 내용은 `summary.html` 참고.
