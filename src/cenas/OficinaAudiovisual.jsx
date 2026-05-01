import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from "../assets/intro/HALL.png";
import '../styles/ofc-audiovisual.css';

export default function OficinaAudiovisual({ cena, setCena, setComputadorAberto, cenaAnim }) {
  return (
    <motion.div key="audiovisual" {...cenaAnim} className="story-container">

      {/* ENTRADA NA OFICINA */}
      {cena === "oficina_audiovisual" && (
        <>
          <Quadro bgImage={fundo}>
            <div className="botoes-container">
              <button 
                className="button-geral"
                onClick={() => setComputadorAberto(true)}
              >
                Usar câmera
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
      {cena === "oficina_audiovisual_final" && (
        <>
          <Quadro bgImage={fundo}>
            <h2>Theo: "Aí. Tá vendo? Esse é o equilíbrio."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Boa. Composição boa, exposição certa."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Audiovisual é sobre o que você decide mostrar."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Se quiser, te explico mais no caminho pro RU..."</h2>

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