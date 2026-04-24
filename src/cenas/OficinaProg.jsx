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
            <h2>Eve: "Olha só, que bom te ver nessa oficina..."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"É sempre bom ver uma garota interessada na área da programação!"</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Já que você foi a última que chegou, vamos ser uma dupla."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Aqui no SMD, código também é criatividade..."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Então… espero que goste de desenhar usando código!"</h2>

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
                Ir com Eve
              </button>

              <button 
                className="button-geral"
                onClick={() => setCena("corredor")}
              >
                Explorar mais
              </button>
            </div>
          </Quadro>
        </>
      )}

    </motion.div>
  );
}