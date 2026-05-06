import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from '../assets/atelie.jpeg';
import { useEffect, useState } from "react";
import '../styles/ofc-design.css';

// Importações de imagens da Cena 1
import CENA1FALA1 from '../assets/design/CENA1FALA1.png';
import CENA1FALA2 from '../assets/design/CENA1FALA2.png';
import CENA1FUNDO from '../assets/design/CENA1FUNDO.png';
import CENA1QUADROMENOR from '../assets/design/CENA1QUADROMENOR.png';

// Importações de imagens da Cena 2
import CENA2JUNTA from '../assets/design/CENA2JUNTA.png';
import CENA2QUADRO1FALA from '../assets/design/CENA2QUADRO1FALA.png';
import CENA2QUADRO2FALA from '../assets/design/CENA2QUADRO2FALA.png';

// Importações de imagens da Cena 3
import CENA3 from '../assets/design/CENA-3.png';
import CENA3FALA1 from '../assets/design/CENA3FALA1.png';
import CENA3FALA2 from '../assets/design/CENA3FALA2.png';
import CENA3FUNDO from '../assets/design/CENA3FUNDO.png';

// Importações de imagens da Cena 4
import CENA4 from '../assets/design/CENA4.png';
import CENA4QUADRO1 from '../assets/design/CENA4QUADRO1.png';
import CENA4FALA2 from '../assets/design/CENA4FALA2.png';
// import CENA4QUADRO2FUNDO from '../assets/design/CENA4QUADRO2F.png';
// import CENA4QUADRO2FUNDO from '../assets/design/CENA4QUADRO2FUNDO.png';

// Importações de imagens da Cena 5
import CENA5FALA1 from '../assets/design/CENA5FALA1.png';
import CENA5FALA2 from '../assets/design/CENA5FALA2.png';
import CENA5FUNDO from '../assets/design/CENA5FUNDO.png';

// Importações de imagens da Cena 6
import CENA6FALA1 from '../assets/design/CENA6FALA1.png';
import CENA6FALA2 from '../assets/design/CENA6FALA2.png';
import CENA6FUNDO from '../assets/design/CENA6FUNDO.png';

// Importações de imagens da Cena 7
// import CENA7 from '../assets/design/CENA7.png';
import CENA7 from '../assets/design/CENA7-1.png';
import CENA7FALA1 from '../assets/design/CENA7FALA1.png';
import CENA7FALA2 from '../assets/design/CENA7FALA2.png';
import CENA7FUNDO from '../assets/design/CENA7FUNDO.png';

// Importações de Cenários Gerais
import CENARIO from '../assets/design/CENARIO.png';
import CENARIO2 from '../assets/design/CENARIO2.png';
import CENARIO3 from '../assets/design/CENARIO3.png';

//import IMAGEM_FINAL from '../assets/design/IMAGEM_FINAL.png'

const cenaAnimDefault = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
  transition: { duration: 0.6 }
};

export default function OficinaDesign({ cena, setCena, setPapelAberto, cenaAnimProp }) {

  useEffect(() => {
  if (cena === "oficina_design_final") {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}, [cena]);

  return (
    <motion.div {...(cenaAnimProp || cenaAnimDefault)} className="story-container">

      {cena === "oficina_design" && (
        <> 
          <Quadro bgImage={CENA1FUNDO} baloes={[CENA1QUADROMENOR, CENA1FALA2, CENA1FALA1]} balaoStyle={[{marginTop: "15%", alignSelf: "flex-start", maxWidth: "350px", height: "300px" }, {maxWidth: "300px", marginTop:"25%", height: "200px", paddingRight: "200px"}, {marginBottom: "30%", maxWidth: "300px", height: "200px"}]} />
          <Quadro bgImage={CENA2JUNTA} baloes={[CENA2QUADRO1FALA, CENA2QUADRO2FALA]} balaoStyle={{marginLeft: "15%", marginTop:"5%", maxWidth: "400px", height: "250px", gap: "250px" }} />
          <Quadro bgImage={CENA3FUNDO} baloes={[CENA3FALA1, CENA3FALA2]} balaoStyle={[{marginTop:"-15%", maxWidth: "400px", height: "200px", gap: "220px" }, {marginTop: "25%", marginLeft: "20%", height: "200px"}]} />
          <Quadro bgImage={CENA3FUNDO}>
            <div className="botoes-container">
              <button className="button-geral" onClick={() => setPapelAberto(true)}>
                Que legal! Vamos nessa.
              </button>
              <button className="button-geral btn-back" onClick={() => setCena("corredor")}>
                Humm... acho que vou olhar outras oficinas antes.
              </button>
            </div>
          </Quadro>
      </>
      )}
      

      {/* SEÇÃO: APÓS VENCER O MINI-GAME */}
      {cena === "oficina_design_final" && (
        <>
          <Quadro bgImage={CENA4} baloes={[CENA4FALA2]} balaoStyle={{marginLeft: "15%", marginTop:"5%", maxWidth: "300px", height: "250px", gap: "250px" }} />
          <Quadro bgImage={CENA5FUNDO} baloes={[CENA5FALA1, CENA5FALA2]} balaoStyle={[{alignSelf: "flex-start", marginLeft: "5%", maxWidth: "300px", height: "300px" }, {marginTop: "30%", marginRight: "10%", maxWidth: "300px", height: "300px" }]} />
          <Quadro bgImage={CENA6FUNDO} baloes={[CENA6FALA1, CENA6FALA2]} balaoStyle={[{alignSelf: "flex-start", maxWidth: "200px", paddingRight: "250px", height: "200px" }, {marginTop: "25%", marginRight: "5%", maxWidth: "300px", height: "300px" }]} />
          <Quadro bgImage={CENA7FUNDO} baloes={[CENA7FALA1, CENA7FALA2]} balaoStyle={{maxWidth: "300px", height: "300px", gap: "250px" }} />
            <Quadro bgImage={CENA7FUNDO}>
            <div className="overlay-final"></div>

            <div className="decisao-botoes">
              <button className="button-geral" onClick={() => setCena("final_ru_design")}>
                Bora pro RU!
              </button>
              <button className="button-geral" onClick={() => setCena("corredor")}>
                Obrigada pelo convite, mas ainda quero ver mais labs.
              </button>
            </div> 
            </Quadro>
        </>
      )}

        {cena === "final_ru_design" && (
          <>
           <Quadro bgImage="#000000">
            <div className="decisao-botoes">
              <button className="button-geral-text" onClick={() => setCena("ver_foto_design")}>
                Você e a Iara vão juntos para o RU e conversam pelo caminho sobre jogos e coisas aleatórias do dia a dia, até que ela vai se aproximando aos poucos, puxando o assunto de um jeito mais pessoal e curioso, com um sorriso leve que muda o clima da conversa sem chamar muita atenção, e quando chegam ao RU ela aproveita um momento mais quieto para mostrar um jogo, dizendo que lembrou de você, mas o jeito como olha e sorri deixa claro que aquilo vai além do jogo, como se fosse só uma forma de continuar a conversa de um jeito mais próximo.
              </button>
              <button className="button-geral" onClick={() => setCena("ver_foto_design")}>
                Ver Foto 
                </button>
            </div> 
            </Quadro>
          </>
        )}

        {cena === "ver_foto_design" && (
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