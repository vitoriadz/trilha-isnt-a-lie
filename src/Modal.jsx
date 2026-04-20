import { motion } from "framer-motion";
import MiniGameJogos from "./MiniGameJogos";

const PCModal = ({ isOpen, onClose, onWin }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="overlay-pc" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="janela-pc"
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
          <span className="window-title">PROJECT_IARA_OS // PHYSICS_MODULE</span>
          <button className="btn-close-x" onClick={onClose}>✕</button>
        </div>

        <MiniGameJogos onWin={onWin} />
      </motion.div>
    </motion.div>
  );
};

export default PCModal;