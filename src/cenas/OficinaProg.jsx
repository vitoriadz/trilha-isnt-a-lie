import { useEffect } from "react";
import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from '../assets/intro/HALL.png'
import '../styles/ofc-programacao.css';

// Cena 1
import CENA1FUNDO from '../assets/programacao/CENA1_FUNDO.png';
import CENA1FALA1 from '../assets/programacao/CENA1_FALA1.png';
import CENA1FALA2 from '../assets/programacao/CENA1_FALA2.png';


// Cena 2
import CENA2FUNDO from '../assets/programacao/CENA2_FUNDO.png';
import CENA2FALA1 from '../assets/programacao/CENA2_FALA1.png';
import CENA2FALA2 from '../assets/programacao/CENA2_FALA2.png';


// Cena 3
import CENA3FALA from '../assets/programacao/CENA3_FALA.png';


// Cena 4 
import CENA4FUNDO from '../assets/programacao/CENA4_fundo.png';
import CENA4FALA1 from '../assets/programacao/CENA4_FALA1.png';
import CENA4FALA2 from '../assets/programacao/CENA4_FALA2.png';

// Cena 5
import CENA5FUNDO from '../assets/programacao/CENA5_FUNDO.png';
import CENA5FALA1 from '../assets/programacao/CENA5_FALA1.png';
import CENA5FALA2 from '../assets/programacao/CENA5_FALA2.png';

// Cena 6
import CENA6FUNDO from '../assets/programacao/CENA6_FUNDO.png';
import CENA6FALA from '../assets/programacao/CENA6_FALA.png';


// import IMAGEM_FINAL from '../assets/programacao/IMAGEM_FINAL.png'

export default function OficinaProgramacao({ cena, setCena, setComputadorAberto, cenaAnim }) {

  useEffect(() => {
    if (cena === "oficina_programacao_final") {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [cena]);

  return (
    <motion.div key="programacao" {...cenaAnim} className="story-container">

      {/* ENTRADA NA OFICINA */}
      {cena === "oficina_programacao" && (
        <>

          <Quadro
            bgImage={CENA1FUNDO}
            baloes={[CENA1FALA1, CENA1FALA2]}
            balaoStyle={[
              {
                marginRight: "2%",
                marginBottom: "15%",
                maxWidth: "250px",
                height: "250px"
              },
              {
                marginLeft: "28%",
                marginBottom: "5%",
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
                height: "270px"
              },
              {
                marginLeft: "30%",
                marginRight: "5%",
                marginBottom: "5%",
                maxWidth: "200px",
                height: "250px"
              }
            ]}
          />

          {/* BOTÕES */}
          <Quadro bgImage={CENA4FUNDO}>
            <div className="botoes-container">
              <button
                className="button-geral"
                onClick={() => setComputadorAberto(true)}
              >
                Que legal, Vamos codar!
              </button>

              <button
                className="button-geral btn-back"
                onClick={() => setCena("corredor")}
              >
                Humm... acho que vou olhar outras oficinas.
              </button>
            </div>
          </Quadro>
        </>
      )}

      {/* FINAL DA OFICINA */}
      {cena === "oficina_programacao_final" && (
        <>
          <Quadro
            bgImage={CENA5FUNDO}
            baloes={[CENA5FALA1, CENA5FALA2]}
            balaoStyle={[
              {
                marginLeft: "1%",
                marginBottom: "25%",
                maxWidth: "250px",
                height: "150px"
              },
              {
                marginLeft: "30%",
                marginRight: "5%",
                marginBottom: "35%",
                maxWidth: "200px",
                height: "150px"
              }
            ]}
          />

          <Quadro
            bgImage={CENA6FUNDO}
            baloes={[CENA6FALA]}
            balaoStyle={[
              {
                marginRight: "50%",
                marginBottom: "15%",
                maxWidth: "250px",
                height: "200px"
              }]}
          >
            <div className="decisao-botoes">
              <button
                className="button-geral"
                onClick={() => setCena("final_ru_prog")}
              >
                Bora pro RU!
              </button>

              <button
                className="button-geral"
                onClick={() => setCena("corredor")}
              >
                Obrigada pelo convite, mas vou ver outras oficinas.
              </button>
            </div>
          </Quadro>
        </>
      )}

        {cena === "final_ru_prog" && (
          <>
           <Quadro bgImage="#000000">
            <div className="decisao-botoes">
              <button className="button-geral-text" onClick={() => setCena("ver_foto_prog")}>
                Você e a Iara vão juntos para o RU e conversam pelo caminho sobre jogos e coisas aleatórias do dia a dia, até que ela vai se aproximando aos poucos, puxando o assunto de um jeito mais pessoal e curioso, com um sorriso leve que muda o clima da conversa sem chamar muita atenção, e quando chegam ao RU ela aproveita um momento mais quieto para mostrar um jogo, dizendo que lembrou de você, mas o jeito como olha e sorri deixa claro que aquilo vai além do jogo, como se fosse só uma forma de continuar a conversa de um jeito mais próximo.
              </button>
              <button className="button-geral" onClick={() => setCena("ver_foto_prog")}>
                Ver Foto 
                </button>
            </div> 
            </Quadro>
          </>
        )}

        {cena === "ver_foto_prog" && (
          <>
           <Quadro bgImage={IMAGEM_FINAL}>
            </Quadro>
             <button className="button-geral" onClick={() => setCena("introducao")}>
                Recomeçar 
                </button>
          </>
        )}

    </motion.div>
  );
}