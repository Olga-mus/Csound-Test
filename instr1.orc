instr 1
;oscili(amplitude, frequency)
;linenr(sig, atk, dur, rel) — линейная огибающая
  out linenr(oscili(0dbfs*p4,p5),0.01,0.5,0.01)
endin
;schedule(instrNum, startTime, duration, ...) — планирование события.
schedule(1,0,1,0.2,A4)

