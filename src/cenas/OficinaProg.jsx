import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from '../assets/intro/HALL.png'
import '../styles/ofc-programacao.css';

export default function OficinaProgramacao({ cena, setCena, setComputadorAberto, cenaAnim }) {
  return (
    <motion.div key="programacao" {...cenaAnim} className="story-container">

      {/* ENTRADA NA OFICINA */}
      {cena === "oficina_programacao" && (
        <>

          <Quadro bgImage={fundo}>
            <div className="botoes-container">
              <button 
                className="button-geral"
                onClick={() => setComputadorAberto(true)}
              >
                Usar computador
              </button>

              <button 
                className="button-geral btn-back"
                onClick={() => setCena("corredor")}
              >
                Voltar
              </button>
            </div>
          </Quadro>
        </>
      )}

      {/* FINAL DA OFICINA */}
      {cena === "oficina_programacao_final" && (
        <>
          <Quadro bgImage={fundo}>
            <h2>Eve: "Caramba, muito bem! Nem precisou da minha ajuda."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Se você não sabe o que seguir… programação é uma ótima escolha."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"E… bom… a gente ia se ver bastante nas aulas..."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <div className="decisao-botoes">
              <button 
                className="button-geral"
                onClick={() => setCena("final_ru")}
              >
                Bora pro RU!
              </button>

              <button 
                className="button-geral"
                onClick={() => setCena("corredor")}
              >
                 Obrigada pelo convite, mas ainda quero ver mais labs.
              </button>
            </div>
          </Quadro>
        </>
      )}

    </motion.div>
  );
}