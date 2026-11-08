# esay memory eng — 아동 대상 앱 출시 전 구현 요구사항

- 일자: 2026-11-07
- 작성: 비서실장 (메인 세션에서 직접 작성)
- 지시자: CEO ("앱에 대한 개인정보 내용을 넣어주세요")
- 조사: 리서치팀, 1차 자료 기준 2026-11-07 확인
- 주관: IT본부(앱 구현) · 협조: 경영지원본부(법무), 정보보호본부
- 성격: **앱 코드와 Play Console 설정 요구사항.** 이 저장소(웹사이트) 밖의 작업이다

> **이력**: 이 파일은 2026-11-07 Next.js 전환 작업 중 IT본부장이 "서브에이전트가 날조한 문서"로 오인해 삭제했다가 복원됐다. 원인은 비서실장이 IT본부에 `docs/` 수정 금지를 지시한 상태에서 같은 디렉터리에 파일을 쓴 것이다. 에이전트 과실이 아니다.

## 결론

**아동 포함 + AdMob + Firebase Analytics 구성은 정책상 가능하다.** 단 아래 5개 전제를 모두 충족해야 한다. 하나라도 빠지면 심사 반려 또는 등록 후 삭제 대상이 된다.

## 확정 구성 (CEO 확인)

| 항목 | 값 |
|---|---|
| 플랫폼 | Google Play (Android). Apple App Store는 범위 아님 |
| 대상 연령 | **전 연령 — 아동 포함으로 신고** |
| 광고 | AdMob (`pub-8156268555626893`) |
| 분석 | Firebase Analytics |
| 학습 기록 | **기기 내부에만 저장.** 서버 전송 없음 |
| 계정 | 없음. 로그인·이메일 수집 없음 |

---

## 1. AdMob 설정 — 확신도 높음

- **`tagForChildDirectedTreatment`(TFCD)를 TRUE로 명시 설정한다.**
  미설정 시 `UNSPECIFIED`로 처리되어 아동 보호 대우가 자동 적용되지 않는다. 즉 **미설정 자체가 정책 위반 위험**이다.
  근거: developers.google.com/admob/android/targeting
- **`max_ad_content_rating`을 `G`로 설정한다.**
  근거: support.google.com/admob/answer/6223431
- **관심기반광고(interest-based advertising)와 리마케팅이 금지된다.**
  근거: Google Play Families Policy — support.google.com/googleplay/android-developer/answer/9893335
- `play-services-ads` 버전이 Families 자체인증 요건(19.0.0 이상 계열)을 충족하는지 확인한다.

**영향**: 맞춤 광고가 차단되므로 **광고 단가와 수익이 낮아진다.** 정책상 불가피하며 회피 수단이 없다.

### TFUA는 선택
`tagForUnderAgeOfConsent`(TFUA)는 GDPR용(EEA 동의 연령 미달 사용자)이다. 한국 단독 대상이면 필수가 아니다. 글로벌 배포 시 함께 TRUE로 두는 것이 보수적으로 안전하다 — **다만 이 "둘 다 설정" 권고는 리서치팀 추정이고 1차 자료 근거가 없다.**

---

## 2. 식별자 전송 차단 — 확신도 높음

아동·연령미확인 사용자로부터 **아래를 전송해서는 안 된다.**

```
AAID(광고 ID) · SIM Serial · Build Serial · BSSID · MAC · SSID · IMEI · IMSI
```

근거: support.google.com/googleplay/android-developer/answer/11043825

### Firebase Analytics 조치

- 분석용 식별자를 **App Set ID로 대체**한다 (Google 권장 대안)
- `AndroidManifest.xml`에 광고 ID 수집 차단을 명시한다
  ```xml
  <meta-data android:name="google_analytics_adid_collection_enabled" android:value="false" />
  ```
- 광고 개인화 신호를 끈다
  ```
  GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS = NO
  ```
  근거: firebase.google.com/docs/analytics/android/configure-data-collection (확신도 높음)

### `AD_ID` 권한 잔존 — 확신도 낮음

위 메타데이터만으로는 SDK 자체 매니페스트에 선언된 `com.google.android.gms.permission.AD_ID` 권한이 병합되어 남을 수 있다. `tools:node="remove"`로 명시 제거가 필요할 수 있다.

**이 항목은 Google 1차 문서에 없고 GitHub 이슈 등 2차 자료에서만 확인됐다.** 빌드 산출물의 병합된 매니페스트를 직접 확인해 검증해야 한다.

---

## 3. Play Console 선언 — 확신도 중간

"대상 고객 및 콘텐츠"에서 아동 포함으로 신고할 때 추가로 요구된다.

