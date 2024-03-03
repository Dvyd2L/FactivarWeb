import { Component, OnInit, afterRender } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-smoke',
  template: `
    <div id="smoke-bkg">
      <canvas id="smoke-canvas"></canvas>
    </div>
  `,
  styles: `
  #smoke-bkg {
    position: fixed;
    top: 0;
    z-index: -1;
    height: 100dvh;
    width: 100dvw;

    & > #smoke-canvas {
        opacity: .7;

        [data-bs-theme=dark] & {
            opacity: .4;
        }
    }
  }
  `,
})
export class SmokeComponent implements OnInit {
  constructor() {
    afterRender(() => this.createAnimation());
  }

  ngOnInit() {}

  createAnimation() {
    const NUM_PARTICLES = 50; // Número de partículas
    const canvas = document.getElementById('smoke-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight + 100;
    }

    const particles: Particle[] = [];
    const fps = 60; // Deseado FPS
    const fpsInterval = 1000 / fps; // Intervalo de tiempo entre fotogramas
    let then = Date.now();

    // Carga la textura de humo
    const smokeImage = new Image();
    smokeImage.src = '/assets/images/smoke.webp'; // Asegúrate de que la ruta a la textura sea correcta

    class Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.size = Math.random() * 3000 + 1000; // Ajustar para textura y 'z'
        this.opacity = Math.random() * 0.8; // Opacidad inicial aleatoria
        this.rotation = Math.random() * Math.PI * 2; // Rotación inicial aleatoria
        this.rotationSpeed = Math.random() * 0.002; // Velocidad de rotación
      }

      update() {
        this.rotation += this.rotationSpeed; // Actualizar la rotación
      }

      draw() {
        ctx.save(); // Guardar el estado actual del contexto
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2); // Mover el origen al centro de la partícula
        ctx.rotate(this.rotation); // Rotar
        ctx.globalAlpha = this.opacity; // Opacidad
        ctx.drawImage(
          smokeImage,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size
        ); // Dibujar imagen
        ctx.globalAlpha = 1.0; // Restablecer opacidad
        ctx.restore(); // Restaurar el estado original del contexto
      }
    }

    function init() {
      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(new Particle());
      }
    }

    function handleParticles() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 1) {
          particles.splice(i, 1);
          i--;
          particles.push(new Particle()); // Añadir nueva partícula para mantener el número
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
      }
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight + 100;
    });

    smokeImage.onload = () => {
      init();
      animate();
    };
  }
}