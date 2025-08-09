# 🎯 Frontend Developer Interview Simulator

영어 프론트엔드 개발자 면접을 연습할 수 있는 AI 기반 시뮬레이터입니다.

## ✨ 주요 기능

- 📚 **다양한 면접 질문 카테고리**
  - Technical (기술적 질문)
  - JavaScript & React
  - CSS & Frontend-specific  
  - Behavioral (행동 면접)
  - Project Experience (프로젝트 경험)
  - Problem Solving (문제 해결)

- 🎯 **난이도별 질문** (Beginner, Intermediate, Advanced)
- 🎤 **음성 인식 기능** (브라우저 내장 Speech Recognition API)
- ⏱️ **실시간 타이머 & 진행률 표시**
- 📊 **자동 점수 평가 및 피드백 시스템**
- 📱 **반응형 디자인** (모바일/태블릿/데스크톱 지원)

## 🚀 시작하기

### 필요 조건
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/saway126/LumiFront.git
cd LumiFront

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🎮 사용법

1. **면접 시작**: "Start Interview" 버튼 클릭
2. **질문 확인**: 각 질문과 관련 키워드들 읽기
3. **답변 입력**: 
   - 키보드로 직접 타이핑
   - 🎤 버튼으로 음성 인식 사용
4. **진행**: "Next Question" 버튼으로 다음 질문으로 이동
5. **결과 확인**: 면접 완료 후 상세한 점수 및 피드백 확인

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (반응형 디자인)
- **Voice Recognition**: Web Speech API
- **State Management**: React Hooks

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트들
│   ├── InterviewSimulator.tsx
│   ├── Timer.tsx
│   ├── QuestionDisplay.tsx
│   ├── AnswerInput.tsx
│   ├── ProgressBar.tsx
│   └── Results.tsx
├── data/               # 면접 질문 데이터
│   └── questions.ts
├── types/              # TypeScript 타입 정의
│   └── interview.ts
└── App.tsx            # 메인 앱 컴포넌트
```

## 🎯 평가 시스템

- **키워드 매칭**: 답변에서 예상 키워드 검출
- **답변 길이**: 적절한 설명 분량 평가
- **시간 관리**: 제한 시간 내 답변 완료 여부
- **종합 점수**: 100점 만점으로 자동 산정

## 🌟 향후 개발 계획

- [ ] AI 기반 더 정교한 답변 분석
- [ ] 사용자별 학습 진도 추적
- [ ] 면접 영상 녹화 기능
- [ ] 더 많은 질문 카테고리 추가
- [ ] 실시간 발음 평가

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 생성해주세요.

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!