import { z } from 'zod'
import { s } from './_schemas'

// TODO [ENTENDER] este schema é para definir o que é possível fazer a cada hora de cada dia?
export const TimeslotRuleSchema = z.object({
  id: z.string(),

  // se não informado/null = sem restrição
  weekdays: s.weekdaysNullable,

  // se não informado/null = sem restrição
  hours: s.hours,

  // se não informado/null = sem restrição
  weeks: s.weeks,

  // TODO talvez use enum para as tags possíveis
  // filtra por tags presentes em Save/Sheet; espera tags que identificam características, estados ou atributos relevantes para a cena
  requiresTags: z.array(z.string()).optional(),

  // TODO talvez scenePool não seja necessário
  // pool de cenas possíveis nesse timeslot
  scenes: z.array(s.sceneId),
})