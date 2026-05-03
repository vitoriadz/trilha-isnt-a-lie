import { motion } from "framer-motion";
import MiniGameJogos from "./minijogos/MiniGameJogos";
import MiniGameDesign from "./minijogos/MiniGameDesign";
import MiniGameProgramacao from "./minijogos/MiniGameProgramacao";
import MiniGameAudiovisual from "./minijogos/MiniGameAudiovisual";

const Modal = ({ isOpen, onClose, onWin, cena }) => {
  if (!isOpen) return null;

  function getTipo() {
    if (cena.includes("jogos")) return "jogos";
    if (cena.includes("design")) return "design";
    if (cena.includes("programacao")) return "programacao";
    if (cena.includes("audiovisual")) return "audiovisual";
    return null;
  }

  const tipo = getTipo();

  function renderTitulo() {
    switch (tipo) {
      case "jogos":
        return "PROJECT_IARA // PHYSICS_MODULE";
      case "design":
        return "LUAN_SKETCH // LOW_FI_PROTOTYPE";
      case "programacao":
        return "EVE_DEV_ENV // DRAW_MODULE";
      case "audiovisual":
        return "THEO_CAM // EXPOSURE_LAB";
      default:
        return "SYSTEM";
    }
  }

  function renderMiniGame() {
    switch (tipo) {
      case "jogos":
        return <MiniGameJogos onWin={onWin} />;
      case "design":
        return <MiniGameDesign onWin={onWin} />;
      case "programacao":
        return <MiniGameProgramacao onWin={onWin} />;
      case "audiovisual":
        return <MiniGameAudiovisual onWin={onWin} />;
      default:
        return null;
    }
  }

  return (
    <motion.div
      className="overlay-pc"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={tipo === "design" ? "folha-papel" : "janela-pc"}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className={`janela-header ${tipo === "audiovisual" ? "only-close" : ""}`}>
          {tipo !== "audiovisual" && (
            <>
              <div className="dots">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>

              <span className="window-title">
                {renderTitulo()}
              </span>
            </>
          )}

          <button className="btn-close-x" onClick={onClose}>✕</button>
        </div>

        {renderMiniGame()}

      </motion.div>
    </motion.div>
  );
};

export default Modal;