import React, { useState, useEffect } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import '../styles/ofc-design.css';

// Exemplo de importação do balão
import BALAO_DICA from '../assets/design/CENA4QUADRO1.png';

export default function MiniGameDesign({ onWin }) {
  const ordemCorreta = ["title", "desc", "price", "icon"];
  
  // ESTADO PARA O BALÃO
  const [mostrarBalao, setMostrarBalao] = useState(true);

  const [itens, setItens] = useState([
    { id: "desc", text: "Strogonoff de Frango com batata palha", type: "detalhe", label: "Descrição" },
    { id: "price", text: "R$ 1,10", type: "preco", label: "Preço" },
    { id: "icon", text: "ℹ️ Mais informações", type: "info", label: "Metadados" },
    { id: "title", text: "CARDÁPIO DO DIA", type: "titulo", label: "Título" },
  ]);

  const [progresso, setProgresso] = useState(0);
  const [ganhou, setGanhou] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBalao(false);
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    let acertos = 0;
    itens.forEach((item, index) => {
      if (item.id === ordemCorreta[index]) acertos++;
    });
    
    setProgresso((acertos / ordemCorreta.length) * 100);

    if (acertos === ordemCorreta.length && !ganhou) {
      setGanhou(true);
      setTimeout(onWin, 1500);
    }
  }, [itens]);

  return (
    <div className="folha-prototipo" style={{ position: "relative" }}>
      
      <AnimatePresence>
        {mostrarBalao && (
          <>
            {/* BALÃO 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.2 }}
              className="balao-fora balao-top-right"
            >
              <img src={BALAO_DICA} alt="Dica" style={{ width: "200px" }} />
            </motion.div>

            {/* BALÃO 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.6 }}
              className="balao-fora balao-bottom-left"
            >
              <img src={BALAO_DICA} alt="Dica" style={{ width: "200px" }} />
            </motion.div>

            {/* BALÃO 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 1.0 }}
              className="balao-fora balao-top-left"
            >
              <img src={BALAO_DICA} alt="Dica" style={{ width: "200px" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="header-game">
        <p className="instrucao-luan">
          Luan: "A hierarquia visual guia o olhar. Ordene do mais importante para o menos importante!"
        </p>
        
        <div className="barra-progresso-container">
          <motion.div 
            className="barra-progresso-fill"
            animate={{ width: `${progresso}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <Reorder.Group axis="y" values={itens} onReorder={setItens} className="lista-drag">
        {itens.map((item, index) => {
            const estaCorreto = item.id === ordemCorreta[index];
            return (
              <Reorder.Item key={item.id} value={item} className={`item-prototipo ${item.type} ${estaCorreto ? "correto" : "errado"}`}>
                 <div className="item-content">
                  <span className="drag-handle">☰</span>
                  <div className="text-wrapper">
                    <span className="label-tecnica">{item.label}</span>
                    <p className="texto-item">{item.text}</p>
                  </div>
                  {estaCorreto && <motion.span initial={{scale:0}} animate={{scale:1}} className="check-icon">✓</motion.span>}
                </div>
              </Reorder.Item>
            )
        })}
      </Reorder.Group>

      {ganhou && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="feedback-vitoria">
          ✨ Hierarquia Perfeita! O usuário agradece.
        </motion.div>
      )}

      <div className="sketch-footer">Grid System: Ativo | SMD_DESIGN_LAB</div>
    </div>
  );
}