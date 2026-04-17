import { useEffect, useRef, useState } from 'react';

const Quadro = ({ children, bgImage }) => {
  const [visivel, setVisivel] = useState(false);
  const elementoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
        }
      },
      { threshold: 0.3 } // Só ativa quando 30% do quadro aparece
    );

    if (elementoRef.current) observer.observe(elementoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={elementoRef}
      className={`quadro ${visivel ? 'aparecer' : ''}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="conteudo-quadro">
        {children}
      </div>
    </section>
  );
};

export default Quadro;