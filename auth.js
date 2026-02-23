/**
 * 이모지월드 — 인증 관리 유틸리티
 * localStorage 기반 시뮬레이션 인증
 */

const AUTH_KEY = 'emojiworld_user';

/** 입력 안전 처리 — HTML 태그 제거 + 길이 제한 */
function sanitizeInput(str, maxLen) {
  if (!str || typeof str !== 'string') return '';
  // HTML 태그 완전 제거
  var clean = str.replace(/<[^>]*>/g, '');
  // 제어 문자 제거 (탭/개행 제외)
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return clean.trim().substring(0, maxLen || 20);
}

/** 이모지 유효성 검증 */
function isValidEmoji(emoji) {
  if (!emoji || typeof emoji !== 'string') return false;
  // 이모지는 최대 8자(서로게이트 페어 포함) 이하여야 함
  if (emoji.length > 8) return false;
  // 스크립트 태그 등 위험 문자열 차단
  if (/<|>|&|"|'/.test(emoji)) return false;
  return true;
}

/** 로그인 처리 */
function login(nickname, emoji) {
  var safeName = sanitizeInput(nickname, 20);
  if (!safeName || safeName.length < 1) return false;
  if (!isValidEmoji(emoji)) emoji = '😊';
  
  const user = {
    nickname: safeName,
    emoji: emoji,
    joinedAt: new Date().toISOString(),
    followers: Math.floor(Math.random() * 500) + 50,
    following: Math.floor(Math.random() * 300) + 20,
    posts: Math.floor(Math.random() * 30) + 5,
  };
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  } catch (e) {
    console.error('[이모지월드] 로그인 저장 실패:', e);
    return false;
  }
}

/** 로그아웃 처리 */
function logout() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('[이모지월드] 로그아웃 실패:', e);
  }
  window.location.href = 'login.html';
}

/** 로그인 여부 확인 */
function isLoggedIn() {
  try {
    return localStorage.getItem(AUTH_KEY) !== null;
  } catch (e) {
    return false;
  }
}

/** 현재 유저 정보 반환 — 데이터 무결성 검증 포함 */
function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return null;
    const user = JSON.parse(data);
    // 필수 필드 검증
    if (!user || typeof user !== 'object') return null;
    if (!user.nickname || typeof user.nickname !== 'string') return null;
    // 저장된 데이터도 재 sanitize
    user.nickname = sanitizeInput(user.nickname, 20);
    if (!isValidEmoji(user.emoji)) user.emoji = '😊';
    // 숫자 필드 안전 처리
    user.followers = Math.max(0, parseInt(user.followers, 10) || 0);
    user.following = Math.max(0, parseInt(user.following, 10) || 0);
    user.posts = Math.max(0, parseInt(user.posts, 10) || 0);
    return user;
  } catch (e) {
    console.error('[이모지월드] 유저 정보 파싱 실패:', e);
    // 손상된 데이터 삭제
    try { localStorage.removeItem(AUTH_KEY); } catch (ex) {}
    return null;
  }
}

/** 유저 정보 업데이트 */
function updateUser(updates) {
  const user = getCurrentUser();
  if (!user) return false;
  const updated = { ...user, ...updates };
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 인증 가드 — 미로그인 시 login.html로 리디렉트
 * 로그인 필수 페이지에서 호출
 */
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/**
 * 이미 로그인된 상태에서 로그인 페이지 접근 시 피드로 리디렉트
 */
function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = 'feed.html';
    return true;
  }
  return false;
}