- 광고 게재 여부
- Families 자체인증 SDK 사용 여부 **또는** 중립 연령 화면(neutral age screen) 존재 여부
- 콘텐츠 등급을 아동 적합 수준으로
- 개인정보처리방침이 **사전에 등록되어 있어야** 한다

근거: support.google.com/googleplay/android-developer/answer/9867159
해당 페이지는 동적 UI 설명이라 전체 선언 항목 원문을 확보하지 못했다. **Play Console에서 직접 확인이 필요하다.**

---

## 4. 개인정보처리방침

경영지원본부(법무팀)가 한국어·영문 병기로 작성한다. 산출물은 `privacy.html`(기존 URL 유지).

### 필수 기재 (COPPA, 확신도 높음)

1. 수집 운영자 전원의 이름·주소·전화·이메일
2. 수집 정보 항목 및 사용 목적 (공개 여부 포함)
3. 부모의 열람·삭제·수집거부 권리 안내
4. 데이터 보존 정책

근거: FTC COPPA FAQ C.2

### 추가 요구

- **아동으로부터 수집하는 정보는 SDK·API 경유분까지 공시**해야 한다 (근거: answer/9893335, 확신도 높음)
- 방침을 **스토어 등록정보와 앱 내부 양쪽에** 링크해야 한다 (확신도 중간)
- 로그인 없이 접근 가능해야 한다

### 앱 측 작업

**앱 안에 방침 링크를 넣어야 한다.** `https://aristar.io/privacy.html`을 가리키면 된다. 이것이 웹사이트에 방침을 호스팅하는 이유다 — Play는 문서 업로드가 아니라 URL을 요구한다.

---

## 5. Data Safety 신고 — 확신도 높음

| 데이터 | 신고 |
|---|---|
| 학습 기록 (기기 내부, 서버 전송 없음) | **수집 안 함으로 신고 가능.** 기기에서만 처리되고 외부로 전송되지 않는 데이터는 신고 대상이 아니다 |
| AdMob 전송분 — IP주소, 사용자 상호작용, 진단정보, 기기/계정 식별자 | **수집함으로 신고 필수** |
| Firebase Analytics 전송분 | **수집함으로 신고 필수** |

근거: support.google.com/googleplay/android-developer/answer/10787469, developers.google.com/admob/android/privacy/play-data-disclosure

**SDK가 전송하는 데이터는 개발자 코드가 직접 다루지 않아도 신고 의무가 있다.**

**방침 내용과 Data Safety 신고가 일치해야 한다.** 불일치가 발견되면 수정 요구를 받고, 미준수 시 업데이트 차단 또는 Play 삭제 대상이 된다.

---

## 출시 전 재확인 필요 — 1차 미확인 3건

리서치팀이 1차 자료로 확정하지 못한 항목이다. **추측으로 넘기지 말고 출시 전 실물로 확인해야 한다.**

| # | 항목 | 확인 방법 |
|---|---|---|
| 1 | 국내 개인정보보호법 제22조의2(만 14세 미만 법정대리인 동의)가 **기기 내부 저장만 하는 경우에도 적용되는지** | 변호사 자문. 조문 존재는 확인됐으나 해석이 미확인이다 |
| 2 | 현재 사용 중인 정확한 `play-services-ads` 버전이 **Families 자체인증 SDK 목록에 실제로 있는지** | Play Console 내에서 직접 재확인. 목록 페이지가 동적 렌더링이라 외부에서 열람하지 못했다 |
| 3 | `AD_ID` 권한이 매니페스트 병합 후 **실제로 제거되는지** | 빌드 산출물의 병합된 매니페스트를 직접 확인 |

## 참고 — 연령 신고 선택의 비용

대상 연령 신고는 **실제 사용자를 반영해야** 하고 편의로 고를 수 없다. 다만 선택에 따른 비용 차이는 명확하다.

| | 아동 포함 (현 결정) | 13세 이상 전용 |
|---|---|---|
| 맞춤 광고 | 금지 → **광고 수익 감소** | 허용 |
| 구현 부담 | TFCD, 식별자 차단, App Set ID 전환 | 없음 |
| 방침 | COPPA 4항목 + 국내 14세 기준 이중 | 단순 |
| 심사 | 까다로움 | 일반 |
| 아동이 실제로 쓰는 경우 | 문제 없음 | **정책 위반** |

영어 단어 학습 앱에 초등학생 사용이 현실적으로 예상되면 아동 포함이 맞는 선택이다.

## 관련 문서

- 방침: `privacy.html` (법무팀 작성 중)
- 웹사이트에 방침을 호스팅하는 이유: Play Console은 문서 업로드가 아니라 URL을 요구한다
