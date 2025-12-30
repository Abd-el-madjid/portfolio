import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
}

export function CosmicBackground({ isDark = true }: { isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Initialize stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = isDark ? 200 : 80;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 2,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.05,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, [isDark]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      if (isDark) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(0.5, '#1a0b2e');
        gradient.addColorStop(1, '#050510');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#e0f2fe');
        gradient.addColorStop(0.5, '#bae6fd');
        gradient.addColorStop(1, '#7dd3fc');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add noise texture
      ctx.globalAlpha = isDark ? 0.03 : 0.02;
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = isDark ? '#fff' : '#000';
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1,
          1
        );
      }
      ctx.globalAlpha = 1;

      // Update and draw stars
      stars.forEach((star, index) => {
        // Parallax effect
        const parallaxX = (mouseRef.current.x / window.innerWidth - 0.5) * star.size * 2;
        const parallaxY = (scrollRef.current / 100) * star.size * 0.5;

        // Drift motion
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < -canvas.height) star.y = canvas.height;
        if (star.y > canvas.height) star.y = -canvas.height;

        // Pulse effect
        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.3 + 0.7;
        const opacity = star.brightness * pulse;

        // Draw star
        ctx.globalAlpha = opacity * (isDark ? 1 : 0.6);
        ctx.fillStyle = isDark ? '#ffffff' : '#0369a1';
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y - parallaxY,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.globalAlpha = opacity * 0.3 * (isDark ? 1 : 0.4);
          ctx.beginPath();
          ctx.arc(
            star.x + parallaxX,
            star.y - parallaxY,
            star.size * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Draw shooting stars
      shootingStars.forEach((shootingStar, index) => {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;

        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        gradient.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(3, 105, 161, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        // Remove if off screen
        if (
          shootingStar.x < 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y < 0 ||
          shootingStar.y > canvas.height
        ) {
          setShootingStars(prev => prev.filter((_, i) => i !== index));
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, shootingStars, isDark]);

  // Trigger shooting stars on interaction
  const triggerShootingStar = () => {
    const angle = Math.random() * Math.PI / 4 + Math.PI / 4; // 45-90 degrees
    const newShootingStar: ShootingStar = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: 0,
      angle,
      speed: Math.random() * 5 + 10,
      length: Math.random() * 50 + 50,
    };
    setShootingStars(prev => [...prev, newShootingStar]);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      {/* Clouds for light mode */}
      {!isDark && (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}
      {/* Trigger for shooting stars */}
      <div
        className="fixed inset-0 -z-10 pointer-events-auto"
        onMouseEnter={triggerShootingStar}
        onClick={triggerShootingStar}
      />
    </>
  );
}
