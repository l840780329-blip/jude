import { useEffect, useRef, useState } from 'react';
import './HeroLettering.css';

// Highlight positions align with bright metal edges in the supplied PNG.
const highlights = [
  { x: 14.99, y: 22.47, duration: 7.6, delay: -1.2, scale: 1 },
  { x: 27.04, y: 42.25, duration: 10.4, delay: -5.5, scale: 0.7 },
  { x: 47.82, y: 32.36, duration: 8.8, delay: -3.6, scale: 0.85 },
  { x: 61.72, y: 20.67, duration: 11.8, delay: -0.6, scale: 1.1 },
  { x: 84.47, y: 26.97, duration: 9.6, delay: -5.1, scale: 0.75 },
  { x: 96.05, y: 42.25, duration: 12.7, delay: -8.8, scale: 0.85 },
];

export default function HeroLettering({ enabled = true }) {
  const element = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let onScreen = true;
    const sync = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(element.current);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <div ref={element} className="hero-lettering" data-animated={enabled && visible} aria-hidden="true">
    <img className="hero-lettering-image" src="/assets/hero-portfolio-lettering.png" width="1468" height="445" alt="" fetchPriority="high" />
    <svg className="hero-lettering-filters" width="0" height="0" focusable="false">
      <defs>
        <filter id="hero-lettering-contour" x="-8%" y="-12%" width="116%" height="124%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="expanded" />
          <feMorphology in="SourceAlpha" operator="erode" radius="0.8" result="contracted" />
          <feComposite in="expanded" in2="contracted" operator="out" result="contour" />
          <feFlood floodColor="#edf5ff" result="light" />
          <feComposite in="light" in2="contour" operator="in" result="edge" />
          <feGaussianBlur in="edge" stdDeviation="2.4" result="halo" />
          <feMerge><feMergeNode in="halo" /><feMergeNode in="edge" /></feMerge>
        </filter>
      </defs>
    </svg>
    <span className="hero-lettering-shine" />
    <span className="hero-lettering-outline"><img src="/assets/hero-portfolio-lettering.png" width="1468" height="445" alt="" /></span>
    {highlights.map((star, index) => <span className="hero-lettering-glint" key={index} style={{
      left: `${star.x}%`, top: `${star.y}%`,
      '--glint-duration': `${star.duration}s`,
      '--glint-delay': `${star.delay}s`,
      '--glint-scale': star.scale,
    }}><i /></span>)}
  </div>;
}
