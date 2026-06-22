const startedAt = Date.now();
const dialog = document.querySelector('.command-dialog');
const commandInput = document.querySelector('#command-input');
const trigger = document.querySelector('.command-trigger');
const panicButton = document.querySelector('#panic');

document.querySelector('#year').textContent = new Date().getFullYear();

function updateClock() {
  document.querySelector('#local-time').textContent = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(new Date());

  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  document.querySelector('#uptime').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

updateClock();
setInterval(updateClock, 1000);

function openCommand() {
  if (!dialog.open) dialog.showModal();
  commandInput.value = '';
  commandInput.focus();
}

trigger.addEventListener('click', openCommand);

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    openCommand();
  }

  if (!dialog.open) return;
  const shortcuts = { w: 'work', h: 'history', n: 'notes', c: 'contact' };
  const target = shortcuts[event.key.toLowerCase()];
  if (target && document.activeElement !== commandInput) {
    dialog.close();
    document.querySelector(`#${target}`).scrollIntoView();
  }
});

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(`#${button.dataset.target}`);
    requestAnimationFrame(() => target.scrollIntoView());
  });
});

commandInput.addEventListener('input', () => {
  const query = commandInput.value.toLowerCase();
  document.querySelectorAll('[data-target]').forEach((button) => {
    button.hidden = !button.textContent.toLowerCase().includes(query);
  });
});

panicButton.addEventListener('click', () => {
  const normal = document.body.classList.toggle('normal-mode');
  panicButton.textContent = normal ? 'UNDO CORPORATE SANITIZATION' : 'PANIC: MAKE THIS NORMAL';
});

const buildSeed = [...document.title].reduce((sum, char) => sum + char.charCodeAt(0), 0);
document.querySelector('#build-id').textContent = buildSeed.toString(16).toUpperCase().padStart(4, '0');
