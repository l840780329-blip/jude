import { useEffect, useRef, useState } from 'react';
import './Meteors.css';

const randomBetween = (min, max) => min + Math.random() * (max - min);
const MAX_METEORS = 6;

export default function Meteors({ enabled = true }) {
  const [meteors, setMeteors] = useState([]);
  const sequence = useRef(0);
  const occupiedLanes = useRef(new Map());

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let disposed = false;
    let previousLane = -1;
    const canAnimate = () => enabled && !motion.matches && !document.hidden;
    const schedule = (delay = randomBetween(650, 1350)) => {
      clearTimeout(timer);
      if (disposed || !canAnimate()) return;
      timer = setTimeout(() => {
        if (!canAnimate()) return;
        const available = Array.from({ length: MAX_METEORS }, (_, lane) => lane)
          .filter(lane => !occupiedLanes.current.has(lane));
        if (!available.length) { schedule(randomBetween(400, 900)); return; }
        // Parallel diagonal lanes prevent paths from crossing or gathering together.
        // Randomize lane order, starting position, speed and the gap between arrivals.
        const distant = available.filter(lane => Math.abs(lane - previousLane) > 1);
        const choices = distant.length ? distant : available;
        const lane = choices[Math.floor(Math.random() * choices.length)];
        previousLane = lane;
        const offset = 0.72 + lane * 0.17 + randomBetween(-0.028, 0.028);
        const x = Math.min(randomBetween(1.015, 1.055), offset + 0.045);
        const y = offset - x;
        const travel = Math.min(x + 0.12, 1.12 - y);
        const dx = -travel * window.innerWidth;
        const dy = travel * window.innerHeight;
        const id = ++sequence.current;
        occupiedLanes.current.set(lane, id);
        setMeteors(current => [...current, {
          id,
          lane,
          style: {
            '--meteor-x': `${x * window.innerWidth}px`,
            '--meteor-y': `${y * window.innerHeight}px`,
            '--meteor-dx': `${dx}px`,
            '--meteor-dy': `${dy}px`,
            '--meteor-angle': `${Math.atan2(-dy, -dx) * 180 / Math.PI}deg`,
            '--meteor-length': `${randomBetween(115, 195)}px`,
            '--meteor-duration': `${randomBetween(5800, 7600)}ms`,
            '--meteor-brightness': randomBetween(0.4, 0.65),
          },
        }]);
        schedule();
      }, delay);
    };
    const sync = () => {
      clearTimeout(timer);
      occupiedLanes.current.clear();
      setMeteors([]);
      previousLane = -1;
      if (canAnimate()) schedule(randomBetween(1200, 2400));
    };
    sync();
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      clearTimeout(timer);
      occupiedLanes.current.clear();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [enabled]);

  const finish = meteor => {
    if (occupiedLanes.current.get(meteor.lane) === meteor.id) occupiedLanes.current.delete(meteor.lane);
    setMeteors(current => current.filter(item => item.id !== meteor.id));
  };

  return <div className="meteors" aria-hidden="true">{enabled && meteors.map(meteor =>
    <span key={meteor.id} className="meteor-star" style={meteor.style} onAnimationEnd={() => finish(meteor)}>
      <span className="meteor-tail" />
    </span>
  )}</div>;
}
