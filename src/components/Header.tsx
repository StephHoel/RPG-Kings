export function Header() {
  return (
    <header className='bg-gray-900 text-white shadow-md w-full'>
      <div className='container mx-auto px-4 py-2 text-center justify-between flex'>
        <div className='w-full'></div>
        <h1 className='text-2xl font-bold tracking-wide min-w-fit'>King's Academy</h1>
        <div className='w-full text-right'>
          {/* Olá, {user?.name ?? 'Visitante'}! */}
        </div>
      </div>
    </header>
  )
}
