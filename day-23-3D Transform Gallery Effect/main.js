    
console.clear();
const backstage = document.querySelector('.back.stage');
let performer = null;

backstage.addEventListener('click', e => {
  const elm = e.target;
  const character = elm.closest('.character');
  if (!character) return;
  if (performer) {
    if (performer === character)
      sendBack(character);
  }
  else
    sendFront(character);
});


function sendBack(character) {
  for (const ch of Array.from(backstage.children)) {
    ch.classList.remove('performing');
    ch.classList.remove('idle');
  }
  performer = null;
  backstage.classList.remove('live');
}


function sendFront(character) {
  for (const ch of Array.from(backstage.children)) {
    if (ch === character) {
      const r = ch.getBoundingClientRect();
      const o = backstage.getBoundingClientRect();
      ch.dataset.top = `${(r.top - o.top)/o.height*100}%`;
      ch.dataset.left = `${(r.left - o.left)/o.width*100}%`;
      // inject `top` & `left`
      ch.style.top = ch.dataset.top;
      ch.style.left = ch.dataset.left;
      ch.offsetWidth; // force re-calc (apply inline styles above)
      ch.classList.add('performing'); // apply css class, then
      ch.setAttribute('style', ''); // immd. take out inline style
      // ** let `.performing` takes over `top` & `left`
    }
    else {
      ch.classList.add('idle');
    }
  }
  performer = character;
  backstage.classList.add('live');
}


setTimeout(() => {
  sendFront(backstage.children[5]);
}, 500);    