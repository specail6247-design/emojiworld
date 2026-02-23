/**
 * 이모지월드 - 메인 애플리케이션 스크립트
 * 방어 로직 및 글로벌 에러 핸들링 포함
 */

// ── 글로벌 에러 핸들러 ──
window.onerror = function (message, source, lineno, colno, error) {
  console.error("[이모지월드 에러]", { message, source, lineno, colno, error });
  return true;
};

window.addEventListener("unhandledrejection", function (event) {
  console.error("[이모지월드 Promise 에러]", event.reason);
});

// ── 이모지 데이터 ──
const emojis = [
  "🚀",
  "✨",
  "🔥",
  "🌈",
  "🐱",
  "🍕",
  "🎸",
  "🏝️",
  "🎮",
  "❤️",
  "💎",
  "🦄",
];

/**
 * 랜덤 이모지 반환
 * @returns {string} 랜덤 이모지 문자열
 */
function getRandomEmoji() {
  if (!emojis || emojis.length === 0) {
    return "😊"; // 폴백 이모지
  }
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// ── DOM 초기화 ──
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("emoji-display");
  const btn = document.getElementById("vibe-btn");

  // DOM 요소 null 체크
  if (!display) {
    console.warn("[이모지월드] #emoji-display 요소를 찾을 수 없습니다.");
    return;
  }

  if (!btn) {
    console.warn("[이모지월드] #vibe-btn 요소를 찾을 수 없습니다.");
    return;
  }

  /**
   * 이모지 변경 + 애니메이션 효과
   */
  function changeVibe() {
    const randomEmoji = getRandomEmoji();
    display.textContent = randomEmoji;

    // 시각적 바운스 효과
    display.style.transform = "scale(1.6) rotate(-10deg)";
    setTimeout(function () {
      display.style.transform = "scale(1) rotate(0deg)";
    }, 300);

    // 스크린 리더 알림
    display.setAttribute("aria-label", "현재 이모지: " + randomEmoji);
  }

  // 이벤트 리스너 등록
  btn.addEventListener("click", changeVibe);
  display.addEventListener("click", changeVibe);

  // 초기 aria 설정
  display.setAttribute("role", "img");
  display.setAttribute("aria-label", "현재 이모지: " + display.textContent);
  display.setAttribute("aria-live", "polite");
});
