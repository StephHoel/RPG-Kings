import Dexie from 'dexie'

// Tenta abrir; em caso de erro de versão incompatível, apaga e recria (fallback)
export async function openCatchDB(db: Dexie, err: any) {
  console.error('Falha ao abrir IndexedDB:', err)

  const isVersionError = err && (err.name === 'VersionError' || err.name === 'InvalidStateError')

  if (isVersionError) {
    console.warn('Incompatibilidade de versão detectada. Deletando e recriando DB como fallback.')

    try {
      await Dexie.delete(db.name)

      await db.open()
    } catch (deleteErr) {
      console.error('Não foi possível recriar o DB:', deleteErr)

      throw deleteErr
    }
  } else {
    console.error('Não é erro de versão:', err)
    throw err
  }
}
