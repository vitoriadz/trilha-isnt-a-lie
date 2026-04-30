import { motion } from "framer-motion";
import Quadro from "../Quadro";
import fundo from '../assets/atelie.jpeg'
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
import CENA3FALA1 from '../assets/design/CENA3FALA1.png';
import CENA3FALA2 from '../assets/design/CENA3FALA2.png';
import CENA3FUNDO from '../assets/design/CENA3FUNDO.png';

// Importações de imagens da Cena 4
import CENA4QUADRO1 from '../assets/design/CENA4QUADRO1.png';
import CENA4QUADRO2FALA from '../assets/design/CENA4QUADRO2FALA.png';
import CENA4QUADRO2FUNDO from '../assets/design/CENA4QUADRO2FUNDO.png';

// Importações de imagens da Cena 5
import CENA5FALA1 from '../assets/design/CENA5FALA1.png';
import CENA5FALA2 from '../assets/design/CENA5FALA2.png';
import CENA5FUNDO from '../assets/design/CENA5FUNDO.png';

// Importações de imagens da Cena 6
import CENA6FALA1 from '../assets/design/CENA6FALA1.png';
import CENA6FALA2 from '../assets/design/CENA6FALA2.png';
import CENA6FUNDO from '../assets/design/CENA6FUNDO.png';

// Importações de imagens da Cena 7
import CENA7FALA1 from '../assets/design/CENA7FALA1.png';
import CENA7FALA2 from '../assets/design/CENA7FALA2.png';
import CENA7FUNDO from '../assets/design/CENA7FALA2.png';

// Importações de Cenários Gerais
import CENARIO from '../assets/design/CENARIO.png';
import CENARIO2 from '../assets/design/CENARIO2.png';
import CENARIO3 from '../assets/design/CENARIO3.png';

const cenaAnimDefault = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
  transition: { duration: 0.6 }
};

export default function OficinaDesign({ cena, setCena, setPapelAberto, cenaAnimProp }) {
  return (
    <motion.div {...(cenaAnimProp || cenaAnimDefault)} className="story-container">

      {cena === "oficina_design" && (
        <> 
          <Quadro bgImage={CENA1FUNDO} baloes={[CENA1QUADROMENOR]} balaoStyle={{marginTop: "30%", alignSelf: "flex-start", marginRight: "auto", maxWidth: "300px", height: "300px" }} />
          <Quadro bgImage={CENA2JUNTA} baloes={[CENA2QUADRO1FALA, CENA2QUADRO2FALA]} balaoStyle={{marginLeft: "15%", marginTop:"5%", maxWidth: "400px", height: "250px", gap: "250px" }} />
          <Quadro bgImage={CENA3FUNDO} baloes={[CENA3FALA1, CENA3FALA2]} balaoStyle={[{marginTop:"-15%", maxWidth: "400px", height: "200px", gap: "220px" }, {marginTop: "25%", marginLeft: "20%", height: "200px"}]} />
          <Quadro bgImage={CENA3FUNDO}>
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
          <Quadro bgImage={CENA5FUNDO} baloes={[CENA5FALA1, CENA5FALA2]} balaoStyle={[{alignSelf: "flex-start", marginLeft: "5%", maxWidth: "300px", height: "300px" }, {marginTop: "30%", marginRight: "10%", maxWidth: "300px", height: "300px" }]} />
          <Quadro bgImage={CENA6FUNDO} baloes={[CENA6FALA1, CENA6FALA2]} balaoStyle={[{alignSelf: "flex-start", maxWidth: "200px", paddingRight: "250px", height: "200px" }, {marginTop: "25%", marginRight: "5%", maxWidth: "300px", height: "300px" }]} />
          <Quadro bgImage={CENA7FUNDO} baloes={[CENA7FALA1, CENA7FALA2]} balaoStyle={{marginTop: "30%", alignSelf: "flex-start", marginRight: "auto", maxWidth: "300px", height: "300px" }} />
            <div className="decisao-botoes">
              <button className="button-geral" onClick={() => setCena("final_ru_luan")}>
                Bora pro RU!
              </button>
              <button className="button-geral" onClick={() => setCena("corredor")}>
                Ainda quero ver mais labs
              </button>
            </div>
        </>
      )}

    </motion.div>
  );
}