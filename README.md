# AristarLab Website

회사 공식 웹사이트 코드입니다. Google Play Console 조직 웹사이트 인증 및 앱 출시 시 필요한 개인정보 처리방침, 이용약관 페이지를 포함합니다.

## 📁 파일 구조

```
.
├── index.html      # 메인 랜딩 페이지
├── privacy.html    # 개인정보 처리방침 (앱 등록 필수)
└── terms.html      # 서비스 이용약관
```

## 🚀 GitHub Pages 배포 (권장)

### 1. GitHub 저장소 생성

```bash
# 새 저장소 만들기 (GitHub 웹에서)
# Repository name: aristar-website (또는 원하는 이름)
# Public 선택
```

### 2. 코드 푸시

```bash
cd /path/to/aristar-website
git init
git add .
git commit -m "Initial commit: AristarLab website"
git branch -M main
git remote add origin https://github.com/[YOUR_USERNAME]/aristar-website.git
git push -u origin main
```

### 3. GitHub Pages 활성화

저장소 → **Settings** → **Pages**
- Source: `Deploy from a branch`
- Branch: `main` / `/ (root)`
- Save

5분 후 `https://[USERNAME].github.io/aristar-website/` 에서 접속 가능

### 4. 커스텀 도메인 연결

저장소 → **Settings** → **Pages** → **Custom domain**
- `aristar.io` 입력 → Save
- "Enforce HTTPS" 체크 (DNS 전파 후)

저장소 루트에 `CNAME` 파일이 자동 생성됩니다.

### 5. 가비아 DNS 설정

가비아 → My가비아 → 도메인 → **DNS 관리툴**

다음 A 레코드 4개 추가 (GitHub Pages 공식 IP):

| 타입 | 호스트 | 값 | TTL |
|------|------|------|------|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

(선택) www 서브도메인 연결:

| 타입 | 호스트 | 값 | TTL |
|------|------|------|------|
| CNAME | www | [USERNAME].github.io | 600 |

⚠️ **MX 레코드는 절대 건드리지 마세요** (이메일 포워딩 끊김)

### 6. URL 라우팅 확인

GitHub Pages는 `/privacy` 같은 확장자 없는 경로를 직접 지원하지 않습니다.
다음 두 가지 방법 중 선택:

**방법 A**: 파일명 그대로 사용 (간단)
- `https://aristar.io/privacy.html`
- `https://aristar.io/terms.html`

**방법 B**: 폴더 구조로 변경 (URL 깔끔)
```
privacy/index.html  ← privacy.html을 이렇게 옮기기
terms/index.html
```
- `https://aristar.io/privacy/`
- `https://aristar.io/terms/`

## 🔧 Vercel 배포 (대안)

GitHub보다 더 간단한 옵션:

1. https://vercel.com 가입 (GitHub 계정 연동)
2. New Project → GitHub 저장소 import
3. Deploy 클릭 → 자동 배포 완료
4. Settings → Domains → `aristar.io` 추가
5. 가비아 DNS에 A 레코드 1개만 추가:

| 타입 | 호스트 | 값 |
|------|------|------|
| A | @ | 76.76.21.21 |

## ✅ 배포 후 확인

- [ ] `https://aristar.io` 접속 → 메인 페이지 표시
- [ ] `https://aristar.io/privacy.html` 또는 `/privacy/` → 개인정보 처리방침
- [ ] `https://aristar.io/terms.html` 또는 `/terms/` → 이용약관
- [ ] HTTPS 잠금 아이콘 정상 표시
- [ ] 모바일에서 정상 표시 확인

## 📋 Google Play Console 입력 URL

- **조직 웹사이트**: `https://aristar.io`
- **개인정보 처리방침**: `https://aristar.io/privacy.html`
- **이용약관 (선택)**: `https://aristar.io/terms.html`

## 🎨 디자인 정보

- **컬러**: 따뜻한 베이지 톤 (#f5f3ee) + 테라코타 액센트 (#c8442a)
- **폰트**: Fraunces (제목) + JetBrains Mono (메타데이터)
- **반응형**: 모바일 ~ 데스크탑 자동 대응
- **외부 의존성**: Google Fonts만 사용 (자체 호스팅 가능)

## 🛠️ 수정 방법

회사 정보 변경 시 다음 파일의 해당 부분 수정:
- 주소: `index.html`, `privacy.html` 검색
- 사업자번호: `index.html`, `privacy.html` 검색
- 이메일: 전체 파일에서 `support@aristar.io` 검색
