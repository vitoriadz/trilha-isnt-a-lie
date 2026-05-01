  import { motion } from "framer-motion";
  import Quadro from "../Quadro";
  import fundo from '../assets/labjogos.jpeg'
  import '../styles/ofc-jogos.css';
  import { useEffect, useState } from "react";

  // Importações de imagens da Cena 1
  import CENA1FALA from '../assets/jogos/CENA1_FALA.png';
  import CENA1FUNDO from '../assets/jogos/CENA1_FUNDO.png';

  // Importações de imagens da Cena 2
  import CENA2FALA1 from '../assets/jogos/CENA2_FALA1.png';
  import CENA2FALA2 from '../assets/jogos/CENA2_FALA2.png';
  import CENA2FUNDO from '../assets/jogos/CENA2FUNDO.png';

  // Importações de imagens da Cena 3
  import CENA3 from '../assets/jogos/CENA3.png';
  import CENA3FALA from '../assets/jogos/CENA3_FALA.png';
  import CENA3FUNDO from '../assets/jogos/CENA3_FUNDO.png';

  // Importações de imagens da Cena 5
  import CENA5 from '../assets/jogos/CENA5.png';
  import CENA5FALA1 from '../assets/jogos/CENA5_FALA1.png';
  import CENA5FALA2 from '../assets/jogos/CENA5_FALA2.png';
  import CENA5FUNDO from '../assets/jogos/CENA5_FUNDO.png';
 


  export default function OficinaJogos({ cena, setCena, setComputadorAberto, cenaAnim }) {

      useEffect(() => {
  if (cena === "oficina_jogos_final") {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}, [cena]);

    return (
      <motion.div key="jogos" {...cenaAnim} className="story-container">
        {cena === "oficina_jogos" && (
          <>
          <Quadro bgImage={CENA1FUNDO} baloes={[CENA1FALA]} balaoStyle={{marginLeft: "30%", marginTop:"5%", maxWidth: "400px", height: "300px"}} />
          <Quadro bgImage={CENA2FUNDO} baloes={[CENA2FALA1, CENA2FALA2]} balaoStyle={{ alignSelf: "flex-start", marginRight: "15%", marginTop:"5%", maxWidth: "400px", height: "280px", gap: "200px" }} />
          <Quadro bgImage={CENA3FUNDO} baloes={[CENA3FALA]} balaoStyle={{marginRight:"25%",alignSelf: "flex-start", marginTop: "5%", maxWidth: "400px", height: "350px" }} />
          <Quadro bgImage={CENA3}>
            <div className="botoes-container">
              <button className="button-geral" onClick={() => setComputadorAberto(true)}>
                Que legal! Vamos nessa.
              </button>
              <button className="button-geral btn-back" onClick={() => setCena("corredor")}>
                Humm... acho que vou olhar outras oficinas antes.
              </button>
            </div>
          </Quadro>
          </>
        )}

        {cena === "oficina_jogos_final" && (
          <>
           <Quadro bgImage={CENA5FUNDO} baloes={[CENA5FALA1, CENA5FALA2]} balaoStyle={{alignSelf: "flex-start", marginLeft: "20%", maxWidth: "300px", height: "300px", gap: "250px" }} />
            <Quadro bgImage={CENA5}>
            <div className="overlay-final"></div>

            <div className="decisao-botoes">
              <button className="button-geral" onClick={() => setCena("final_ru_luan")}>
                Bora pro RU!
              </button>
              <button className="button-geral" onClick={() => setCena("corredor")}>
                Obrigada pelo convite, mas ainda quero ver mais labs.
              </button>
            </div> 
            </Quadro>
          </>
        )}
      </motion.div>
    );
  }