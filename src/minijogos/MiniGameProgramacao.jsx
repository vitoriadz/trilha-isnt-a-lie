import { useState } from "react";
import { motion } from "framer-motion";

// SVGs
import kirbyBase from "../assets/Kirby_NoCircle.svg";
import kirbySemCor from "../assets/Kirby_NoFill.svg";
import kirbyColorido from "../assets/Kirby_Finale.svg";

export default function MiniGameProgramacao({ onWin }) {
  const [fase, setFase] = useState(1);
  const [mensagem, setMensagem] = useState(
    "Eve: 'Como podemos completar o Kirby?'"
  );

  const [forma, setForma] = useState(null);
  const [cor, setCor] = useState(null);


  function escolherForma(opcao) {
    if (opcao === "circle") {
      setForma("circle");
      setFase(2);
      setMensagem("Eve: 'Boa! Agora precisamos pintar ele...'");
    } else {
      setMensagem("Eve: 'Hmm... Kirby não tem esse formato 🤔'");
    }
  }

  
  function escolherCor(opcao) {
    if (opcao === "pink") {
      setCor("pink");
      setMensagem("Eve: 'PERFEITO! Kirby completinho 💖'");

      setTimeout(() => {
        onWin();
      }, 1500);
    } else {
      setMensagem("Eve: 'Essa cor não parece muito Kirby...'");
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

          {/* TERMINAL */}
          <div className="terminal">
            <p className="terminal-text">{mensagem}</p>
          </div>

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

        </div>
      </div>

      {/* 🎮 PREVIEW DO KIRBY */}
      <div className="jogo-section">
        <div className="preview-label">LIVE_PREVIEW</div>

        <div className="game-preview-box">
          <div className="kirby-preview">

            <motion.img
              key={getKirbyImage()}
              src={getKirbyImage()}
              alt="Kirby"
              className="kirby-img"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.1 }}
            />

          </div>
        </div>
      </div>

    </div>
  );
}