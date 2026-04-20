import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MiniGameJogos = ({ onWin }) => {
  const canvasRef = useRef(null);
  const [jumpForce, setJumpForce] = useState(6);
  const [moveSpeed, setMoveSpeed] = useState(1.5);
  const [mensagem, setMensagem] = useState("Ajuste os parâmetros e compile o código.");
  const [tentativas, setTentativas] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [ultimaConfig, setUltimaConfig] = useState({ jumpForce: null, moveSpeed: null });

  function getDica() {
    if (jumpForce < 8) return "IARA: 'Tá pulando muito fraco... aumenta um pouco.'";
    if (jumpForce > 17) return "IARA: 'Isso tá mais pra foguete 🤨 diminui um pouco.'";
    if (moveSpeed < 2) return "IARA: 'Sem velocidade não atravessa.'";
    if (moveSpeed > 6) return "IARA: 'Rápido demais. Você perde controle.'";
    return "IARA: 'Tá perto... ajusta um pouco.'";
  }

  useEffect(() => {
    if (!rodando) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let x = 50, y = 150, velocityY = 0, gravity = 0.6, isJumping = false;
    let particles = [];
    const ground = 180, gapStart = 180, gapWidth = 120, playerHeight = 20;
    let running = true;

    function createParticles(px, py) {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: px, y: py,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 30
        });
      }
    }

    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenho do Cenário
      ctx.fillStyle = "#1e1e1e"; // Fundo do canvas
      ctx.fillRect(0,0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#333"; // Chão
      ctx.fillRect(0, ground, canvas.width, 40);
      ctx.clearRect(gapStart, ground, gapWidth, 40); // Buraco

      // Player com rastro/brilho
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00ffcc";
      ctx.fillStyle = "#00ffcc";
      ctx.fillRect(x, y, playerHeight, playerHeight);
      ctx.shadowBlur = 0;

      x += moveSpeed;

      if (x > gapStart - 20 && !isJumping) {
        velocityY = -jumpForce;
        isJumping = true;
        createParticles(x, y + 20);
      }

      velocityY += gravity * 1.1;
      y += velocityY;

      // Colisão solo
      if (y >= ground - playerHeight && (x < gapStart || x > gapStart + gapWidth)) {
        y = ground - playerHeight;
        velocityY = 0;
        isJumping = false;
      }

      // Lógica de Falha
      if (y > canvas.height) {
        running = false;
        setRodando(false);
        const mudou = jumpForce !== ultimaConfig.jumpForce || moveSpeed !== ultimaConfig.moveSpeed;
        if (mudou) {
          setTentativas(t => t + 1);
          setUltimaConfig({ jumpForce, moveSpeed });
          setMensagem(tentativas >= 2 ? "💀 " + getDica() : "💀 Caiu! Ajuste o código.");
        } else {
          setMensagem("💀 Mesmo código, mesmo resultado.");
        }
      }

      // Vitória
      if (x > gapStart + gapWidth + 60) {
        running = false;
        setMensagem("COMPILADO COM SUCESSO!");
        setTimeout(() => onWin?.(), 1500);
      }

      // Partículas
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.life--;
        ctx.fillStyle = `rgba(0, 255, 204, ${p.life / 30})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      particles = particles.filter(p => p.life > 0);

      requestAnimationFrame(loop);
    }
    loop();
  }, [rodando]);

  return (
    <div className="editor-container">
      {/* SEÇÃO DE CÓDIGO */}
      <div className="codigo-section">
        <div className="line-numbers">
          {Array.from({ length: 15 }, (_, i) => i + 1).join("\n")}
        </div>
        <div className="editor-content">
          <p className="comment">// Physics_Engine_v1.0.js</p>
          <p><span className="keyword">function</span> <span className="function">initPlayer</span>() {'{'}</p>
          <div className="indent">
            <p>
              <span className="keyword">var</span> <span className="variable">jumpForce</span> = 
              <input 
                type="number" 
                value={jumpForce} 
                onChange={(e) => setJumpForce(Number(e.target.value))}
                disabled={rodando}
              />;
            </p>
            <p>
              <span className="keyword">var</span> <span className="variable">moveSpeed</span> = 
              <input 
                type="number" 
                value={moveSpeed} 
                onChange={(e) => setMoveSpeed(Number(e.target.value))}
                disabled={rodando}
              />;
            </p>
            <p className="comment">// Todo: Validar impacto do gap</p>
            <p><span className="keyword">return</span> <span className="string">"ready"</span>;</p>
          </div>
          <p>{'}'}</p>
          
          <div className="terminal">
            <p className="terminal-text">{mensagem}</p>
            <p className="terminal-sub">Tentativas: {tentativas}</p>
          </div>
        </div>
      </div>

      {/* SEÇÃO DO JOGO */}
      <div className="jogo-section">
        <div className="preview-label">LIVE_PREVIEW_WINDOW</div>
        <div className="game-preview-box">
          <canvas ref={canvasRef} width={400} height={220} />
        </div>
        
        <button 
          className="btn-run" 
          onClick={() => { setMensagem("Compilando..."); setRodando(true); }}
          disabled={rodando}
        >
          {rodando ? "RUNNING..." : "BUILD & RUN"}
        </button>
      </div>
    </div>
  );
};

export default MiniGameJogos;