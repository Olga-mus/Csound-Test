import Csound from 'https://cdn.jsdelivr.net/npm/@csound/browser/+esm';
const btnRed = document.querySelector('.btn--red');
const btnGreen = document.querySelector('.btn--green');
console.log('btnRed', btnRed);
let csound = null;
//загружаем файл инструмента
async function loadOrc(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return await response.text();
}

async function handlePlayClick() {
  if (!csound) {
    const ctx = new AudioContext(); // создаёт аудио-среду в браузере (генерировать, обрабатывать звуки) объект автоматически готов к работе с Web Audio API.
    console.log('AudioContext state:', ctx.state);

    await ctx.resume(); // гарантирует, что звук не будет заблокирован браузером
    console.log('AudioContext state after resume:', ctx.state);

    csound = await Csound(); //«Создай звуковой движок Csound в браузере и подожди, пока он будет готов» +
    console.log(csound);
    console.log('methods:', Object.keys(csound));
    console.log('ждем csound', csound);

    //await csound.setOption('-+rtaudio=wasm');
    // await csound.setOption('-+rtaudio=web'); // включить WebAudio-драйвер

    await csound.setOption('-odac'); // «Скажи Csound выводить звук в колонки (а не в файл)»
    //await csound.compileOrc(orc); // «Передай Csound текст синтезатора и подготовь его к игре» «Прочитай код синтеза и создай инструменты»

    const orcText = await loadOrc('instr1.orc');
    await csound.compileOrc(orcText); // здесь только ORC
    await csound.start();

    console.log('Csound started');
    console.log(
      'Csound is ready?',
      csound !== null && csound.audioContext !== undefined
    );
    console.log('AudioContext state:', csound.audioContext.state);
  }
  console.log('Sending scoreEvent');
  await csound.scoreEvent('i', [1, 0, 1]); // «Скажи Csound: сыграй инструмент №1 прямо сейчас в течение 1 секунды»
  console.log('ScoreEvent sent');
}

// Привязка обработчика через addEventListener
btnRed.addEventListener('click', handlePlayClick);
