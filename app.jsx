// app.jsx — Husin's World shell
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sunset",
  "autoRotate": true,
  "music": false
}/*EDITMODE-END*/;

// ──────────────────────────────────────────────────────────────
// MUSIC — Tone.js warm pad loop
function useMusic(initialOn) {
  const [on, setOn] = useState(false);
  const refs = useRef({ initialized: false });

  const toggle = useCallback(async () => {
    if (!window.Tone) return;
    if (!refs.current.initialized) {
      await window.Tone.start();
      const T = window.Tone;
      const reverb = new T.Reverb({ decay: 6, wet: 0.5 }).toDestination();
      const delay = new T.FeedbackDelay({ delayTime: '8n.', feedback: 0.28, wet: 0.22 }).connect(reverb);
      const filter = new T.Filter({ frequency: 1600, type: 'lowpass', rolloff: -12 }).connect(delay);
      const pad = new T.PolySynth(T.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.6, decay: 0.5, sustain: 0.6, release: 2.4 },
        volume: -14
      }).connect(filter);
      const pluck = new T.PluckSynth({
        attackNoise: 0.6, dampening: 2800, resonance: 0.86, volume: -16
      }).connect(delay);
      const bass = new T.MonoSynth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.05, decay: 0.4, sustain: 0.4, release: 1.2 },
        filter: { Q: 2, type: 'lowpass', rolloff: -24 },
        filterEnvelope: { attack: 0.06, decay: 0.3, sustain: 0.4, release: 1, baseFrequency: 120, octaves: 2 },
        volume: -10
      }).connect(reverb);

      const chords = [
        ['A3','C4','E4'], ['F3','A3','C4'],
        ['C4','E4','G4'], ['G3','B3','D4']
      ];
      const bassNotes = ['A2','F2','C2','G2'];
      const arps = [
        ['A4','E4','C5','E4'],
        ['F4','C4','A4','C4'],
        ['C4','G4','E4','G4'],
        ['G4','D4','B4','D4']
      ];
      let bar = 0;
      const chordLoop = new T.Loop((time) => {
        const c = chords[bar % 4];
        pad.triggerAttackRelease(c, '1n', time, 0.6);
        bass.triggerAttackRelease(bassNotes[bar % 4], '1n', time, 0.7);
        bar++;
      }, '1n');
      let step = 0;
      const arpLoop = new T.Loop((time) => {
        const a = arps[Math.floor(step/4) % 4];
        pluck.triggerAttackRelease(a[step % 4], '8n', time, 0.7);
        step++;
      }, '4n');
      T.Transport.bpm.value = 64;
      chordLoop.start(0);
      arpLoop.start('2n');
      refs.current = { initialized: true, T };
    }
    const T = window.Tone;
    if (!on) { T.Transport.start(); setOn(true); }
    else { T.Transport.pause(); setOn(false); }
  }, [on]);
  return [on, toggle];
}

