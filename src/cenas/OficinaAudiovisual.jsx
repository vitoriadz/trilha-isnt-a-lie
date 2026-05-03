import { motion } from "framer-motion";
import Quadro from "../Quadro";
import '../styles/ofc-audiovisual.css';
import { useEffect } from "react";

// Cena 1
import CENA1FUNDO from '../assets/audiovisual/CENA1_FUNDO.png';
import CENA1FALA1 from '../assets/audiovisual/CENA1_FALA1.png';
import CENA1FALA2 from '../assets/audiovisual/CENA1_FALA2.png';


// Cena 2
import CENA2FUNDO from '../assets/audiovisual/CENA2_FUNDO.png';
import CENA2FALA1 from '../assets/audiovisual/CENA2_FALA1.png';
import CENA2FALA2 from '../assets/audiovisual/CENA2_FALA2.png';


// Cena 3
import CENA3FUNDO from '../assets/audiovisual/CENA3_FUNDO.png';
import CENA3FALA1 from '../assets/audiovisual/CENA3_FALA1.png';
import CENA3FALA2 from '../assets/audiovisual/CENA3_FALA2.png';


// Cena 4 
import CENA4FUNDO from '../assets/audiovisual/CENA4_FUNDO.png';
import CENA4FALA1 from '../assets/audiovisual/CENA4_FALA1.png';
import CENA4FALA2 from '../assets/audiovisual/CENA4_FALA2.png';

// Cena 5
import CENA5FUNDO from '../assets/audiovisual/CENA5_FUNDO.png';
import CENA5FALA1 from '../assets/audiovisual/CENA5_FALA1.png';
import CENA5FALA2 from '../assets/audiovisual/CENA5_FALA2.png';

// Cena 6
import CENA6FUNDO from '../assets/audiovisual/CENA6_FUNDO.png';
import CENA6FALA1 from '../assets/audiovisual/CENA6_FALA1.png';
import CENA6FALA2 from '../assets/audiovisual/CENA6_FALA2.png';

// Cena 7
import CENA7FUNDO from '../assets/audiovisual/CENA7_fundo.png';
import CENA7FALA from '../assets/audiovisual/CENA7_fala.png';




export default function OficinaAudiovisual({ cena, setCena, setComputadorAberto, cenaAnim }) {

  useEffect(() => {
    if (cena === "oficina_audiovisual_final") {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [cena]);

  return (
    <motion.div key="audiovisual" {...cenaAnim} className="story-container">

      {/* ========================= */}
      {/* ENTRADA NA OFICINA */}
      {/* ========================= */}
      {cena === "oficina_audiovisual" && (
        <>
          <Quadro
            bgImage={CENA1FUNDO}
            baloes={[CENA1FALA1, CENA1FALA2]}
            balaoStyle={[
              {
                
                marginBottom: "25%",
                maxWidth: "250px",
                height: "200px"
              },
              {
                marginLeft: "30%",
                marginRight: "5%",
                marginBottom: "15%",
                maxWidth: "200px",
                height: "250px"
              }
            ]}
          />

          <Quadro
            bgImage={CENA2FUNDO}
            baloes={[CENA2FALA1, CENA2FALA2]}
            balaoStyle={[
              {
                marginLeft: "5%",
                marginBottom: "25%",
                maxWidth: "250px",
                height: "200px"
              },
              {
                marginLeft: "30%",
                marginRight: "5%",
                maxWidth: "200px",
                height: "250px"
              }
            ]}
          />

          {/* BOTÕES */}
          <Quadro bgImage={CENA3FUNDO}>
            <div className="botoes-container">
              <button
                className="button-geral"
                onClick={() => setComputadorAberto(true)}
              >
                Que legal! Vamos nessa.
              </button>

              <button
                className="button-geral btn-back"
                onClick={() => setCena("corredor")}
              >
                Humm... acho que vou olhar outras oficinas antes.
              </button>
            </div>
          </Quadro>
        </>
      )}

      {/* ========================= */}
      {/* FINAL DA OFICINA */}
      {/* ========================= */}
      {cena === "oficina_audiovisual_final" && (
        <>
          <Quadro
            bgImage={CENA4FUNDO}
            baloes={[CENA4FALA1, CENA4FALA2]}
            balaoStyle={[
              {
                marginRight: "15%",
                marginBottom: "25%",
                maxWidth: "250px",
                height: "200px"
              },
              {
                marginLeft: "15%",
                marginBottom: "5%",
                maxWidth: "200px",
                height: "200px"
              }
            ]}
          />

          <Quadro
            bgImage={CENA5FUNDO}
            baloes={[CENA5FALA1, CENA5FALA2]}
            balaoStyle={[
              {
                marginRight: "20%",
                marginBottom: "15%",
                maxWidth: "200px",
                height: "250px"
              },
              {
                marginLeft: "10%",
                marginBottom: "15%",
                maxWidth: "200px",
                height: "200px"
              }
            ]}
          />

         <Quadro
            bgImage={CENA6FUNDO}
            baloes={[CENA6FALA1, CENA6FALA2]}
            balaoStyle={[
              {
                marginRight: "10%",
                marginBottom: "25%",
                maxWidth: "250px",
                height: "200px"
              },
              {
                marginLeft: "25%",
                marginBottom: "25%",
                maxWidth: "200px",
                height: "250px"
              }
            ]}
          />

          <Quadro bgImage={CENA7FUNDO}
            baloes={[CENA7FALA]}
            balaoStyle={[
              {
                marginRight: "55%",
                marginBottom: "25%",
                maxWidth: "250px",
                height: "150px"
              }]}
            
          >
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