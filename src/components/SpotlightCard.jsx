import { useEffect, useRef } from 'react';
import './SpotlightCard.css';

// Adapted from the user-supplied React Bits SpotlightCard.
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const motion = useRef(null);
  const cancel = () => { cancelAnimationFrame(frame.current); frame.current = 0; };
  useEffect(() => cancel, []);

  const handleMouseMove = e => {
    const card = divRef.current;
    motion.current ??= window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!card || e.pointerType === 'touch' || motion.current.matches) return;
    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${pointer.current.x - rect.left}px`);
      card.style.setProperty('--mouse-y', `${pointer.current.y - rect.top}px`);
    });
  };

  return (
    <div ref={divRef} onPointerMove={handleMouseMove} onPointerLeave={cancel} className={`card-spotlight ${className}`}
      style={{ '--spotlight-color': spotlightColor }}>
      {children}
    </div>
  );
};

export default SpotlightCard;
