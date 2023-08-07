export default function Home() {
  return (
    <div className="body">
      <header className="justify-between flex m-4">
        <p>King&apos;s Academy</p>

        <nav className="space-x-6">
          <a href="">Home</a>
          <a href="">Home</a>
          <a href="">Home</a>
        </nav>
      </header>

      <main className="py-4 min-h-screen text-center items-center justify-center space-y-8">
        <p className="text-5xl">Bem Vinde!</p>

        <p>
          Este será um site para o jogo de RPG entitulado King&apos;s Academy!
        </p>

        <p>Em breve terá mais informações aqui!</p>
      </main>
    </div>
  )
}
