import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cameraImg from "../assets/xicara.jpg";

import CENA3FALA1 from "../assets/audiovisual/CENA3_FALA1.png";
import CENA3FALA2 from "../assets/audiovisual/CENA3_FALA2.png";

export default function MiniGameAudiovisual({ onWin }) {
  const [valor, setValor] = useState(2);
  const [ganhou, setGanhou] = useState(false);
  const [mostrarBaloes, setMostrarBaloes] = useState(true);

  const [mensagem, setMensagem] = useState(
    "Theo: 'Testa os valores e depois confirma o melhor.'"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBaloes(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  function getEstiloImagem() {
    switch (valor) {
      case 0:
        return { filter: "brightness(1.8) blur(4px)" };

      case 1:
        return { filter: "brightness(1) blur(0px)" };

      case 2:
        return { filter: "brightness(0.6) contrast(1.2)" };

      case 3:
        return { filter: "brightness(0.3)" };

      default:
        return {};
    }
  }

  function verificarResposta() {
    if (valor === 1) {
      setMensagem("Theo: 'Perfeito! Exposição equilibrada.'");
      setGanhou(true);

      setTimeout(() => {
        onWin();
      }, 1500);
    } else {
      setMensagem("Theo: 'Hmm... acho que não é bem assim não 🤔'");
    }
  }

  return (
    <div className="camera-container">

      <AnimatePresence>
        {mostrarBaloes && (
          <>
            {/* BALÃO 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              className="balao-oficina balao-top-right"
            >
              <img src={CENA3FALA1} alt="Theo fala 1" />
            </motion.div>

            {/* BALÃO 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.0 }}
              className="balao-oficina balao-bottom-left"
            >
              <img src={CENA3FALA2} alt="Theo fala 2" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="camera-view">
        <motion.img
          src={cameraImg}
          className="camera-image"
          animate={getEstiloImagem()}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="slider-container">
        <span>1/30</span>

        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />

        <span>1/1000</span>
      </div>

      <div className="slider-label">
        {["1/30", "1/125", "1/500", "1/1000"][valor]}
      </div>

      <button
        className="btn-run"
        onClick={verificarResposta}
        disabled={ganhou}
      >
        {ganhou ? "✔ Ajuste correto" : "Confirmar ajuste"}
      </button>

      <div className="terminal">
        <p>{mensagem}</p>
      </div>
    </div>
  );
}