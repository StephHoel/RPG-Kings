import { log } from '@/libs'

export async function seedLogs() {
  await log('info', 'Seed inicial de logs')
  await log('scene_start', 'Cena de boas-vindas', { seed: 42, saveId: 'save-1', sceneId: 'scene-caminho-predio' })
  await log('roll', 'Rolagem de teste', { d20: 12, mod: +3, saveId: 'save-1', sceneId: 'scene-caminho-predio' })
  await log('milestone_unlock', 'Marcou milestone fake', { milestone: 'milestone-primeiro-passo', saveId: 'save-1' })
  await log('toast', 'Progresso salvo')
  await log('error', 'Falha simulada', { reason: 'simulação' })
}
