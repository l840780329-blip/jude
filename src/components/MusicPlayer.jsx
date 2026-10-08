import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './MusicPlayer.css';

const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function MusicPlayer({ hidden = false }) {
  const audio = useRef(null);
  const player = useRef(null);
  const cancelAutoStart = useRef(() => {});
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(547.8);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [touchExpanded, setTouchExpanded] = useState(false);
  const [error, setError] = useState('');
  const unfolded = hovered || keyboardFocus || touchExpanded || expanded || Boolean(error);

  useEffect(() => { audio.current.volume = volume; }, [volume]);
  useEffect(() => {
    const media = audio.current;
    let disposed = false;
    let cancelled = false;
    let starting = false;
    const detach = () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    const cancel = () => { cancelled = true; detach(); };
    cancelAutoStart.current = cancel;
    async function start() {
      if (disposed || cancelled || starting || !media.paused) return;
      starting = true;
      try { await media.play(); detach(); }
      catch (failure) {
        if (disposed || cancelled) return;
        if (failure.name === 'NotAllowedError') {
          window.addEventListener('pointerdown', unlock);
          window.addEventListener('keydown', unlock);
        }
      }
      finally { starting = false; }
    }
    function unlock(event) {
      if (!event.isTrusted || player.current?.contains(event.target)) return;
      if (event.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta', 'Escape', 'Tab'].includes(event.key)) return;
      detach();
      start();
    }
    start();
    return () => { disposed = true; cancel(); cancelAutoStart.current = () => {}; media.pause(); };
  }, []);
  useEffect(() => {
    if (!unfolded) return;
    const closeOutside = event => {
      if (!player.current.contains(event.target)) {
        setExpanded(false); setTouchExpanded(false); setKeyboardFocus(false); setHovered(false);
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [unfolded]);

  async function togglePlayback() {
    cancelAutoStart.current();
    if (!unfolded) setTouchExpanded(true);
    if (!audio.current.paused) { audio.current.pause(); return; }
    setPending(true);
    setError('');
    try { await audio.current.play(); }
    catch { setError('播放失败，请重试'); }
    finally { setPending(false); }
  }

  function readDuration() {
    if (Number.isFinite(audio.current.duration) && audio.current.duration > 0) {
      setDuration(audio.current.duration);
      setReady(true);
    }
  }

  return <aside ref={player} className={`music-player${playing ? ' is-playing' : ''}${unfolded ? ' is-unfolded' : ''}${hidden ? ' is-hidden' : ''}`} aria-label="音乐播放器"
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
    onPointerLeave={event => { setHovered(false); if (event.pointerType === 'mouse') setTouchExpanded(false); }}
    onFocus={event => { if (event.target.matches(':focus-visible')) setKeyboardFocus(true); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}
    onKeyDown={event => { if (event.key === 'Escape') { setExpanded(false); setTouchExpanded(false); setKeyboardFocus(false); } }}>
    <audio ref={audio} src="/assets/runaway.m4a" preload="auto" autoPlay loop
      onPlay={() => { cancelAutoStart.current(); setPlaying(true); }} onPause={() => setPlaying(false)}
      onLoadedMetadata={readDuration} onDurationChange={readDuration}
      onTimeUpdate={() => setPosition(audio.current.currentTime)}
      onError={() => { setPlaying(false); setPending(false); setError('音频加载失败，请重试'); }} />
    <div className="music-main">
      <button className="music-play" onClick={togglePlayback} disabled={pending}
        title="音乐播放器 · 移入展开"
        onPointerDown={event => { if (event.pointerType !== 'mouse') setTouchExpanded(true); }}
        aria-label={playing ? '暂停音乐：Runaway' : '播放音乐：Runaway'}>
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <div className="music-details" aria-hidden={!unfolded}>
      <div className="music-track"><strong>Runaway</strong><span>Kanye West · Pusha T</span></div>
      <span className="music-wave" aria-hidden="true"><i /><i /><i /><i /></span>
      <button className="music-volume-button" tabIndex={unfolded ? 0 : -1} aria-label="调整音乐音量" aria-expanded={expanded} aria-controls="music-settings" onClick={() => setExpanded(!expanded)}>
        {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>
      </div>
    </div>
    <input className="music-progress" type="range" min="0" max={duration} step="0.1" value={position} disabled={!ready}
      tabIndex={unfolded ? 0 : -1} aria-hidden={!unfolded} aria-label="音乐播放进度" aria-valuetext={`${formatTime(position)} / ${formatTime(duration)}`}
      style={{ '--progress': `${position / duration * 100}%` }}
      onChange={event => { const next = Number(event.target.value); audio.current.currentTime = next; setPosition(next); }} />
    {expanded && <div className="music-settings" id="music-settings">
      <div className="music-time"><span>{formatTime(position)} / {formatTime(duration)}</span><span>循环播放</span></div>
      <label className="music-volume"><span>音量</span><input type="range" min="0" max="1" step="0.01" value={volume} aria-label="音乐音量" onChange={event => setVolume(Number(event.target.value))} /><span>{Math.round(volume * 100)}%</span></label>
    </div>}
    <span className="music-status" role="status">{error || (pending ? '正在加载音乐…' : '')}</span>
  </aside>;
}
