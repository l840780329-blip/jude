import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Plus, X, Menu, Copy, Check, Mail, Pause, Play, Layers, Sparkles, Box, ScanLine } from 'lucide-react';
import './styles.css';
import './hero.css';
import GlowCursor from './components/GlowCursor.jsx';
import Grainient from './components/Grainient.jsx';
import BorderGlow from './components/BorderGlow.jsx';
import SpotlightCard from './components/SpotlightCard.jsx';
import Meteors from './components/Meteors.jsx';
import HeroLettering from './components/HeroLettering.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import TechText from './components/TechText.jsx';
import { VisualEffectsContext } from './components/VisualEffectsContext.js';
import { profile, projects, projectCategories, portfolioExtras, asset, imageSize, previewProps } from './content.js';

function Hero({ enabled = true }) {
 const video = useRef(null);
 const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [playing, setPlaying] = useState(!reducedMotion);
 const wantsPlayback = useRef(!reducedMotion);
 const enabledRef = useRef(enabled);
 const syncPlayback = useRef(() => {});
 enabledRef.current = enabled;
 useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion = () => {
   setReducedMotion(preference.matches);
   if (preference.matches) wantsPlayback.current = false;
   syncPlayback.current();
  };
  syncMotion();
  preference.addEventListener('change', syncMotion);
  return () => preference.removeEventListener('change', syncMotion);
 }, []);
 useEffect(() => {
  const media = video.current;
  let onScreen = false;
  const sync = () => {
   if (wantsPlayback.current && onScreen && enabledRef.current && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (media.paused) media.play().catch(() => setPlaying(false));
   } else media.pause();
  };
  syncPlayback.current = sync;
  const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
  observer.observe(media.closest('#home'));
  document.addEventListener('visibilitychange', sync);
  sync();
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); syncPlayback.current = () => {}; media.pause(); };
 }, []);
 useEffect(() => { syncPlayback.current(); }, [enabled]);
 function toggle() {
  wantsPlayback.current = !playing;
  syncPlayback.current();
 }
 return <section className="hero hero-cinematic" id="home" aria-labelledby="hero-title">
  <div className="hero-media"><video ref={video} autoPlay={!reducedMotion} muted loop playsInline poster="/assets/hero-portfolio-poster.jpg?v=ed36594b75ca" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)}><source src="/assets/hero-portfolio-video.mp4?v=ed36594b75ca" type="video/mp4" /></video></div>
  <div className="hero-shade" />
  <div className="hero-composition container">
   <h1 id="hero-title" className="sr-only">李昊哲 · Portfolio · 视觉、AI 与品牌设计作品集</h1>
   <p className="hero-kicker">A CURIOUS MIND. A NEW PERSPECTIVE.</p>
   <HeroLettering enabled={playing && !reducedMotion} />
   <div className="hero-caption">
    <p className="hero-caption-title">让想象，有迹可循。</p>
    <p className="hero-caption-description">李昊哲 · 视觉设计师 / AI 设计师 / 品牌设计师</p>
    <a className="pill hero-work-link" href="#work">查看精选作品<Plus size={16} /></a>
   </div>
  </div>
  <div className="hero-bottom container">
   <span className="hero-footnote">SELECTED WORK & CREATIVE EXPLORATIONS</span>
   <div className="hero-bottom-right">
    <button className="video-control" onClick={toggle} aria-label={playing ? '暂停背景视频' : '播放背景视频'}>{playing ? <Pause size={14} /> : <Play size={14} />}</button>
    <a className="scroll-link" href="#about"><span className="scroll-line" />SCROLL TO DISCOVER</a>
   </div>
  </div>
 </section>;
}
function Header() {
 const [open, setOpen] = useState(false);
 const [floating, setFloating] = useState(false);
 useEffect(() => {
  const hero = document.getElementById('home');
  let frame = 0;
  const syncPosition = () => {
   frame = 0;
   setFloating(hero.getBoundingClientRect().bottom <= 90);
  };
  const schedule = () => {
   if (!frame) frame = window.requestAnimationFrame(syncPosition);
  };
  syncPosition();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  return () => {
   window.removeEventListener('scroll', schedule);
   window.removeEventListener('resize', schedule);
   window.cancelAnimationFrame(frame);
  };
 }, []);
 return <header className={`header cinematic-header${floating ? ' is-floating' : ''}`}><div className="nav container">
  <a className="header-brand" href="#home" aria-label="李昊哲，返回首页"><img className="header-logo" src="/assets/brand-logo.png" width="1041" height="426" alt="李昊哲 Logo" /></a>
  <div className="header-center">
   <span className="header-statement">VISUAL · AI · BRAND DESIGN</span>
   <nav className={open ? 'nav-links is-open' : 'nav-links'} id="hero-navigation" aria-label="主导航">
    <a href="#about" onClick={() => setOpen(false)}>关于我 <sup>01</sup></a>
    <a href="#work" onClick={() => setOpen(false)}>精选作品 <sup>02</sup></a>
    <a href="#expertise" onClick={() => setOpen(false)}>我的优势 <sup>03</sup></a>
   </nav>
  </div>
  <a href="#contact" className="nav-contact">聊聊合作<Plus size={16} /></a>
  <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="hero-navigation" aria-label={open ? '关闭导航' : '打开导航'}>{open ? <X /> : <Menu />}</button>
 </div></header>;
}
function TechLabel({ text, color = '#f1f1f3', interactiveOnly = false }) {
 return <TechText text={text} inline color={color} accentColor="#a6d4ff" reveal="letter" dashLength={3} dashGap={2} strokeWidth={0.8} specks={7} selection labels draggable={false} sweep={!interactiveOnly && text.length > 1} speed={0.7} />;
}
function SectionLabel({number,children}){return <div className="section-label"><span className="section-index">{number}</span>{children}</div>}
function CopyContact({value,label,className=''}){const [status,setStatus]=useState('');const timer=useRef();useEffect(()=>()=>clearTimeout(timer.current),[]);async function copy(){try{await navigator.clipboard.writeText(value);setStatus('已复制');}catch{setStatus('请长按或选中文本复制');}clearTimeout(timer.current);timer.current=setTimeout(()=>setStatus(''),2500);}return <div className={`copy-contact ${className}`}><span>{label}</span><button onClick={copy} aria-label={`复制${label} ${value}`}>{value}{status==='已复制'?<Check size={16}/>:<Copy size={16}/>}</button><span className="copy-status" role="status">{status}</span></div>}
function Career() {
 return <div className="career" id="career" aria-labelledby="career-heading">
  <div className="career-heading"><h3 id="career-heading">工作经历</h3><span>WORK EXPERIENCE / 04</span></div>
  <ol className="career-list">
   {profile.experience.map((item, i) => <li className={`career-row${item.current ? ' is-current' : ''}`} key={item.company}>
    <span className="career-no" aria-hidden="true">{String(profile.experience.length - i).padStart(2, '0')}</span>
    <div className="career-detail">
     <div className="career-header"><div><h4>{item.company}{item.current && <span className="career-current">目前在职</span>}</h4><p className="career-role">{item.role}</p></div><span className="career-dates">{item.dates}</span></div>
     <p className="career-summary">{item.description}</p>
     <ul className="career-highlights">{item.highlights.map(point => <li key={point.title}><strong>{point.title}</strong><span>{point.text}</span></li>)}</ul>
    </div>
   </li>)}
  </ol>
 </div>;
}
function About(){return <section id="about" className="about section container"><SectionLabel number="01">ABOUT ME / 关于我</SectionLabel><div className="about-grid"><div className="portrait-column"><div className="portrait-frame"><img src="/assets/portrait-user.png" alt="李昊哲的个人肖像" loading="lazy" decoding="async"/><span className="portrait-caption">LI HAOZHE / DESIGNER</span></div><div className="about-name"><h3>李昊哲</h3><span>VISUAL · AI · BRAND</span></div><p className="education">{profile.education}</p><CopyContact value={profile.phone} label="微信 / 电话"/><a className="about-email" href={`mailto:${profile.email}`}>{profile.email}<Mail size={15}/></a></div><div className="about-content"><h2><TechLabel text="保持好奇，"/><br/><TechLabel text="让设计多一种可能"/><span className="accent">.</span></h2><p className="about-description">一个有着产品思维的设计师。擅长三维、插画与互联网视觉设计，从用户增长活动到 Web3 品牌传播，关注设计背后的产品逻辑，也相信好的视觉能让体验更有温度。</p><p className="about-description">在抖音精选从 0 到 1 的过程中，持续探索 AI 与视觉设计的结合。把新工具转化为新的表��，让想象落地，也让设计更贴近真实的业务与用户。</p><Career /></div></div><div className="stats"><div><strong><TechLabel interactiveOnly text={String(profile.experience.length).padStart(2,'0')}/><span>家</span></strong><p>高途 / 抖音 / Gate / WasabiCard</p></div><div><strong><TechLabel interactiveOnly text="0"/><span>→</span><TechLabel interactiveOnly text="1"/></strong><p>参与抖音精选 App 成长</p></div><div><strong><TechLabel interactiveOnly text="08"/><span>组</span></strong><p>本次精选项目</p></div><div><strong><TechLabel interactiveOnly text={String(profile.tools.length).padStart(2,'0')}/><span>款</span></strong><p>常用设计与创作工具</p></div></div></section>}
function Work({onSelect}) {
 const [category, setCategory] = useState('全部');
 const [archiveOpen, setArchiveOpen] = useState(false);
 const [bookendsOpen, setBookendsOpen] = useState(false);
 const categories = ['全部', ...projectCategories];
 const shown = projects.filter(p => category === '全部' || p.category === category);
 const totalImages = shown.reduce((count, p) => count + p.pages.length, 0);
 return <section id="work" className="work section"><div className="container">
  <SectionLabel number="02">SELECTED WORK / 作品集</SectionLabel>
  <div className="section-heading"><h2><TechLabel text="让作品，"/><br/><span className="muted"><TechLabel text="替我表达。" color="#787880"/></span></h2><div className="heading-note">从活动体验到品牌表达。<br/>五个方向，完整呈现设计思考与落地。</div></div>
  <div className="work-toolbar"><div className="filters" aria-label="作品分类">{categories.map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={category === c ? 'active' : ''}>{c}<sup>{c === '全部' ? projects.length : projects.filter(p => p.category === c).length}</sup></button>)}</div><span className="toolbar-note">{shown.length} 个项目 · {totalImages} 张作品图</span></div>
  <div className="projects">{shown.map(p => <BorderGlow key={p.id} className="project-frame" edgeSensitivity={30} glowColor="230 80 80" backgroundColor="#101019" borderRadius={24} glowRadius={28} glowIntensity={0.85} coneSpread={25} colors={['#a78bfa', '#5fa8ff', '#67e8f9']} fillOpacity={0.18}><SpotlightCard className="project-spotlight" spotlightColor="rgba(55, 157, 255, 0.2)"><button className="project-card" onClick={() => onSelect(p)} aria-label={`查看项目：${p.title}`}>
   <div className="project-image"><img {...previewProps(p.cover)} {...imageSize(p.cover)} alt={p.title + '主视觉'} loading="lazy" decoding="async" /><span className="project-open"><Plus size={24} /></span><span className="project-index">{String(projects.indexOf(p) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span className="project-count">{p.pages.length} 张作品图</span></div>
   <div className="project-info"><div><p className="project-en">{p.english}</p><h3>{p.title}</h3><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></div><span className="project-category">查看完整作品</span></div>
  </button></SpotlightCard></BorderGlow>)}</div>
  <details className="work-archive" onToggle={event => setArchiveOpen(event.currentTarget.open)}><summary><span>浏览全部作品图 <small>{totalImages} 张 · 按项目顺序展示</small></span><Plus size={20} /></summary><div className="archive-groups">{archiveOpen && shown.map(p => <section className="archive-group" key={p.id}><h3>{p.title}<span>{p.pages.length} 张</span></h3><div className="archive-images">{p.pages.map(n => <figure key={n}><img src={asset(n)} {...imageSize(n)} alt={`${p.title}，作品集第 ${n} 页`} loading="lazy" decoding="async" /><figcaption>{p.chapters.find(ch => ch.pages.includes(n)).title} · {String(p.pages.indexOf(n) + 1).padStart(2, '0')}</figcaption></figure>)}</div></section>)}</div></details>
  <details className="portfolio-bookends" onToggle={event => setBookendsOpen(event.currentTarget.open)}><summary>作品集封面与结束页 <Plus size={16} /></summary><div className="archive-images">{bookendsOpen && portfolioExtras.map(item => <figure key={item.page}><img src={asset(item.page)} {...imageSize(item.page)} alt={item.title} loading="lazy" decoding="async" /><figcaption>{item.title}</figcaption></figure>)}</div></details>
 </div></section>;
}
const skills=[{icon:Layers,title:'视觉与品牌',english:'VISUAL & BRAND',text:'从主视觉到传播体系，将品牌调性转化为一致、有辨识度的视觉语言。',tags:'品牌视觉 / KV 设计 / 活动传播'},{icon:Sparkles,title:'AI 创意探索',english:'AI & IMAGINATION',text:'将 AI 融入创意探索与活动设计，在技术的可能性中寻找更合适的表达。',tags:'AI 辅助创作 / 风格探索 / 视觉优化'},{icon:Box,title:'三维与插画',english:'3D & ILLUSTRATION',text:'用三维场景、材质和插画构建视觉叙事，让平面的想法拥有空间与温度。',tags:'Blender / IP 形象 / 场景设计'},{icon:ScanLine,title:'产品与协作',english:'PRODUCT & COLLABORATION',text:'以产品思维理解业务与用户，结合反馈快速迭代，并推动创意落地。',tags:'产品思维 / 项目 POC / 设计分享'}];
function Expertise(){return <section id="expertise" className="expertise section container"><SectionLabel number="03">MY EXPERTISE / 个人优势</SectionLabel><div className="section-heading"><h2><TechLabel text="不止一种视角，"/><br/><span className="muted"><TechLabel text="不设一种答案。" color="#787880"/></span></h2><p className="heading-note">审美是起点，思考让设计走得更远。</p></div><div className="skill-grid">{skills.map((s,i)=><article key={s.title} className="skill-card"><div className="skill-top"><s.icon size={32} strokeWidth={1.2}/><span>0{i+1}</span></div><p className="skill-en">{s.english}</p><h3>{s.title}</h3><p>{s.text}</p><div className="skill-tags">{s.tags}</div></article>)}</div><div className="tool-row"><span>MY TOOLKIT</span><div>{profile.tools.map(t=><span key={t}>{t}</span>)}</div></div></section>}
function Contact(){return <section id="contact" className="contact"><div className="container"><SectionLabel number="04">LET’S CONNECT / 联系方式</SectionLabel><div className="contact-heading"><p>下一个好想法，从一次对话开始。</p><h2><TechLabel text="LET’S MAKE"/><br/><TechLabel text="SOMETHING "/><span><TechLabel text="MATTER." color="#8c8ea8"/></span></h2></div><div className="contact-details"><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<span className="email-circle"><Mail size={27} strokeWidth={1.3}/></span></a><CopyContact value={profile.phone} label="微信 / 电话"/><a className="pill contact-pill" href={`mailto:${profile.email}?subject=${encodeURIComponent('设计合作咨询')}`}>聊聊你的想法<Plus size={18}/></a></div><footer><a className="wordmark" href="#home">LH<span className="brand-dot">.</span></a><p>© {new Date().getFullYear()} 李昊哲 · 以好奇心，回应每一种可能。</p><a href="#home">返回顶部 <Plus size={14}/></a></footer></div></section>}
function ProjectDialog({project,onClose}) {
 const dialog = useRef();
 useEffect(() => {
  if (!project) return;
  const prior = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  dialog.current.showModal();
  dialog.current.scrollTop = 0;
  return () => { document.body.style.overflow = prior; if (dialog.current?.open) dialog.current.close(); };
 }, [project]);
 return <dialog ref={dialog} className="project-dialog" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="dialog-title">{project && <div className="dialog-inner">
  <div className="dialog-top"><span>{project.client} / {project.pages.length} 张作品图</span><button onClick={onClose} aria-label="关闭项目详情" autoFocus><X size={23} /></button></div>
  <div className="dialog-title"><p className="eyebrow">{project.english}</p><h2 id="dialog-title">{project.title}</h2><p>{project.description}</p><div className="dialog-meta"><span>CLIENT / {project.client}</span><span>ROLE / {project.role}</span></div></div>
  {project.chapters.length > 1 && <nav className="chapter-links" aria-label="项目内容目录">{project.chapters.map((chapter,i) => <button key={chapter.title} onClick={() => document.getElementById(`${project.id}-chapter-${i}`).scrollIntoView({block:'start'})}>{chapter.title}<span>{chapter.pages.length}</span></button>)}</nav>}
  <div className="dialog-gallery">{project.chapters.map((chapter,i) => <section className="gallery-chapter" id={`${project.id}-chapter-${i}`} key={chapter.title}><h3><span>{String(i + 1).padStart(2, '0')}</span>{chapter.title}</h3>{chapter.pages.map(n => <figure key={n}><img src={asset(n)} {...imageSize(n)} alt={`${project.title} · ${chapter.title}，作品集第 ${n} 页`} decoding="async" loading={n === project.pages[0] ? 'eager' : 'lazy'} /><figcaption>{String(project.pages.indexOf(n) + 1).padStart(2, '0')} / {String(project.pages.length).padStart(2, '0')}</figcaption></figure>)}</section>)}</div>
  <button className="pill dialog-close-bottom" onClick={onClose}>返回作品列表<X size={17} /></button>
 </div>}</dialog>;
}
// Modal changes should not rebuild all project cards and static sections.
const MemoHeader = React.memo(Header);
const MemoHero = React.memo(Hero);
const MemoAbout = React.memo(About);
const MemoWork = React.memo(Work);
const MemoExpertise = React.memo(Expertise);
const MemoContact = React.memo(Contact);
function App() {
 const [project, setProject] = useState(null);
 const effectsEnabled = !project;
 return <VisualEffectsContext.Provider value={effectsEnabled}>
  <MemoHeader/>
  <main><MemoHero enabled={effectsEnabled}/><div className="portfolio-body">
   <div className="page-ambient" aria-hidden="true"><div className="page-ambient-stage"><Grainient enabled={effectsEnabled}/></div></div>
   <div className="portfolio-body-content"><MemoAbout/><MemoWork onSelect={setProject}/><MemoExpertise/><MemoContact/></div>
  </div></main>
  <MusicPlayer hidden={Boolean(project)}/><Meteors enabled={effectsEnabled}/><GlowCursor enabled={effectsEnabled}/>
  <ProjectDialog project={project} onClose={() => setProject(null)}/>
  <Analytics />
 </VisualEffectsContext.Provider>;
}

const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<App/>);
