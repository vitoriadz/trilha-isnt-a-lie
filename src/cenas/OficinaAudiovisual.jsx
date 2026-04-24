 import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from "../assets/imagemexemplo.png";
import '../styles/ofc-audiovisual.css';

export default function OficinaAudiovisual({ cena, setCena, setComputadorAberto, cenaAnim }) {
  return (
    <motion.div key="audiovisual" {...cenaAnim} className="story-container">

      {/* ENTRADA NA OFICINA */}
      {cena === "oficina_audiovisual" && (
        <>
          <Quadro bgImage={fundo}>
            <h2>Theo: "Ah, boa. Chega mais."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Sou o Theo, trilha de Audiovisual."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"A gente transforma o jeito que as pessoas enxergam o mundo."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>"Hoje você vai colocar a mão nisso aqui."</h2>
          </Quadro>

          <Quadro bgImage={fundo}>
            <h2>
              "A câmera tá no modo manual... vamos mexer na velocidade do obturador."
            </h2>

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
                Ir com Theo
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