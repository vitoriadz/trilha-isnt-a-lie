import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Quadro = ({ children, bgImage }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // FUNDO (parallax principal)
  const bgY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // CONTEÚDO ACOMPANHA O FUNDO
  const contentY = bgY;

  // OPACIDADE DO QUADRO
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.section
      ref={ref}
      className="quadro"
      style={{ opacity }}
    >
      {/* FUNDO PARALLAX */}
      <motion.div
        className="bg-parallax"
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage: `url(${bgImage})`
        }}
      />

      {/* CONTEÚDO */}
      <motion.div
        className="conteudo-quadro"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default Quadro;