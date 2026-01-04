instr 2
    aSig oscili(0dbfs*p4, p5)           ; генератор синусоиды
    aEnv linenr(0.01, 0.5, 0.01)        ; огибающая: атак 0.01, держ 0.5, релиз 0.01
    out aSig * aEnv                      ; умножаем сигнал на огибающую
endin