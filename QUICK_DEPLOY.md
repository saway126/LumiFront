# ⚡ 5분 안에 무료 배포하기!

## 가장 빠른 방법: Vercel CLI

```bash
# 1. 터미널 열기
cd /workspace

# 2. Vercel CLI 설치 (처음만)
npm i -g vercel

# 3. 빌드 확인 
npm run build

# 4. 배포! (이메일 인증 필요)
vercel --prod

# 5. 완료! 🎉
# 배포 URL: https://YOUR-PROJECT.vercel.app
```

## 또는 Netlify Drop (더 쉬움!)

1. 빌드하기: `npm run build`
2. 브라우저에서 [app.netlify.com/drop](https://app.netlify.com/drop) 열기
3. `dist` 폴더를 드래그 앤 드롭
4. 완료! 🚀

## 체크리스트 ✅

- [x] 프로덕션 빌드 생성 (`npm run build`)
- [x] `vercel.json` 설정 파일 생성됨
- [x] `netlify.toml` 설정 파일 생성됨
- [x] 배포 스크립트 추가됨
- [ ] 배포 서비스 선택:
  - [ ] Vercel (추천)
  - [ ] Netlify
  - [ ] GitHub Pages
- [ ] 배포 완료!

## 배포 후 테스트

1. 배포된 URL 접속
2. 음성 인식 테스트 페이지 확인
3. 마이크 권한 허용
4. 녹음 버튼 클릭 후 테스트

## 문제 발생 시

- 콘솔 에러 확인 (F12)
- HTTPS 연결 확인
- 브라우저 호환성 확인 (Chrome/Edge/Safari)

자세한 내용은 `DEPLOY_GUIDE.md` 참고!