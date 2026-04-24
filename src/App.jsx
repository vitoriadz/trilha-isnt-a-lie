import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Estilos
import './styles/corredor.css';
import './styles/quadros.css';
import "./App.css";

// Assets e Componentes
import QUADRO1 from './assets/intro/QUADRO1.png';
import QUADRO2 from './assets/intro/QUADRO2.png';
import QUADRO3 from './assets/intro/QUADRO3.png';
import QUADRO5 from './assets/intro/QUADRO5.png';
import FUNDOQUADRO5 from './assets/intro/fUNDOQUADRO5.png';
import HALL from './assets/intro/HALL.png'
import EVE from './assets/intro/EVE.png';
import LUAN from './assets/intro/LUAN.png';
import IARA from './assets/intro/IARA.png';
import THEO from './assets/intro/THEO.png';
import FALA1QUADRO1 from './assets/intro/FALA1QUADRO1.png';
import FALA2QUADRO1 from './assets/intro/FALA2QUADRO1.png';
import FALASQUADRO2 from './assets/intro/FALASQUADRO2.png';
import FALASQUADRO3 from './assets/intro/FALASQUADRO3.png';
import FALASQUADRO5 from './assets/intro/FALASQUADRO5.png';
import imagemcorredor from './assets/imagemcorredor.jpeg';
import pegadas from './assets/pegadas.png';
import click from "./sounds/click.mp3";
import music from "./sounds/music.mp3";

import Quadro from "./Quadro";
import Modal from "./Modal"; 
import OficinaJogos from "./cenas/OficinaJogos";
import OficinaDesign from "./cenas/OficinaDesign";
import OficinaProgramacao from "./cenas/OficinaProg";
import OficinaAudiovisual from "./cenas/OficinaAudiovisual";

const cenaAnim = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
  transition: { duration: 0.6 }
};

function App() {
  const [cena, setCena] = useState("introducao");
  const [computadorAberto, setComputadorAberto] = useState(false);
  
  // ESTADOS DE SOM SEPARADOS
  const [musicaAtiva, setMusicaAtiva] = useState(true);
  const [efeitosAtivos, setEfeitosAtivos] = useState(true);

  const musicaRef = useRef(null);
  const somPorta = useRef(null);

  // Função para sons de interface (Click)
  const tocarSom = () => {
    if (efeitosAtivos && somPorta.current) {
      somPorta.current.currentTime = 0;
      somPorta.current.play().catch(() => {});
    }
  };

  const mudarCena = (novaCena) => {
    tocarSom(); // Toca o efeito se efeitosAtivos for true
    setCena(novaCena);
  };

  // Efeito para gerenciar a Música de Fundo
  useEffect(() => {
    if (musicaRef.current) {
      musicaRef.current.volume = 0.4;

      if (musicaAtiva) {
        const playPromise = musicaRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Se o navegador bloquear, toca no primeiro clique na tela
            const iniciarAoInteragir = () => {
              if (musicaAtiva) musicaRef.current.play();
              window.removeEventListener("click", iniciarAoInteragir);
            };
            window.addEventListener("click", iniciarAoInteragir);
          });
        }
      } else {
        musicaRef.current.pause();
      }
    }
  }, [musicaAtiva]);

  return (
    <div className="game-wrapper">
      
      {/* BOTÕES DE CONTROLE NO TOPO */}
      <div className="controles-audio">
        <button 
          className="button-geral btn-som" 
          onClick={() => setMusicaAtiva(!musicaAtiva)}
        >
          {musicaAtiva ? "🎵 Música: ON" : "🔇 Música: OFF"}
        </button>
        
        <button 
          className="button-geral btn-som" 
          onClick={() => setEfeitosAtivos(!efeitosAtivos)}
        >
          {efeitosAtivos ? "🖱️ Efeitos: ON" : "🖱️ Efeitos: OFF"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* CENA: INTRODUÇÃO */}
        {cena === "introducao" && (
          <motion.div key="intro" {...cenaAnim} className="story-container">
            <Quadro bgImage={QUADRO1} baloes={[FALA1QUADRO1, FALA2QUADRO1]} balaoStyle={{marginTop:"25%", maxWidth: "800px", height: "350px", gap: "250px" }} />
            <Quadro bgImage={QUADRO2} baloes={[FALASQUADRO2]} balaoStyle={{marginTop:"10%", marginLeft: "35%", maxWidth: "800px",  height: "500px" }}  />
            <Quadro bgImage={QUADRO3} baloes={[FALASQUADRO3]} balaoStyle={{marginTop:"10%",  height: "400px" }} />
            <Quadro bgImage={HALL} baloes={[EVE, IARA, LUAN, THEO]} balaoStyle={{justifyContent: "center", height: "80%" }}></Quadro>
            <Quadro bgImage={QUADRO5} baloes={[FALASQUADRO5]} balaoStyle={{marginLeft: "45%", maxWidth: "600px", height: "250px" }}></Quadro>
            <div className="corredor-container">
            <img src={FUNDOQUADRO5} alt="Corredor" className="corredor-img" />
            <Porta id='porta5' label='Corredor' onClick={() => mudarCena("corredor")} />
            </div>
            </motion.div>)}
           

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

{cena.includes("audiovisual") && (
  <OficinaAudiovisual
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

      <audio 
        ref={musicaRef} 
        src={music} 
        loop 
        preload="auto" 
      />
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