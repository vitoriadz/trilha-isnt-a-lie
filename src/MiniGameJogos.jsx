import { useEffect, useRef, useState } from "react";

const MiniGameJogos = ({ onWin }) => {
  const canvasRef = useRef(null);

  const [jumpForce, setJumpForce] = useState(6);
  const [moveSpeed, setMoveSpeed] = useState(1.5);
  const playerHeight = 20;

  const [mensagem, setMensagem] = useState("Ajuste e rode o código.");
  const [tentativas, setTentativas] = useState(0);
  const [rodando, setRodando] = useState(false);

  const [ultimaConfig, setUltimaConfig] = useState({
    jumpForce: null,
    moveSpeed: null
  });

  function getDica() {
    if (jumpForce < 8) return "Yuri: 'Tá pulando muito fraco... aumenta isso.'";
    if (jumpForce > 18) return "Yuri: 'Isso tá mais pra foguete 🤨 diminui isso.'";
    if (moveSpeed < 2) return "Yuri: 'Sem velocidade não atravessa.'";
    if (moveSpeed > 6) return "Yuri: 'Rápido demais perde controle.'";
    return "Yuri: 'Tá perto... ajusta fino.'";
  }

  useEffect(() => {
    if (!rodando) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let x = 50;
    let y = 150;
    let velocityY = 0;
    let gravity = 0.6;
    let isJumping = false;

    let particles = [];

    const ground = 180;
    const gapStart = 180;
    const gapWidth = 120;

    let running = true;

    function createParticles(px, py, color = "#00ffcc") {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 30,
          color
        });
      }
    }

    function updateParticles() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
      });
      particles = particles.filter(p => p.life > 0);
    }

    function drawParticles() {
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      ctx.globalAlpha = 1;
    }

    function loop() {
      if (!running) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // chão
      ctx.fillStyle = "#444";
      ctx.fillRect(0, 180, canvas.width, 20);

      // buraco
      ctx.clearRect(gapStart, 180, gapWidth, 20);

      // player
      ctx.fillStyle = "#00ffcc";
      ctx.fillRect(x, y, 20, 20);

      x += moveSpeed;

      // pulo automático uma vez
      if (x > gapStart - 20 && !isJumping) {
        velocityY = -jumpForce;
        isJumping = true;
        createParticles(x, y + 20);
      }

      velocityY += gravity * 1.1;
      y += velocityY;

      const groundLevel = ground - playerHeight;

// detecta colisão vindo de cima
if (y >= groundLevel && velocityY >= 0) {
  y = groundLevel;

  // suaviza impacto
  velocityY *= -0.2; // pequeno "quique"

  if (Math.abs(velocityY) < 0.5) {
    velocityY = 0;
    isJumping = false;
  }
}

      // CAIU
      if (x > gapStart && x < gapStart + gapWidth && y >= ground - playerHeight) {
        running = false;
        setRodando(false);

        const mudou =
          jumpForce !== ultimaConfig.jumpForce ||
          moveSpeed !== ultimaConfig.moveSpeed;

        if (mudou) {
          const novas = tentativas + 1;
          setTentativas(novas);
          setUltimaConfig({ jumpForce, moveSpeed });

          if (novas >= 3) {
            setMensagem("💀 " + getDica());
          } else {
            setMensagem("💀 Caiu! Ajusta e tenta de novo.");
          }
        } else {
          setMensagem("💀 Mesmo código, mesmo resultado.");
        }

        return;
      }

      // VITÓRIA
      if (x > gapStart + gapWidth + 50) {
        running = false;
        setMensagem("🔥 Funcionou! Boa!");

        setTimeout(() => {
          onWin && onWin();
        }, 1200);

        return;
      }

      updateParticles();
      drawParticles();

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, [rodando]);

  return (
    <div className="editor-container">

      {/* EDITOR */}
      <div className="editor">
        <pre className="fake-code">
<span className="comment">// physics config</span>

<span className="keyword">var</span> jumpForce =
<input
  type="number"
  value={jumpForce}
  onChange={(e) => setJumpForce(Number(e.target.value))}
/>;

<span className="keyword">var</span> moveSpeed =
<input
  type="number"
  value={moveSpeed}
  onChange={(e) => setMoveSpeed(Number(e.target.value))}
/>;
        </pre>

        <button
          className="btn-run"
          onClick={() => {
            setMensagem("Executando...");
            setRodando(true);
          }}
          disabled={rodando}
        >
          ▶ Rodar código
        </button>

        <p>{mensagem}</p>
        <p>Tentativas: {tentativas}</p>
      </div>

      {/* GAME */}
      <div className="game">
        <canvas ref={canvasRef} width={400} height={220} />
      </div>

    </div>
  );
};

export default MiniGameJogos;