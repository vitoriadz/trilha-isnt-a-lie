import React, { useState, useEffect } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";

export default function MiniGameDesign({ onWin }) {
  const ordemCorreta = ["title", "desc", "price", "icon"];
  
  const [itens, setItens] = useState([
    { id: "price", text: "R$ 1,10", type: "preco", label: "Preço" },
    { id: "desc", text: "Strogonoff de Frango com batata palha", type: "detalhe", label: "Descrição" },
    { id: "icon", text: "ℹ️ Mais informações", type: "info", label: "Metadados" },
    { id: "title", text: "CARDÁPIO DO DIA", type: "titulo", label: "Título" },
  ]);

  const [progresso, setProgresso] = useState(0);
  const [ganhou, setGanhou] = useState(false);

  // Calcula o progresso toda vez que a lista muda
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
    <div className="folha-prototipo">
      <div className="header-game">
        <p className="instrucao-luan">
          Luan: "A hierarquia visual guia o olhar. Ordene do mais importante para o menos importante!"
        </p>
        
        {/* Barra de Progresso */}
        <div className="barra-progresso-container">
          <motion.div 
            className="barra-progresso-fill"
            animate={{ width: `${progresso}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <Reorder.Group axis="y" values={itens} onReorder={setItens} className="lista-drag">
        <AnimatePresence>
          {itens.map((item, index) => {
            const estaCorreto = item.id === ordemCorreta[index];
            
            return (
              <Reorder.Item 
                key={item.id} 
                value={item} 
                className={`item-prototipo ${item.type} ${estaCorreto ? "correto" : "errado"}`}
                whileDrag={{ scale: 1.05, boxShadow: "10px 10px 20px rgba(0,0,0,0.2)" }}
              >
                <div className="item-content">
                  <span className="drag-handle">☰</span>
                  <div className="text-wrapper">
                    <span className="label-tecnica">{item.label}</span>
                    <p className="texto-item">{item.text}</p>
                  </div>
                  {estaCorreto && <motion.span initial={{scale:0}} animate={{scale:1}} className="check-icon">✓</motion.span>}
                </div>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {ganhou && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="feedback-vitoria"
        >
          ✨ Hierarquia Perfeita! O usuário agradece.
        </motion.div>
      )}

      <div className="sketch-footer">Grid System: Ativo | SMD_DESIGN_LAB</div>
    </div>
  );
}