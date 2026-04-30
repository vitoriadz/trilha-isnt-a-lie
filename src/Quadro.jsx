import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect} from "react";

const Quadro = ({ children, bgImage, baloes = [], balaoStyle }) => {
  const ref = useRef(null);
  const containerAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.75, 
      }
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemAnim = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const isArrayStyle = Array.isArray(balaoStyle);
  const containerStyle = isArrayStyle ? {} : balaoStyle;

  return (
    <motion.section ref={ref} className="quadro">
      <motion.div
        className="bg-parallax"
        style={{ y: bgY, backgroundImage: `url(${bgImage})`, zIndex: 1 }}
      />

      <motion.div 
        className="container-baloes-horizontal"
        variants={containerAnim}
        initial="hidden"
        whileInView="show" 
        viewport={{ once: true, amount: 0.5 }} 
        style={{ 
          display: "flex", 
          flexDirection: "row", 
          gap: "0px",          
          zIndex: 10, 
          position: "relative",
          ...containerStyle // Estilo do container
        }}
      >
        {baloes.map((imgBalao, index) => (
          <motion.img 
            key={index}
            src={imgBalao} 
            variants={itemAnim}
            className="img-balao"
            style={{ 
              width: "auto", 
              maxHeight: isMobile ? "45%" : "80%", 
              margin: "-30px",
              // APLICA ESTILO INDIVIDUAL SE FOR ARRAY
              ...(isArrayStyle ? balaoStyle[index] : {}) 
            }} 
          />
        ))}

        <div className="texto-sobre-balao">
          {children}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Quadro;