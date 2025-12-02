import Dexie from 'dexie'
import { LOG_MESSAGES } from '@/domain/constants'

// Tenta abrir; em caso de erro de versão incompatível, apaga e recria (fallback)
export async function openCatchDB(db: Dexie, err: any) {
  console.error(LOG_MESSAGES.dexie.dexieUtils.openDB.openFail({ method: 'openCatchDB' }), err)

  const isVersionError =
    err &&
    (err.name === 'VersionError' ||
      err.name === 'InvalidStateError' ||
      err.name === 'UpgradeError' ||
      err.name === 'MissingAPIError')

  if (isVersionError) {
    console.warn(LOG_MESSAGES.dexie.dexieUtils.openDB.versionIncompat({ method: 'openCatchDB' }))

    try {
      await Dexie.delete(db.name)

      await db.open()
    } catch (deleteErr) {
      console.error(LOG_MESSAGES.dexie.dexieUtils.openDB.recreateFail({ method: 'openCatchDB' }), deleteErr)

      throw deleteErr
    }
  } else {
    console.error(LOG_MESSAGES.dexie.dexieUtils.openDB.notVersionError({ method: 'openCatchDB' }), err)
    throw err
  }
}
