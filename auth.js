/**
 * 이모지월드 — 인증 관리 유틸리티
 * localStorage 기반 시뮬레이션 인증
 */

const AUTH_KEY = 'emojiworld_user';

/** 로그인 처리 */
function login(nickname, emoji) {
  if (!nickname || !nickname.trim()) return false;
  const user = {
    nickname: nickname.trim(),
    emoji: emoji || '😊',
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

/** 현재 유저 정보 반환 */
function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('[이모지월드] 유저 정보 파싱 실패:', e);
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
