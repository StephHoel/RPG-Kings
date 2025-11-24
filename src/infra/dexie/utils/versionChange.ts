import Dexie from 'dexie'

// Feche o DB quando uma outra aba requerer atualização de versão
export function versionChange(db: Dexie) {
  // Fecha o banco; a app pode avisar o usuário para recarregar
  try {
    db.close()
  } catch (err) {
    console.error(err)
  }

  // opcional: notificar usuário ou recarregar
  if (typeof window !== 'undefined' && window.location) {
    window.location.reload()
  }
}
