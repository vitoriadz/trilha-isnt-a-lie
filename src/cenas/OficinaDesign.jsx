import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from '../assets/atelie.jpeg'
import '../styles/ofc-design.css';

const cenaAnimDefault = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
  transition: { duration: 0.6 }
};

export default function OficinaDesign({ cena, setCena, setPapelAberto, cenaAnimProp }) {
  return (
    <motion.div {...(cenaAnimProp || cenaAnimDefault)} className="story-container">
      
      {/* SEÇÃO: ENTRADA NA OFICINA */}
      {cena === "oficina_design" && (
        <> 
          <Quadro bgImage={fundo}>
            <div className="botoes-container">
              <button className="button-geral" onClick={() => setPapelAberto(true)}>
                Pegar Papel e Lápis
              </button>
              <button className="button-geral btn-back" onClick={() => setCena("corredor")}>
                Voltar
              </button>
            </div>
          </Quadro>
        </> 
      )}

      {/* SEÇÃO: APÓS VENCER O MINI-GAME */}
      {cena === "oficina_design_final" && (
        <>
          <Quadro bgImage={fundo}>
            <h2>Luan: "Boa! Nome em destaque, descrição abaixo... Hierarquia visual pura. O mais importante aparece primeiro."</h2>
          </Quadro>
          <Quadro bgImage={fundo}>
            <h2>"O layout ficou clean e funcional. Tá com fome? Partiu RU testar essa usabilidade na prática?"</h2>
            <div className="decisao-botoes">
              <button className="button-geral" onClick={() => setCena("final_ru_luan")}>
                Bora pro RU!
              </button>
              <button className="button-geral" onClick={() => setCena("corredor")}>
                Ainda quero ver mais labs
              </button>
            </div>
          </Quadro>
        </>
      )}

    </motion.div>
  );
}