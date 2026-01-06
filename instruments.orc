0dbfs = 1 ; максимальный уровень сигнала
;giSine глобальная переменная с номером таблицы
; 
giSine ftgen 0, 0, 16384, 10, 1

instr 1
  a oscili 0dbfs*0.5, 440, giSine
  a linenr a, 0.01, p3 - 0.02, 0.01
  outch 1, a
  outch 2, a
endin

