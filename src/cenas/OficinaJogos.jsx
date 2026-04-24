  import { motion } from "framer-motion";
  import Quadro from "../Quadro";
  import fundo from '../assets/labjogos.jpeg'
  import '../styles/ofc-jogos.css';

  export default function OficinaJogos({ cena, setCena, setComputadorAberto, cenaAnim }) {
    return (
      <motion.div key="jogos" {...cenaAnim} className="story-container">
        {cena === "oficina_jogos" && (
          <>
            <Quadro bgImage={fundo}>
              <button className="button-geral" onClick={() => setComputadorAberto(true)}>Jogar</button>
              <button className="button-geral" onClick={() => setCena("corredor")}>Voltar</button>
            </Quadro>
          </>
        )}

        {cena === "oficina_jogos_final" && (
          <>
            <Quadro bgImage={fundo}><h2>IARA: "Nada mal... você manda bem."</h2></Quadro>
            <Quadro bgImage={fundo}>
              <div className="decisao-botoes">
                  <button className="button-geral" onClick={() => setCena("final_ru")}>Ir com Iara</button>
                  <button className="button-geral" onClick={() => setCena("corredor")}>Explorar mais</button>
              </div>
            </Quadro>
          </>
        )}
      </motion.div>
    );
  }