function MusicToggle() {
  const [on, toggle] = useMusic(false);
  return (
    <button className={`music-toggle ${on ? 'on' : ''}`} onClick={toggle} aria-label="Toggle music" title={on ? 'pause warm pad' : 'play warm pad'}>
      <div className="bars"><span></span><span></span><span></span><span></span></div>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
// CLOCK
function NavClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const wib = new Date(utc + 7 * 60 * 60000);
  const hh = String(wib.getHours()).padStart(2,'0');
  const mm = String(wib.getMinutes()).padStart(2,'0');
  return (
    <div className="clock">
      Jakarta · <b>{hh}:{mm}</b> WIB<br/>
      Open to work · Q3 2026
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// TOOLTIP
function Tooltip({ data, x, y }) {
  if (!data) return null;
  return (
    <div className="tooltip visible" style={{ left: x, top: y }}>
      {data.id === 'about' && (
        <div className="ttl-photo"><img src="profile.jpg" alt="" /></div>
      )}
      <div className="ttl-num">{data.num} · {data.id}</div>
      <div className="ttl-title">{data.title.replace(data.em,'')}<em>{data.em}</em></div>
      <div className="ttl-desc">{data.short}</div>
      <div className="ttl-hint"><span className="key">click</span> open detail</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// SOCIAL ICONS
const SocialIcon = ({ name }) => {
  const common = { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round' };
  if (name === 'github') return (
    <svg {...common}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 7.77 5.07 5.07 0 0 0 19.91 4S18.73 3.65 16 5.48a13.38 13.38 0 0 0-7 0C6.27 3.65 5.09 4 5.09 4A5.07 5.07 0 0 0 5 7.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V25"/></svg>
  );
  if (name === 'linkedin') return (
    <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  );
  if (name === 'mail') return (
    <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
  );
  return null;
};

// ──────────────────────────────────────────────────────────────
// PANELS — content per hotspot
function PanelAbout({ data }) {
  return (
    <>
      <div className="ab-grid">
        <div className="ab-left">
          <div className="ab-photo"><img src="profile.jpg" alt="Husin" /></div>
          <p className="ab-bio"><b>{data.lead}</b></p>
          <div className="ab-connect">
            <h5 className="ab-h">Connect</h5>
            <div className="ab-clist">
              {data.connect.map(c => (
                <a key={c.label} href={c.href} className="ab-cbtn" target="_blank" rel="noreferrer">
                  <SocialIcon name={c.icon} />
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ab-right">
          <div className="ab-section">
            <h5 className="ab-h">Experience</h5>
            <div className="tline">
              {data.experience.map((e, i) => (
                <div className="titem" key={i}>
                  <div>
                    <div className="titem-role">{e.role}</div>
                    <div className="titem-org">{e.org}</div>
                  </div>
                  <div className="titem-date">{e.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ab-section">
            <h5 className="ab-h">Education</h5>
            <div className="tline">
              {data.education.map((e, i) => (
                <div className="titem" key={i}>
                  <div>
                    <div className="titem-role">{e.role}</div>
                    <div className="titem-org">{e.org}</div>
                  </div>
                  <div className="titem-date">{e.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PanelProjects({ data }) {
  return (
    <>
      <p className="lead">{data.lead}</p>
      <div className="plist">
        {data.projects.map(p => (
          <div className="pitem" key={p.n}>
            <div className="ptop">
              <span className="pn">{p.n} · {p.role}</span>
              <span className="pyr">{p.y}</span>
            </div>
            <h4>{p.t}<em>{p.em}</em></h4>
            <div className="pcourse">{p.course}</div>
            <div className="pdesc">{p.d}</div>
            <div className="ptags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function PanelSkills({ data }) {
  return (
    <>
      <p className="lead">{data.lead}</p>
      <div className="skg">
        {data.groups.map(g => (
          <div className="skitem" key={g.n}>
            <div className="sktitle">
              <h4>{g.t}</h4>
              <span className="skn">— {g.n}</span>
            </div>
            <div className="sklist">{g.items.map(i => <span key={i}>{i}</span>)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function PanelContact({ data }) {
  return (
    <>
      <p className="lead">{data.lead}</p>
      <div className="clist">
        {data.rows.map(r => (
          <div className="crow" key={r.k}>
            <span className="ck">{r.k}</span>
            <span className="cv">
              {r.href ? <a href={r.href}>{r.v}<span className="arr">→</span></a> : r.v}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function SidePanel({ open, hotspot, onClose }) {
  if (!hotspot) {
    return (
      <>
        <div className="panel-backdrop" onClick={onClose}></div>
        <aside className="panel"></aside>
      </>
    );
  }
  const data = window.WORLD_HOTSPOTS.find(h => h.id === hotspot);
  return (
    <>
      <div className={`panel-backdrop ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`panel ${open ? 'open' : ''}`}>
        <div className="panel-head">
          <div className="label">{data.num} · {data.id}</div>
          <button className="close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <h2>{data.title.replace(data.em,'')}<em>{data.em}</em></h2>
        {hotspot === 'about' && <PanelAbout data={data} />}
        {hotspot === 'projects' && <PanelProjects data={data} />}
        {hotspot === 'skills' && <PanelSkills data={data} />}
        {hotspot === 'contact' && <PanelContact data={data} />}
      </aside>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// MARKERS — bottom strip of region tags
function Markers({ activeId, onPick }) {
  return (
    <div className="markers">
      <div className="label">Regions</div>
      <div className="sep"></div>
      {window.WORLD_HOTSPOTS.map(h => (
        <button
          key={h.id}
          className={`mk ${activeId === h.id ? 'active' : ''}`}
          onClick={() => onPick(h.id)}
        >
          <span className="dot"></span>
          <span className="lbl">{h.num} · {h.id}</span>
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// APP
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = window.WORLD_PALETTES[t.palette] || window.WORLD_PALETTES.sunset;

  const [tooltip, setTooltip] = useState({ data: null, x: 0, y: 0 });
  const [panelId, setPanelId] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const [dragHinted, setDragHinted] = useState(false);

  // apply sky colors to CSS
  useEffect(() => {
    document.body.style.background = `linear-gradient(180deg, ${palette.skyTop} 0%, ${palette.skyBot} 100%)`;
    document.documentElement.style.setProperty('--bg-0', palette.skyTop);
    document.documentElement.style.setProperty('--bg-1', palette.skyBot);
  }, [palette]);

  // Hover
  const handleHover = useCallback((hotspot, x, y) => {
    if (hotspot) {
      setTooltip({ data: hotspot, x, y });
      setDragHinted(true); // also dismiss drag hint
    } else {
      setTooltip({ data: null, x: 0, y: 0 });
    }
  }, []);

  // Select (click)
  const handleSelect = useCallback((hotGroup) => {
    if (!hotGroup) return;
    const id = hotGroup.userData?.hotspot?.id || hotGroup;
    setPanelId(id);
    setPanelOpen(true);
    setFocusId(id);
    setTooltip({ data: null, x: 0, y: 0 });
  }, []);

  // dismiss drag hint after a few seconds anyway
  useEffect(() => {
    const id = setTimeout(() => setDragHinted(true), 4500);
    return () => clearTimeout(id);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setPanelId(null), 500);
    setFocusId(null);
  }, []);

  // Pick from markers / nav
  const pickRegion = useCallback((id) => {
    setPanelId(id);
    setPanelOpen(true);
    setFocusId(id);
  }, []);

  return (
    <>
      <World3D
        palette={palette}
        autoRotate={t.autoRotate}
        onHover={handleHover}
        onSelect={handleSelect}
        focusId={focusId}
      />

      {/* NAV */}
      <nav className="nav">
        <div className="brand">
          Husin's World
          <span className="sub">A 3D Portfolio · vol 01</span>
        </div>
        <div className="nav-links">
          {window.WORLD_HOTSPOTS.map(h => (
            <button
              key={h.id}
              className={panelId === h.id && panelOpen ? 'active' : ''}
              onClick={() => pickRegion(h.id)}
            >
              {h.id}
            </button>
          ))}
        </div>
        <NavClock />
      </nav>

      {/* DRAG HINT */}
      <div className={`drag-hint ${dragHinted ? 'hidden' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 8.5V5a1.5 1.5 0 1 1 3 0v5"/>
          <path d="M11 10V4a1.5 1.5 0 1 1 3 0v7"/>
          <path d="M14 11V5a1.5 1.5 0 1 1 3 0v9"/>
          <path d="M17 11V7a1.5 1.5 0 1 1 3 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-5.5-3.5L5 14"/>
        </svg>
        <div>drag to explore</div>
        <div className="arrows">← →</div>
      </div>

      {/* TOOLTIP */}
      <Tooltip data={tooltip.data} x={tooltip.x} y={tooltip.y} />

      {/* MARKERS */}
      <Markers activeId={panelOpen ? panelId : null} onPick={pickRegion} />

      {/* SIDE PANEL */}
      <SidePanel open={panelOpen} hotspot={panelId} onClose={closePanel} />

      {/* MUSIC */}
      <MusicToggle />

      {/* TWEAKS */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Time of day" />
        <TweakRadio
          label="Mood"
          value={t.palette}
          options={['sunset','morning','dusk']}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSection label="World" />
        <TweakToggle
          label="Auto rotate"
          value={t.autoRotate}
          onChange={(v) => setTweak('autoRotate', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
