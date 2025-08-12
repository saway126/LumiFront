# 🚀 무료 배포 가이드

이 앱을 무료로 배포할 수 있는 3가지 방법을 소개합니다.

## 방법 1: Vercel (추천) ⭐

가장 쉽고 빠른 방법입니다.

### 단계별 진행:

1. **GitHub에 코드 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Vercel 배포**
   - [vercel.com](https://vercel.com) 접속
   - "Sign Up" → GitHub으로 로그인
   - "Import Project" 클릭
   - GitHub 저장소 선택
   - 자동으로 설정 감지됨 → "Deploy" 클릭
   - 2-3분 후 배포 완료! 🎉

3. **배포된 URL**
   - `https://your-project-name.vercel.app` 형태로 자동 생성됨

### Vercel CLI로 직접 배포 (GitHub 없이)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 질문에 답하기:
# ? Set up and deploy "~/project-folder"? [Y/n] Y
# ? Which scope do you want to deploy to? Your Name
# ? Link to existing project? [Y/n] n
# ? What's your project's name? interview-simulator
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

---

## 방법 2: Netlify

Vercel과 비슷하게 쉽습니다.

### 단계별 진행:

1. **GitHub에 코드 업로드** (위와 동일)

2. **Netlify 배포**
   - [netlify.com](https://netlify.com) 접속
   - "Sign Up" → GitHub으로 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - Build command: `npm run build`
   - Publish directory: `dist`
   - "Deploy site" 클릭

3. **배포된 URL**
   - `https://amazing-name-123456.netlify.app` 형태로 자동 생성됨
   - Site settings에서 도메인 이름 변경 가능

### Netlify Drop (드래그 앤 드롭)
```bash
# 빌드
npm run build

# 브라우저에서:
# 1. https://app.netlify.com/drop 접속
# 2. dist 폴더를 드래그 앤 드롭
# 3. 즉시 배포 완료!
```

---

## 방법 3: GitHub Pages

GitHub 저장소만 있으면 무료로 사용 가능합니다.

### 단계별 진행:

1. **vite.config.ts 수정**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/'  // 저장소 이름 추가
   })
   ```

2. **배포 스크립트 추가** (package.json)
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **gh-pages 설치 및 배포**
   ```bash
   npm install --save-dev gh-pages
   npm run deploy
   ```

4. **GitHub 설정**
   - GitHub 저장소 → Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - 배포 URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 🔥 빠른 배포 (5분 안에!)

가장 빠른 방법은 **Vercel CLI**입니다:

```bash
# 1. Vercel CLI 설치 (한 번만)
npm i -g vercel

# 2. 프로젝트 빌드
npm run build

# 3. 배포!
vercel --prod

# 4. 완료! URL이 터미널에 표시됩니다
```

---

## 📝 중요 참고사항

### 음성 인식 기능 관련:
- ✅ **HTTPS 필수**: 모든 배포 서비스는 자동으로 HTTPS 제공
- ✅ **마이크 권한**: 사용자가 첫 사용 시 권한 허용 필요
- ⚠️ **브라우저 호환성**: Chrome, Edge, Safari 최신 버전 필요

### 무료 티어 제한:
- **Vercel**: 월 100GB 대역폭, 무제한 배포
- **Netlify**: 월 100GB 대역폭, 300분 빌드 시간
- **GitHub Pages**: 월 100GB 대역폭, 저장소당 1GB

### 커스텀 도메인:
모든 서비스에서 무료로 커스텀 도메인 연결 가능!
예: `interview.yourdomain.com`

---

## 🚨 문제 해결

### 빌드 실패 시:
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 에러 발생 시:
- SPA 라우팅 설정 확인 (vercel.json 또는 netlify.toml)
- base URL 설정 확인 (GitHub Pages의 경우)

### 음성 인식 안 될 때:
- HTTPS 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인
- 마이크 권한 설정 확인

---

## 📞 도움말

- Vercel 문서: https://vercel.com/docs
- Netlify 문서: https://docs.netlify.com
- GitHub Pages 문서: https://pages.github.com

배포 성공하시길 바랍니다! 🎉