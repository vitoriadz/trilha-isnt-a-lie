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
import HALL from './assets/intro/HALL.png'
import EVE from './assets/intro/EVE.png';
import LUAN from './assets/intro/LUAN.png';
import IARA from './assets/intro/IARA.png';
import THEO from './assets/intro/THEO.png';
import FALA1QUADRO1 from './assets/intro/FALA1QUADRO1.png';
import FALA2QUADRO1 from './assets/intro/FALA2QUADRO1.png';
import FALASQUADRO2 from './assets/intro/FALASQUADRO2.png';
import FALASQUADRO3 from './assets/intro/FALASQUADRO3.png';
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
  const [somAtivo, setSomAtivo] = useState(true);

  const musicaRef = useRef(null);
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

  useEffect(() => {
    if (musicaRef.current) {
      musicaRef.current.volume = 0.4; // Volume em 40% para não abafar os cliques
      if (somAtivo) {
        musicaRef.current.play().catch(() => {
          console.log("O navegador bloqueou o autoplay. O som tocará após o primeiro clique.");
        });
      } else {
        musicaRef.current.pause();
      }
    }
  }, [somAtivo]);

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
            <Quadro bgImage={QUADRO1} baloes={[FALA1QUADRO1, FALA2QUADRO1]} balaoStyle={{marginTop:"25%", maxWidth: "800px", height: "350px", gap: "250px" }} />
            <Quadro bgImage={QUADRO2} baloes={[FALASQUADRO2]} balaoStyle={{marginTop:"10%", marginLeft: "35%", maxWidth: "800px",  height: "500px" }}  />
            <Quadro bgImage={QUADRO3} baloes={[FALASQUADRO3]} balaoStyle={{marginTop:"10%",  height: "400px" }} />
            <Quadro bgImage={HALL} baloes={[EVE, IARA, LUAN, THEO]} balaoStyle={{justifyContent: "center", height: "80%" }}><Porta id='porta5' label='Corredor' onClick={() => mudarCena("corredor")} /></Quadro>
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