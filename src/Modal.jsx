import { motion } from "framer-motion";
import MiniGameJogos from "./minijogos/MiniGameJogos"; 
import MiniGameDesign from "./minijogos/MiniGameDesign";

const Modal = ({ isOpen, onClose, onWin, cena }) => {
  if (!isOpen) return null;

  // Define se é a oficina de jogos ou design
  const isJogos = cena.includes("jogos");
  const isDesign = cena.includes("design");

  return (
    <motion.div 
      className="overlay-pc" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={isDesign ? "folha-papel" : "janela-pc"}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <div className="janela-header">
          <div className="dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <span className="window-title">
            {isJogos ? "PROJECT_IARA_OS // PHYSICS_MODULE" : "LUAN_SKETCH // LOW_FI_PROTOTYPE"}
          </span>
          <button className="btn-close-x" onClick={onClose}>✕</button>
        </div>

        {/* Lógica de Troca de Jogo */}
        {isJogos && <MiniGameJogos onWin={onWin} />}
        {isDesign && <MiniGameDesign onWin={onWin} />}
        
      </motion.div>
    </motion.div>
  );
};

export default Modal;