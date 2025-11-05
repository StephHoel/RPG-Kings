import { db } from '@/data/db'
import { milestoneSeed, sceneSeed, seedLogs, timeslotSeed } from '@/data/seed'
import { log } from '@/libs'

export async function seedAllIfEmpty() {
  const [cScenes, cSlots, cMilestones] = await Promise.all([
    db.scenes.count(),
    db.timeslots.count(),
    db.milestones.count(),
  ])

  const needsSeed = (cScenes === 0) || (cSlots === 0) || (cMilestones === 0)

  if (!needsSeed) return

  await db.transaction('rw', db.timeslots, db.scenes, db.milestones, db.logs, async () => {
    if (cSlots === 0) await db.timeslots.bulkAdd(timeslotSeed as any)
    if (cScenes === 0) await db.scenes.bulkAdd(sceneSeed as any)
    if (cMilestones === 0) await db.milestones.bulkAdd(milestoneSeed as any)
    await seedLogs()
  })

  await log('info', 'Seed executada (debug)', { counts: { cScenes, cSlots, cMilestones } })
}
