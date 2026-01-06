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

instr 2
  a oscili 0dbfs*0.7, 200, giSine

  ; линейная огибающая: атака → спад
  kenv linseg 0, 0.01, .2, p3 - 0.02, 1, 0.01, 0
;kvar linseg startValue,
            ;time1, value1, атака
            ;time2, value2, сустейн
            ;time3, value3, release
  a = a * kenv

  outch 1, a
  outch 2, a
endin


