import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVGs
import kirbyBase from "../assets/minigameprog/Kirby_NoCircle.svg";
import kirbySemCor from "../assets/minigameprog/Kirby_NoFill.svg";
import kirbyColorido from "../assets/minigameprog/Kirby_Finale.svg";
import kirbyColorOverlay from "../assets/minigameprog/kirbyArms.svg";

import CENA3FALA from '../assets/programacao/CENA3_FALA.png';


export default function MiniGameProgramacao({ onWin }) {
  const [fase, setFase] = useState(1);
  const [mostrarBalao, setMostrarBalao] = useState(true);
  const [mensagem, setMensagem] = useState(
    "Como podemos completar o Kirby?"
  );

  const [forma, setForma] = useState(null);
  const [cor, setCor] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBalao(false);
    }, 25000);

    return () => clearTimeout(timer);
  }, []);


  function getOverlayImage() {
    if (cor === "pink") {
      return kirbyColorOverlay;
    }
    return kirbyBase;
  }


  function escolherCor(opcao) {
    if (opcao === "pink") {
      setCor("pink");
      setMensagem("Eve: 'PERFEITO!");

      setTimeout(() => {
        onWin();
      }, 1500);
    } else {
      setMensagem("Essa cor não parece muito Kirby...");
    }
  }

  function escolherForma(opcao) {
    if (opcao === "circle") {
      setForma("circle");
      setFase(2);
      setMensagem("Boa! Agora precisamos pintar ele");
    } else {
      setMensagem("Eita... o Kirby não tem esse formato");
    }
  }


  function getKirbyImage() {

    if (forma && cor === "pink") {
      return kirbyColorido;
    }


    if (forma) {
      return kirbySemCor;
    }


    return kirbyBase;
  }

  return (
    <div className="editor-container">

      <AnimatePresence>
        {mostrarBalao && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="balao-oficina balao-programacao"
          >
            <img src={CENA3FALA} alt="Eve fala" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDITOR */}
      <div className="codigo-section">

        <div className="line-numbers">
          {Array.from({ length: 12 }, (_, i) => i + 1).join("\n")}
        </div>

        <div className="editor-content">

          <p className="comment">// drawKirby.js</p>

          <p>
            <span className="keyword">function</span> drawKirby() {"{"}
          </p>

          <div className="indent">

            {/* FORMA */}
            <p>
              drawShape(
              <span className="code-placeholder">
                {forma ? forma : "???"}
              </span>
              );
            </p>

            {/* COR */}
            {fase >= 2 && (
              <p>
                fill(
                <span className="code-placeholder">
                  {cor ? cor : "???"}
                </span>
                );
              </p>
            )}

          </div>

          <p>{"}"}</p>



          {/* OPÇÕES */}
          {fase === 1 && (
            <div className="options-panel">
              <p>Escolha a forma:</p>

              <button onClick={() => escolherForma("circle")}>circle</button>
              <button onClick={() => escolherForma("square")}>square</button>
              <button onClick={() => escolherForma("triangle")}>triangle</button>
            </div>
          )}

          {fase === 2 && (
            <div className="options-panel">
              <p>Escolha a cor:</p>

              <button onClick={() => escolherCor("blue")}>blue</button>
              <button onClick={() => escolherCor("green")}>green</button>
              <button onClick={() => escolherCor("pink")}>pink</button>
            </div>
          )}

          {/* TERMINAL */}
      <div className="terminal">
        <p className="terminal-text">{mensagem}</p>
      </div>

        </div>
      </div>

      <div className="jogo-section">
        <div className="preview-label">LIVE_PREVIEW</div>

        <div className="game-preview-box">
          <div className="kirby-preview">

            {/* CORPO */}
            {forma && (
              <div
                className="kirby-body"
                style={{
                  backgroundColor: cor === "pink" ? "#F3A5AA" : "#ddd3"
                }}
              />
            )}

            <img
              src={getOverlayImage()}
              alt="Kirby partes"
              className="kirby-overlay"
            />

          </div>
        </div>
      </div>

    </div>
  );
}