import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Estilos
import './styles/corredor.css';
import './styles/ofc-jogos.css';
import './styles/quadros.css';
import "./App.css";

// Assets e Componentes
import fundo from './assets/imagemexemplo.png';
import imagemcorredor from './assets/imagemcorredor.jpeg';
import pegadas from './assets/pegadas.png';
import click from "./sounds/click.mp3";

import Quadro from "./Quadro";
import Modal from "./Modal"; 

const cenaAnim = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
  transition: { duration: 0.6 }
};

function App() {
  const [cena, setCena] = useState("introducao");
  const [computadorAberto, setComputadorAberto] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);

  const somPorta = useRef(null);
  const musicaFundo = useRef(null);

  const tocarSom = (audioRef) => {
    if (somAtivo && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="game-wrapper">
      {/* Interface de Controle */}
      <button className="button-geral btn-som" onClick={() => setSomAtivo(!somAtivo)}>
        {somAtivo ? "🔊 ON" : "🔈 OFF"}
      </button>

      <AnimatePresence mode="wait">
        
        {/* RENDERIZAÇÃO DE CENAS */}
        {cena === "introducao" && (
          <motion.div key="intro" {...cenaAnim} className="story-container">
            <Quadro bgImage={fundo}><h2>Você acorda em um laboratório...</h2></Quadro>
            <Quadro bgImage={fundo}><h2>Uma presença observa...</h2></Quadro>
            <Quadro bgImage={fundo}>
              <button className="button-geral" onClick={() => setCena("corredor")}>
                Ir para o Corredor
              </button>
            </Quadro>
          </motion.div>
        )}

        {cena === "corredor" && (
          <motion.div key="corredor" {...cenaAnim} className="cena-corredor-fixa">
            <div className="corredor-container">
              <img src={imagemcorredor} alt="Corredor" className="corredor-img" />
              <Porta id="porta1" label="Jogos" onClick={() => { tocarSom(somPorta); setCena("oficina_jogos"); }} />
              <Porta id="porta2" label="Design" onClick={() => { tocarSom(somPorta); setCena("oficina_design"); }} />
              <Porta id="porta3" label="Audiovisual" onClick={() => { tocarSom(somPorta); setCena("oficina_audiovisual"); }} />
              <Porta id="porta4" label="Animação" onClick={() => { tocarSom(somPorta); setCena("oficina_animacao"); }} />
            </div>
          </motion.div>
        )}

        {cena === "oficina_jogos" && (
          <motion.div key="jogos" {...cenaAnim} className="story-container">
            <Quadro bgImage={fundo}><h2>Lab de Jogos</h2></Quadro>
            <Quadro bgImage={fundo}>
              <button className="button-geral" onClick={() => setComputadorAberto(true)}>Jogar</button>
              <button className="button-geral" onClick={() => setCena("corredor")}>Voltar</button>
            </Quadro>
          </motion.div>
        )}

        {cena === "oficina_jogos_final" && (
          <motion.div key="final" {...cenaAnim} className="story-container">
            <Quadro bgImage={fundo}><h2>IARA: "Nada mal... você manda bem."</h2></Quadro>
            <Quadro bgImage={fundo}>
              <button className="button-geral" onClick={() => setCena("final_ru")}>Ir com Iara</button>
            </Quadro>
          </motion.div>
        )}

      </AnimatePresence>

      {/* MODAL DO COMPUTADOR */}
      <AnimatePresence>
        <Modal 
          isOpen={computadorAberto} 
          onClose={() => setComputadorAberto(false)}
          onWin={() => {
            setComputadorAberto(false);
            setCena("oficina_jogos_final");
          }}
        />
      </AnimatePresence>

      <audio ref={somPorta} src={click} preload="auto" />
    </div>
  );
}

// Sub-componente para evitar repetição de código das portas
function Porta({ id, label, onClick }) {
  return (
    <button className={`porta ${id}`} onClick={onClick}>
      <img src={pegadas} alt="" />
      <span className="tooltip">{label}</span>
    </button>
  );
}

export default App;