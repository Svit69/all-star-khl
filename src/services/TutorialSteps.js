const typeAndSelectGalkin = () => {
  const input = document.querySelector('.search-input');
  if (!input) return;
  input.value = 'Галкина';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  window.setTimeout(() => {
    const items = Array.from(document.querySelectorAll('.search-suggestion'));
    const match = items.find((item) => item.textContent.toLowerCase().includes('галкин'));
    if (match) match.click();
  }, 350);
};

export const buildTutorialSteps = () => ([
  { title: 'Шаг 1', body: 'Цель — угадать всех участников Матча Звезд КХЛ 2026.' },
  { title: 'Шаг 2', body: 'Игроки сгруппированы по клубам КХЛ — выбирайте эмблему.', target: '.carousel-shell' },
  { title: 'Шаг 3', body: 'Подсказки с «?» можно нажимать, чтобы открыть детали.', target: '.position-hint' },
  { title: 'Шаг 4', body: 'Введите фамилию хоккеиста в поисковую строку.', target: '.search-panel' },
  { title: 'Шаг 5', body: 'Показываем пример: вводим «Галкина» и выбираем подсказку.', target: '.search-panel', onEnter: typeAndSelectGalkin }
]);
