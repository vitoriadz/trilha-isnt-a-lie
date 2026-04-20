import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const Quadro = ({ children, bgImage }) => {
  const ref = useRef(null);

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
  
  const contentY = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [100, 0, 0, -100]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      className="quadro"
      style={{ opacity: contentOpacity }}
    >

      <motion.div
        className="bg-parallax"
        style={{
          y: bgY,
          backgroundImage: `url(${bgImage})`,
          scale: 1.2 
        }}
      />

      <motion.div
        className="conteudo-quadro"
        style={{ 
          y: contentY,
          scale: contentScale
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Quadro;