import { useState } from 'react'
import Quadro from './Quadro';
import './App.css'

function App() {
  const [cena, setCena] = useState('introducao');

  return (
    <div className="game-wrapper">
      {/* --- CENA 1: QUADRINHOS DE INTRODUÇÃO --- */}
      // ... no seu return
{cena === 'introducao' && (
  <div className="story-container">
    <Quadro bgImage="/lab-fundo.png">
      <h2>O dia começou gelado no SMD...</h2>
    </Quadro>

    <Quadro bgImage="/veterano-vulto.png">
      <h2>Você sente que alguém está te observando.</h2>
    </Quadro>

    <Quadro bgImage="/painel.png">
      <button className="btn-navegar" onClick={() => setCena('corredor')}>
        Ir para o Corredor
      </button>
    </Quadro>

    <Quadro bgImage="/painel.png">
      <button className="btn-navegar" onClick={() => setCena('corredor')}>
        Ir para o Corredor
      </button>
    </Quadro>

    <Quadro bgImage="/painel.png">
      <button className="btn-navegar" onClick={() => setCena('corredor')}>
        Ir para o Corredor
      </button>
    </Quadro>

    <Quadro bgImage="/painel.png">
      <button className="btn-navegar" onClick={() => setCena('corredor')}>
        Ir para o Corredor
      </button>
    </Quadro>
  </div>
)}

      {/* --- CENA 2: CORREDOR (FIXO) --- */}
      {cena === 'corredor' && (
        <div className="cena-corredor-fixa">
          <div className="menu-oficinas">
            <h1>O Corredor dos Laboratórios</h1>
            <p>Escolha seu destino:</p>
            <div className="grid-oficinas">
              <button onClick={() => setCena('oficina_jogos')}>Lab 5: Jogos</button>
              <button onClick={() => setCena('oficina_design')}>Lab 2: Design</button>
              <button onClick={() => setCena('oficina_audiovisual')}>Lab 3: Audiovisual</button>
              <button onClick={() => setCena('oficina_animacao')}>Lab 1: Animação</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CENA 3: OFICINA DE JOGOS --- */}
      {cena === 'oficina_jogos' && (
        <div className="story-container">
          <section className="quadro">
             <h2>Bem-vindo ao Lab de Jogos</h2>
             <button onClick={() => setCena('corredor')}>Voltar</button>
          </section>
          {/* Adicionaremos a lógica do minigame aqui depois */}
        </div>
      )}
    </div>
  )
}

export default App;