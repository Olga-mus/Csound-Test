import Csound from 'https://cdn.jsdelivr.net/npm/@csound/browser/+esm';
console.log('Я работаю');

let csound = null;

const btnRed = document.querySelector('.btn--red');
const btnGreen = document.querySelector('.btn--green');
//загружаем файл инструмента
async function loadOrc(url) {
  const responce = await fetch(url);
  console.log('responce', responce);
  if (!responce.ok) throw new Error(`Failed to load ${url}`);
  return await responce.text(); // содержимое instr1
}
async function initCsound() {
  if (csound) return; //если csound уже создан
  csound = await Csound(); //«Создай звуковой движок Csound в браузере и подожди, пока он будет готов»
  await csound.setOption('-odac'); // «Скажи Csound выводить звук в колонки (а не в файл)»
  const orcText = await loadOrc('instruments.orc'); // загружаем файл с инструментом
  await csound.compileOrc(orcText);
  await csound.start();
  console.log('Csound инициализирован');
}

//запуск инструмента

async function playInstr(instrNum) {
  await initCsound(); // гарантирует, что Csound готов
  await csound.readScore(`i ${instrNum} 0 3`);
  console.log('instrNum', instrNum);
}

//привязывам кнопки
btnRed.addEventListener('click', () => {
  playInstr(1);
});

btnGreen.addEventListener('click', () => {
  playInstr(2);
});
