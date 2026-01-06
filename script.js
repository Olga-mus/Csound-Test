import Csound from 'https://cdn.jsdelivr.net/npm/@csound/browser/+esm';
console.log('Я работаю');

let csound = null;
if (Csound) {
  console.log('Csound импортирован', Csound);
}
const btnRed = document.querySelector('.btn--red');
const btnGreen = document.querySelector('.btn--green');

//загружаем файл инструмента
async function loadOrc(url) {
  const responce = await fetch(url);
  console.log('responce', responce);
  if (!responce.ok) throw new Error(`Failed to load ${url}`);
  return await responce.text(); // содержимое instr1
}
//запускаем звук по клику на кнопку
async function handlePlayClick() {
  console.log(csound);
  //if нужен не потому что csound “всегда null”, а чтобы Csound создавался РОВНО ОДИН РАЗ.
  if (!csound) {
    console.log('if csound', csound);
    csound = await Csound(); //«Создай звуковой движок Csound в браузере и подожди, пока он будет готов»
    console.log('compileOrc:', typeof csound.compileOrc);
    console.log('start:', typeof csound.start);
    console.log('scoreEvent:', typeof csound.scoreEvent);
    console.log('readScore:', typeof csound.readScore);
    console.log(Object.keys(csound));
    console.log(csound);
    await csound.setOption('-odac'); // «Скажи Csound выводить звук в колонки (а не в файл)»
    const orcText = await loadOrc('instruments.orc');
    await csound.compileOrc(orcText); // здесь только ORC
    await csound.start();
    console.log('Csound started');
    console.log('Csound создан:', !!csound);
    console.log('compileOrc exists:', typeof csound.compileOrc === 'function');
  }
  await csound.readScore('i 1 0 3'); // запускаем инструмент
}

btnRed.addEventListener('click', handlePlayClick);
