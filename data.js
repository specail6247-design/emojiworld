/**
 * 이모지월드 — 샘플 데이터 & localStorage 헬퍼
 */

// ── 이모지 카테고리 ──
const EMOJI_AVATARS = ['😎', '🤩', '🥳', '😺', '🐶', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🦄', '🐲', '👻', '🤖', '👽', '🎃', '⭐'];

const EMOJI_ARTS = [
  ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '🌿'],
  ['🍕', '🍔', '🌮', '🍣', '🍜', '🍩', '🎂', '🍦', '☕'],
  ['⚽', '🏀', '🎾', '🏈', '⚾', '🎱', '🏓', '🏸', '🥊'],
  ['🚀', '✨', '🌙', '⭐', '☀️', '🌈', '💫', '🔥', '💎'],
  ['🎸', '🎹', '🥁', '🎺', '🎻', '🎤', '🎶', '🎵', '🎼'],
  ['🏔️', '🌊', '🏝️', '🌅', '🏜️', '🌋', '⛰️', '🗻', '🏕️'],
  ['🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🦊', '🐯', '🦁'],
  ['💖', '💜', '💙', '💚', '💛', '🧡', '❤️', '🖤', '🤍'],
  ['🎮', '🕹️', '🎯', '🎲', '🧩', '♟️', '🎰', '🎳', '🏆'],
  ['👑', '💍', '👜', '🕶️', '👒', '🧢', '🎩', '💄', '💅'],
];

// ── 샘플 유저 ──
const SAMPLE_USERS = [
  { nickname: '이모지마스터', emoji: '😎' },
  { nickname: '우주탐험가', emoji: '🚀' },
  { nickname: '고양이집사', emoji: '🐱' },
  { nickname: '음악사랑', emoji: '🎸' },
  { nickname: '맛집헌터', emoji: '🍕' },
  { nickname: '운동매니아', emoji: '⚽' },
  { nickname: '꽃사랑', emoji: '🌸' },
  { nickname: '게임러', emoji: '🎮' },
  { nickname: '여행가', emoji: '🏝️' },
  { nickname: '보석수집가', emoji: '💎' },
  { nickname: '별나라', emoji: '⭐' },
  { nickname: '패션피플', emoji: '👑' },
];

// ── 샘플 이미지 포스트 (일상 브이로그) ──
var SAMPLE_IMAGE_POSTS = [
  {
    id: 'sample_img_1',
    user: { nickname: '카페요정', emoji: '☕' },
    image: 'images/cafe.png',
    caption: '☕✨🌿 🤎🫧',
    time: '10분 전',
    likes: 234,
    comments: 18
  },
  {
    id: 'sample_img_2',
    user: { nickname: '여행가', emoji: '🌅' },
    image: 'images/sunset.png',
    caption: '🌅🏔️✨ 🧡💜',
    time: '25분 전',
    likes: 567,
    comments: 42
  },
  {
    id: 'sample_img_3',
    user: { nickname: '꽃사랑', emoji: '🌸' },
    image: 'images/street.png',
    caption: '🌸🏡💕 😊🌷',
    time: '1시간 전',
    likes: 892,
    comments: 67
  },
  {
    id: 'sample_img_4',
    user: { nickname: '디저트요정', emoji: '🍰' },
    image: 'images/dessert.png',
    caption: '🍰🍓🫧 💖✨',
    time: '2시간 전',
    likes: 445,
    comments: 31
  }
];

// ── 시간 포맷 ──
function timeAgo(index) {
  const times = ['방금 전', '5분 전', '15분 전', '30분 전', '1시간 전', '2시간 전', '3시간 전', '5시간 전', '8시간 전', '12시간 전', '1일 전', '2일 전'];
  return times[index % times.length];
}

// ── 샘플 포스트 생성 ──
function generatePosts() {
  return SAMPLE_USERS.map(function (user, index) {
    const art = EMOJI_ARTS[index % EMOJI_ARTS.length];
    const likes = Math.floor(Math.random() * 500) + 10;
    const comments = Math.floor(Math.random() * 50) + 1;
    const captions = [
      '오늘의 이모지 조합! ✨',
      '이거 어때요? 😍',
      '새로운 조합 만들어봤어요~',
      '이모지로 세상을 표현하기 🌍',
      '기분 좋은 하루! 🎉',
      '이 조합 대박이지 않나요?',
      '이모지 아트 도전! 🎨',
      '오늘의 무드 💭',
      '이모지 갤러리 오픈! 🖼️',
      '여러분도 만들어보세요 🤗',
      '최고의 조합 발견! 🏆',
      '이모지 세계 탐험 🗺️',
    ];
    return {
      id: index,
      user: user,
      art: art,
      likes: likes,
      comments: comments,
      caption: captions[index % captions.length],
      time: timeAgo(index),
      liked: false,
      saved: false,
    };
  });
}

