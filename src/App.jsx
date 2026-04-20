import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Estilos
import './styles/corredor.css';
import './styles/quadros.css';
import "./App.css";

// Assets e Componentes
import fundo from './assets/imagemexemplo.png';
import imagemcorredor from './assets/imagemcorredor.jpeg';
import pegadas from './assets/pegadas.png';
import click from "./sounds/click.mp3";

import Quadro from "./Quadro";
import Modal from "./Modal"; 
import OficinaJogos from "./cenas/OficinaJogos";
import OficinaDesign from "./cenas/OficinaDesign";
import OficinaProgramacao from "./cenas/OficinaProg";


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

 const tocarSom = () => {
    if (somAtivo && somPorta.current) {
      somPorta.current.currentTime = 0;
      somPorta.current.play().catch(() => {});
    }
  };

  const mudarCena = (novaCena) => {
    tocarSom();
    setCena(novaCena);
  };

  return (
    <div className="game-wrapper">
      {/* BOTÃO FIXO: SOM */}
      <button className="button-geral btn-som" onClick={() => setSomAtivo(!somAtivo)}>
        {somAtivo ? "🔊 ON" : "🔈 OFF"}
      </button>

      <AnimatePresence mode="wait">
        
        {/* CENA: INTRODUÇÃO */}
        {cena === "introducao" && (
          <motion.div key="intro" {...cenaAnim} className="story-container">
            <Quadro bgImage={fundo}><h2>Você acorda em um laboratório...</h2></Quadro>
            <Quadro bgImage={fundo}>
              <button className="button-geral" onClick={() => mudarCena("corredor")}>
                Ir para o Corredor
              </button>
            </Quadro>
          </motion.div>
        )}

        {/* CENA: CORREDOR */}
        {cena === "corredor" && (
          <motion.div key="corredor" {...cenaAnim} className="cena-corredor-fixa">
            <div className="corredor-container">
              <img src={imagemcorredor} alt="Corredor" className="corredor-img" />
              <Porta id='porta0' label='Inicio' onClick={() => mudarCena("introducao")} />
              <Porta id="porta1" label="Jogos" onClick={() => mudarCena("oficina_jogos")} />
              <Porta id="porta2" label="Design" onClick={() => mudarCena("oficina_design")} />
              <Porta id="porta3" label="Audiovisual" onClick={() => mudarCena("oficina_audiovisual")} />
              <Porta id="porta4" label="Programação" onClick={() => mudarCena("oficina_programacao")} />
            </div>
          </motion.div>
        )}

        {/* CENAS DAS OFICINAS */}
        {cena.includes("jogos") && (
          <OficinaJogos 
            cena={cena} 
            setCena={setCena} 
            setComputadorAberto={setComputadorAberto} 
            cenaAnim={cenaAnim} 
          />
        )}

        {cena.includes("design") && (
    <OficinaDesign 
      cena={cena} 
      setCena={setCena} 
      setPapelAberto={setComputadorAberto} 
      cenaAnimProp={cenaAnim} 
    />
  )}

  {cena.includes("programacao") && (
  <OficinaProgramacao 
    cena={cena} 
    setCena={setCena} 
    setComputadorAberto={setComputadorAberto} 
    cenaAnim={cenaAnim} 
  />
)}


      </AnimatePresence>

      {/* MODAL PC */}
      <AnimatePresence>
        {computadorAberto && (
          <Modal 
            isOpen={computadorAberto} 
  onClose={() => setComputadorAberto(false)}
  cena={cena} // Passando a cena atual para o modal saber o que exibir
  onWin={() => {
    setComputadorAberto(false);
    setCena(cena + "_final");
  }}
          />
        )}
      </AnimatePresence>

      <audio ref={somPorta} src={click} preload="auto" />
    </div>
  );
}

function Porta({ id, label, onClick }) {
  return (
    <button className={`porta ${id}`} onClick={onClick}>
      <img src={pegadas} alt="" />
      <span className="tooltip">{label}</span>
    </button>
  );
}

export default App;