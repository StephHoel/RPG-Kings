export default function Home() {
  return (
    <div className="body">
      <header className="justify-between flex m-6">
        <p>King&apos;s Academy</p>

        <nav className="space-x-6 flex">
          <p className="cursor-pointer hover:text-[#f1db31] hover:font-bold">
            Home
          </p>
          <p className="cursor-pointer hover:text-[#f1db31] hover:font-bold">
            Cadastrar
          </p>
          <p className="cursor-pointer hover:text-[#f1db31] hover:font-bold">
            Entrar
          </p>
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