// ── 좋아요 토글 (localStorage) ──
const LIKES_KEY = 'emojiworld_likes';
const SAVES_KEY = 'emojiworld_saves';

function getLikedPosts() {
  try {
    var data = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}

function toggleLike(postId) {
  var liked = getLikedPosts();
  var idx = liked.indexOf(postId);
  if (idx > -1) {
    liked.splice(idx, 1);
  } else {
    if (liked.length >= 10000) liked.shift(); // 무한 성장 방지
    liked.push(postId);
  }
  try { localStorage.setItem(LIKES_KEY, JSON.stringify(liked)); } catch (e) {
    console.warn('[이모지월드] localStorage 저장 실패 — 용량 초과 가능');
  }
  return idx === -1;
}

function getSavedPosts() {
  try {
    var data = JSON.parse(localStorage.getItem(SAVES_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}

function toggleSave(postId) {
  var saved = getSavedPosts();
  var idx = saved.indexOf(postId);
  if (idx > -1) {
    saved.splice(idx, 1);
  } else {
    if (saved.length >= 10000) saved.shift(); // 무한 성장 방지
    saved.push(postId);
  }
  try { localStorage.setItem(SAVES_KEY, JSON.stringify(saved)); } catch (e) {
    console.warn('[이모지월드] localStorage 저장 실패 — 용량 초과 가능');
  }
  return idx === -1;
}

// ── 유저 포스트 관리 ──
var USER_POSTS_KEY = 'emojiworld_user_posts';
var REACTIONS_KEY = 'emojiworld_reactions';

// 리액션 이모지 목록
var REACTION_EMOJIS = ['❤️', '😍', '😂', '😮', '😢', '🔥', '👏', '💯', '🎉', '✨', '💪', '🙏', '😎', '🤩', '💖', '👍'];

// 이미지를 리사이즈하여 base64로 변환 (최대 500KB)
function resizeImage(file, maxSize, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var max = maxSize || 600;
      var w = img.width;
      var h = img.height;
      if (w > h) { if (w > max) { h = h * max / w; w = max; } }
      else { if (h > max) { w = w * max / h; h = max; } }
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      var dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(dataUrl);
    };
    img.onerror = function () { callback(null); };
    img.src = e.target.result;
  };
  reader.onerror = function () { callback(null); };
  reader.readAsDataURL(file);
}

// 유저 포스트 가져오기
function getUserPosts() {
  try {
    var data = JSON.parse(localStorage.getItem(USER_POSTS_KEY) || '[]');
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}

// 유저 포스트 추가
function addUserPost(imageData, caption) {
  var posts = getUserPosts();
  if (posts.length >= 50) posts.pop(); // 최대 50개
  var post = {
    id: 'user_' + Date.now(),
    image: imageData,
    caption: caption || '',
    createdAt: new Date().toISOString(),
    reactions: {}
  };
  posts.unshift(post);
  try {
    localStorage.setItem(USER_POSTS_KEY, JSON.stringify(posts));
    return post;
  } catch (e) {
    console.warn('[이모지월드] 포스트 저장 실패 — 용량 초과');
    return null;
  }
}

// ── 리액션 관리 ──
function getAllReactions() {
  try {
    var data = JSON.parse(localStorage.getItem(REACTIONS_KEY) || '{}');
    return (typeof data === 'object' && data !== null) ? data : {};
  } catch (e) { return {}; }
}

function getPostReactions(postId) {
  var all = getAllReactions();
  return all[postId] || {};
}

function toggleReaction(postId, emoji) {
  var all = getAllReactions();
  if (!all[postId]) all[postId] = {};
  var reactions = all[postId];
  if (!reactions[emoji]) reactions[emoji] = { count: 0, mine: false };
  if (reactions[emoji].mine) {
    reactions[emoji].count = Math.max(0, reactions[emoji].count - 1);
    reactions[emoji].mine = false;
    if (reactions[emoji].count === 0) delete reactions[emoji];
  } else {
    reactions[emoji].count++;
    reactions[emoji].mine = true;
  }
  try { localStorage.setItem(REACTIONS_KEY, JSON.stringify(all)); } catch (e) {}
  return all[postId] || {};
}
