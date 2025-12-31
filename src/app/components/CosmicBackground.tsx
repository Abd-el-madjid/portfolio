import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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
  shooting?: boolean;
  angle?: number;
  speed?: number;
  shootTime?: number;
}

export function CosmicBackground({ isDark = true }: { isDark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [badgeHover, setBadgeHover] = useState(false);

  // Initialize stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = isDark ? 200 : 120;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * document.body.scrollHeight,
          size: isDark
          ? Math.random() * 0.8 + 0.4   // small stars (dark)
          : Math.random() * 2 + 0.5,  // larger stars (light)
          brightness: Math.random() * 0.5 + 0.5,
          speedX: isDark ? (Math.random() - 0.5) * 0.05 : (Math.random() - 0.5) * 0.5,
          speedY: isDark ? (Math.random() - 0.5) * 0.05 : Math.random() * 1 + 0.5,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          shooting: false,
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, [isDark]);

  // Track mouse and scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => (mouseRef.current = { x: e.clientX, y: e.clientY });
    const handleScroll = () => (scrollRef.current = window.scrollY);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, "#0a0e27");
        gradient.addColorStop(0.5, "#1a0b2e");
        gradient.addColorStop(1, "#050510");
      } else {
        gradient.addColorStop(0, "#e0f2fe");
        gradient.addColorStop(0.5, "#bae6fd");
        gradient.addColorStop(1, "#7dd3fc");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Noise
      ctx.globalAlpha = isDark ? 0.03 : 0.02;
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = isDark ? "#fff" : "#000";
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
      }
      ctx.globalAlpha = 1;

      // Draw stars
      stars.forEach((star) => {
        const parallaxX = (mouseRef.current.x / window.innerWidth - 0.5) * star.size * 2;
        const parallaxY = (scrollRef.current / 100) * star.size * 0.5;

        if (isDark) {
          // Dark mode: shooting only on hover/click
          if (star.shooting) {
            star.x += Math.cos(star.angle!) * star.speed!;
            star.y += Math.sin(star.angle!) * star.speed!;
            star.shootTime!--;
            if (star.shootTime! <= 0) star.shooting = false;
          } else {
            // gentle drift
            star.x += star.speedX;
            star.y += star.speedY;
          }
        } else {
          // Light mode: stars fall dynamically unless badge hover
          if (!badgeHover) {
            console.log( "star falling");
            star.x += star.speedX;
            star.y += star.speedY;
          } else {
            console.log( "star falling");

            star.x = star.x;
            star.y = star.y;
            // Optional: make some stars fall inside badge area
            if (Math.random() < 0.05) {
              const badgeWidth = 200; // adjust to your badge size
              const badgeHeight = 100;
              const badgeX = window.innerWidth / 2 - badgeWidth / 2;
              const badgeY = window.innerHeight / 2 - badgeHeight / 2;
              star.x = badgeX + Math.random() * badgeWidth;
              star.y = badgeY + Math.random() * badgeHeight;
              star.speedX = 0;
              star.speedY = Math.random() * 1 + 0.5;
            }
          }
        }

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.3 + 0.7;
        const opacity = star.brightness * pulse;
// from here to the next comment  replace it to get star as mouse shape
        ctx.globalAlpha = opacity * (isDark ? 1 : 0.6);
        ctx.fillStyle = isDark ? "#ffffff" : "#0369a1";
        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y - parallaxY, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.size > 1.5) {
          ctx.globalAlpha = opacity * 0.3 * (isDark ? 1 : 0.4);
          ctx.beginPath();
          ctx.arc(star.x + parallaxX, star.y - parallaxY, star.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
// if u want u can change the stars to be as the mouse shape
//                 if (isDark) {
//           // SVG as string
//           const starSvg = `
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//               <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" fill="white" opacity="0.9"/>
//               <circle cx="12" cy="10" r="8" fill="white" opacity="0.1"/>
//             </svg>
//           `;
          
//           // Convert SVG string to Image
//           const svgImg = new Image();
//           svgImg.src = `data:image/svg+xml;base64,${btoa(starSvg)}`;

//           ctx.globalAlpha = opacity;
//           ctx.drawImage(svgImg, star.x + parallaxX - 12, star.y - parallaxY - 12, 24, 24);
//         }
//  else {
//           // Keep the existing light mode circle logic
//           ctx.globalAlpha = opacity * 0.6;
//           ctx.fillStyle = "#0369a1";
//           ctx.beginPath();
//           ctx.arc(star.x + parallaxX, star.y - parallaxY, star.size, 0, Math.PI * 2);
//           ctx.fill();

//           if (star.size > 1.5) {
//             ctx.globalAlpha = opacity * 0.4;
//             ctx.beginPath();
//             ctx.arc(star.x + parallaxX, star.y - parallaxY, star.size * 2, 0, Math.PI * 2);
//             ctx.fill();
//           }
//         }
//         ctx.globalAlpha = 1;

//       });
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, isDark, badgeHover]);

  // Shooting stars for dark mode on hover/click
  const triggerShootingStars = () => {
    if (!isDark) return;
    const starIndices = new Set<number>();
    while (starIndices.size < 5) starIndices.add(Math.floor(Math.random() * stars.length));

    setStars((prevStars) =>
      prevStars.map((star, index) => {
        if (starIndices.has(index)) {
          return {
            ...star,
            shooting: true,
            angle: Math.random() * Math.PI / 4 + Math.PI / 4,
            speed: Math.random() * 6 + 10,
            shootTime: 60 + Math.floor(Math.random() * 30),
          };
        }
        return star;
      })
    );
  };

  // Badge hover handlers
  const handleBadgeEnter = () => setBadgeHover(true);
  const handleBadgeLeave = () => setBadgeHover(false);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Badge hover/click area */}
      <div
        className="fixed inset-0 -z-10 pointer-events-auto"
        onMouseEnter={() => {
          triggerShootingStars();
          handleBadgeEnter();
        }}
        onClick={triggerShootingStars}
        onMouseLeave={handleBadgeLeave}
      />
    </>
  );
}
