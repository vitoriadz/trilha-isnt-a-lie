import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import fundo from './assets/imagemexemplo.png';
import imagemcorredor from './assets/imagemcorredor.jpeg';
import pegadas from './assets/pegadas.png';
import Quadro from "./Quadro";
import MiniGameJogos from "./MiniGameJogos";
import click from "./sounds/click.mp3";
import "./App.css";


function App() {
  const [cena, setCena] = useState("introducao");
  const [computadorAberto, setComputadorAberto] = useState(false);
  const [somAtivo, setSomAtivo] = useState(true);

  const somPorta = useRef(null);
  const musicaFundo = useRef(null);

   const tocarSom = (audioRef) => {
    if (!somAtivo) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (somAtivo) {
      musicaFundo.current?.play().catch(() => {});
    } else {
      musicaFundo.current?.pause();
    }
  }, [somAtivo]);

  const cenaAnim = {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="game-wrapper">
       <button onClick={() => setSomAtivo(!somAtivo)}>
        {somAtivo ? "ON" : "OFF"}
      </button>

      <AnimatePresence mode="wait">

        {/* INTRO */}
        {cena === "introducao" && (
          <motion.div key="intro" {...cenaAnim} className="story-container">

            <Quadro bgImage={fundo}>
              <h2>Você acorda em um laboratório...</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <h2>Uma presença observa...</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <h2>"Escolha um caminho."</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <button onClick={() => setCena("corredor")} className="btn-navegar">
                Ir para o Corredor
              </button>
            </Quadro>

          </motion.div>
        )}

{/*CORREDOR*/}
{cena === "corredor" && (
  <motion.div key="corredor" {...cenaAnim} className="cena-corredor-fixa">
    
    <div className="corredor-container">
      <img src={imagemcorredor} alt="Corredor" className="corredor-img" />

      {/* PORTA 1 */}
      <button className="porta porta1" onClick={() => {tocarSom(somPorta); setCena("oficina_jogos");}}>
        <img src={pegadas} alt="" />
        <span className="tooltip">Jogos</span>
      </button>

      {/* PORTA 2 */}
      <button 
        className="porta porta2"
        onClick={() => {tocarSom(somPorta); setCena("oficina_design");}}
      >
        <img src={pegadas} alt="" />
        <span className="tooltip">Design</span>
      </button>

      {/* PORTA 3 */}
      <button 
        className="porta porta3"
        onClick={() => {tocarSom(somPorta); setCena("oficina_audiovisual");}}
      >
        <img src={pegadas} alt="" />
        <span className="tooltip">Audiovisual</span>
      </button>

      {/* PORTA 4 */}
      <button 
        className="porta porta4"
        onClick={() => {tocarSom(somPorta); setCena("oficina_animacao");}}
      >
        <img src={pegadas} alt="" />
        <span className="tooltip">Animação</span>
      </button>

    </div>

  </motion.div>
)}


        {/* OFICINA JOGOS */}
        {cena === "oficina_jogos" && (
          <motion.div key="jogos" {...cenaAnim} className="story-container">

            <Quadro bgImage={fundo}>
              <h2>Lab de Jogos</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <h2>Máquinas iniciando...</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <button onClick={() => setComputadorAberto(true)}>
                Jogar
              </button>
            </Quadro>

            <Quadro bgImage={fundo}>
              <button onClick={() => setCena("corredor")}>
                Voltar ao Corredor
              </button>
            </Quadro>

          </motion.div>
        )}

        {/* FINAL */}
        {cena === "oficina_jogos_final" && (
          <motion.div key="final" {...cenaAnim} className="story-container">

            <Quadro bgImage={fundo}>
              <h2>Yuri: "Nada mal... você manda bem."</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <h2>"Tô indo pro RU... vem?"</h2>
            </Quadro>

            <Quadro bgImage={fundo}>
              <button onClick={() => setCena("final_ru")}>
                Ir com Yuri
              </button>

              <button onClick={() => setCena("corredor")}>
                Explorar mais
              </button>
            </Quadro>

          </motion.div>
        )}

      </AnimatePresence>

      {/*OVERLAY CORRETO (APENAS UM) */}
      <AnimatePresence>
        {computadorAberto && (
          <motion.div
            className="overlay-pc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="janela-pc"
              initial={{ scale: 0.7, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 100 }}
              transition={{ type: "spring", stiffness: 120 }}
            >

              <MiniGameJogos
                onWin={() => {
                  setComputadorAberto(false);
                  setCena("oficina_jogos_final");
                }}
              />

              <button onClick={() => setComputadorAberto(false)}>
                Fechar
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <audio ref={somPorta} src={click} preload="auto" />
    </div>
  );
}

export default App;