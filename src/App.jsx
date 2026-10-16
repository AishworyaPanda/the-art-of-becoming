import React from 'react';
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Compass, Lightbulb, Palette, RotateCcw, Sparkles, Sprout, Undo2 } from "lucide-react";

const colors = ["#D9C8ED", "#A98BC5", "#E8BFC5", "#A8BCA5", "#F0DDBB", "#F8F3EB", "#3E3548", "#E7A86E"];


const projects = [
  {
    number: "01",
    title: "Fruit Type & Quality Detection",
    tag: "COMPUTER VISION",
    text: "I explored how deep learning can identify apples, bananas, oranges, and strawberries, and classify them as fresh or rotten. This project helped me learn about image preprocessing, transfer learning, and model development."
  },
  {
    number: "02",
    title: "Crop Disease Detection",
    tag: "AI & IMAGE CLASSIFICATION",
    text: "This project explores how deep learning models can identify crop diseases from leaf images of rice, corn, cotton, and sugarcane. It introduced me to image classification, CNN architectures, transfer learning, and the potential of AI in agriculture."
  },
  {
    number: "03",
    title: "Heat Risk Forecasting",
    tag: "CLIMATE DATA & FORECASTING",
    text: "Using ERA5 climate data, this project aims to forecast temperature, humidity, and wind conditions and translate the forecasts into heat-stress risk information. It connects data analysis and forecasting with a real-world environmental challenge."
  }
];


function SectionLabel({ children }) { return <div className="section-label"><span className="label-dot" />{children}</div>; }
function Mandala({ petalCount, petalColors, onPetalClick }) {
  const petals = useMemo(() => Array.from({ length: petalCount }, (_, i) => ({ angle: (360 / petalCount) * i, d: "M 0,-12 C 23,-42 23,-82 0,-108 C -23,-82 -23,-42 0,-12 Z" })), [petalCount]);
  return <svg className="mandala-svg" viewBox="-155 -155 310 310" role="img" aria-label="Interactive mandala. Select petals to change their colors.">
    <circle r="148" fill="#fffaf4" stroke="#e7d9ca" strokeWidth="1"/><circle r="132" fill="none" stroke="#bda6d1" strokeWidth="1.4"/><circle r="121" fill="none" stroke="#8d70a9" strokeWidth="1.1"/>
    {petals.map((petal,i)=><g key={i} transform={`rotate(${petal.angle})`}><path d={petal.d} fill={petalColors[i] || ["#D9C8ED","#A98BC5","#E8BFC5","#A8BCA5","#F0DDBB"][i%5]} stroke="#755c86" strokeWidth="1.2" strokeLinejoin="round" onClick={()=>onPetalClick(i)} className="mandala-petal"/><circle cx="0" cy="-91" r="3.1" fill="#fffaf4" stroke="#755c86" strokeWidth=".8"/></g>)}
    <circle r="37" fill="#d9c8ed" stroke="#755c86" strokeWidth="1.2"/><circle r="28" fill="#fffaf4" stroke="#a98bc5" strokeWidth="1.5"/><circle r="18" fill="#e8bfc5" stroke="#a98bc5" strokeWidth="1"/>
    {Array.from({length:8},(_,i)=>{const a=Math.PI*2*i/8;return <circle key={i} cx={Math.cos(a)*12} cy={Math.sin(a)*12} r="2.6" fill="#fffaf4"/>})}
  </svg>;
}

function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`flip-project-card ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
      aria-label={`${project.title}. Click to ${
        flipped ? "show the front" : "read the description"
      }.`}
    >
      <span className="flip-project-inner">
        <span className="flip-project-face flip-project-front">
          <span className="flip-project-number">
            {project.number}
          </span>

          <span className="flip-project-tag">
            {project.tag}
          </span>

          <span className="flip-project-title">
            {project.title}
          </span>

          <span className="flip-project-hint">
            Click to discover ↗
          </span>
        </span>

        <span className="flip-project-face flip-project-back">
          <span className="flip-project-number">
            {project.number} / THE STORY
          </span>

          <span className="flip-project-title">
            {project.title}
          </span>

          <span className="flip-project-description">
            {project.text}
          </span>

          <span className="flip-project-hint">
            ↶ Back to front
          </span>
        </span>
      </span>
    </button>
  );
}

export default function App() {
 const [selectedColor,setSelectedColor]=useState(colors[1]),[petalCount,setPetalCount]=useState(12),[petalColors,setPetalColors]=useState({}),[history,setHistory]=useState([]),[showNote,setShowNote]=useState(false);
 const changePetal=(index)=>{setHistory(old=>[...old,petalColors]);setPetalColors(old=>({...old,[index]:selectedColor}));};
 const undo=()=>{if(!history.length)return;setPetalColors(history[history.length-1]);setHistory(old=>old.slice(0,-1));};
 const reset=()=>{setHistory(old=>[...old,petalColors]);setPetalColors({});};
 const changePetals=count=>{setPetalCount(count);setPetalColors({});setHistory([]);};
 return <div className="site-shell">
  <header className="topbar"><a className="brand" href="#home" aria-label="The Art of Becoming home"><span className="brand-mark"><Sprout size={23}/></span><span>The Art of Becoming</span></a>
   <nav className="nav-links" aria-label="Main navigation">
  <a href="#home">Home</a>
  <a href="#story">My Story</a>
  <a href="#explore">What I Explore</a>
  <a href="#create">Create</a>
  <a href="#art">My Art</a>
  <a href="#future">My Next Chapter</a>
</nav></header>
  <main>
   <section className="hero section-wrap" id="home"><div className="hero-copy"><SectionLabel>A PERSONAL JOURNEY THROUGH CREATIVITY & CURIOSITY</SectionLabel>
    <h1>A curious mind.<br/><em>An evolving story.</em><br/>A future I'm creating.</h1>
    <p className="hero-description">I find joy in creating, whether it's bringing a mandala to life with colors or turning an idea into something meaningful. I'm curious about how things work, excited by unfamiliar challenges, and always looking for something new to learn. This is where my love for art meets my journey through technology, and where I share the person I am becoming.</p>
    <div className="hero-actions"><a className="button button-dark" href="#story">Discover my story <ArrowDown size={16}/></a><a className="button button-light" href="#create">Explore my world <ArrowUpRight size={16}/></a></div>
    <div className="hero-footnote"><span className="tiny-star">✳</span> Made with curiosity, still becoming.</div></div>
    <div className="hero-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="hero-flower flower-one">✿</div><div className="hero-flower flower-two">✳</div>
     <div className="sticky-note note-one">make time<br/>for wonder ✿</div><div className="sticky-note note-two">breathe in<br/>possibility ♡</div>
     <div className="mandala-frame"><Mandala petalCount={12} petalColors={{}} onPetalClick={()=>document.querySelector("#create")?.scrollIntoView({behavior:"smooth"})}/></div><div className="orbit-caption">CREATIVITY IS A WAY OF SEEING</div></div>
   </section>
   <section className="story section-wrap" id="story"><div className="section-intro"><SectionLabel>01 / THE PERSON BEHIND THE PAGE</SectionLabel><h2>Who I am,<br/><em>beyond the labels.</em></h2></div>
    <div className="story-copy"><p className="lead">I am someone who enjoys making things, asking questions, and discovering what happens when I try something new.</p><p>Mandala art and painting give me room to play with colors, patterns, and details. Computer science gives me another kind of canvas: a place to explore ideas, solve problems, and build things that work.</p><p>I don't see these as separate sides of me. Both begin with curiosity, a little patience, and the willingness to experiment.</p><div className="signature">A work in progress, by choice.</div></div>
   </section>
   <section className="traits section-wrap" aria-label="What defines me">
    <article className="trait-card trait-lilac"><div className="trait-icon"><Palette size={24}/></div><div className="trait-number">01</div><h3>Creative by nature</h3><p>I enjoy expressing ideas visually, exploring colors, and making something that feels personal.</p></article>
    <article className="trait-card trait-green"><div className="trait-icon"><Lightbulb size={24}/></div><div className="trait-number">02</div><h3>Curious by choice</h3><p>I like asking how things work, learning unfamiliar concepts, and looking beyond the obvious.</p></article>
    <article className="trait-card trait-peach"><div className="trait-icon"><Compass size={24}/></div><div className="trait-number">03</div><h3>Always exploring</h3><p>Every new skill, experiment, and project is a chance to grow and see things differently.</p></article>
   </section>
   <section className="explore section-wrap" id="explore"><div className="explore-heading"><div><SectionLabel>02 / LEARNING IN MOTION</SectionLabel><h2>Things I'm <em>exploring.</em></h2></div><p>My curiosity doesn't stop at a sketchbook. It follows me from art into technology. I enjoy exploring unfamiliar ideas, experimenting with different approaches, and learning by building. These projects are part of that journey, where I turn questions into experiments and gradually discover what I can create.</p></div>
    <div className="explore-list">
  {projects.map((project) => (
    <ProjectCard key={project.number} project={project} />
  ))}
</div>
   </section>
   <section className="create section-wrap" id="create"><div className="create-heading"><SectionLabel>03 / A SPACE TO EXPERIMENT</SectionLabel><h2>A little world<br/><em>of color.</em></h2><p>Art reminds me that there is rarely just one way to make something beautiful. Pick a color, try a combination, and make this pattern your own.</p></div>
    <div className="studio"><div className="studio-topline"><span>YOUR MANDALA, YOUR RULES</span><span>{Object.keys(petalColors).length} petals colored</span></div><div className="studio-canvas"><Mandala petalCount={petalCount} petalColors={petalColors} onPetalClick={changePetal}/></div>
     <div className="studio-controls"><div className="control-label">Choose a color</div><div className="swatches" role="group" aria-label="Choose a color">{colors.map(color=><button key={color} className={`swatch ${selectedColor===color?"selected":""}`} style={{background:color}} onClick={()=>setSelectedColor(color)} aria-label={`Select ${color}`} title={color}/>)}</div>
      <div className="control-row"><label htmlFor="petal-count">Pattern detail</label><select id="petal-count" value={petalCount} onChange={e=>changePetals(Number(e.target.value))}><option value={8}>8 petals</option><option value={12}>12 petals</option><option value={16}>16 petals</option></select></div>
      <div className="studio-buttons"><button className="button button-light small-button" onClick={undo}><Undo2 size={15}/> Undo</button><button className="button button-light small-button" onClick={reset}><RotateCcw size={15}/> Reset</button></div><p className="studio-hint">Tip: click any petal to fill it with your selected color.</p></div>
    </div>
   </section>
   <section className="gallery section-wrap" id="art">
  <div className="section-label">MY ART CORNER</div>

  <h2>A little gallery of <em>me.</em></h2>

  <p className="gallery-intro">
    Every piece is a small part of my journey, shaped by colors,
    patience, curiosity, and the joy of creating something of my own.
  </p>

  <div className="gallery-grid">
    <figure className="art-card">
      <img src="/images/mandala1.jpg" alt="My mandala artwork" />
      <figcaption>Patterns of patience</figcaption>
    </figure>

    <figure className="art-card">
      <img src="/images/mandala2.jpg" alt="My second mandala artwork" />
      <figcaption>Finding balance in colors</figcaption>
    </figure>

    <figure className="art-card">
      <img src="/images/mandala3.jpeg" alt="My painting" />
      <figcaption>A little imagination</figcaption>
    </figure>
  </div>
</section>
   <section className="future section-wrap" id="future"><div className="future-decoration">✳</div><SectionLabel>04 / THE NEXT CHAPTER</SectionLabel><h2>The next chapter is still being written.</h2><p>
  I don't have every step of my future figured out, and I think
  that's part of the excitement. I want to keep exploring new
  ideas, learning new technologies, and challenging myself to
  create things that are both useful and meaningful.
</p>

<p>
  Whether I'm experimenting with a new model, solving a problem
  through code, or filling a page with colors, I want to keep
  the same curiosity that brought me here.
</p>

<p>
  <strong>
    I'm not just working towards a destination. I'm enjoying
    the process of becoming.
  </strong>
</p>
    <button className="button button-dark future-button" onClick={()=>setShowNote(value=>!value)}>{showNote?"Close my note":"A note to my future self"} <ArrowUpRight size={16}/></button>{showNote&&<div className="future-note">Stay curious. Make room for mistakes. Keep creating, keep asking, and don't be afraid to begin again.</div>}<div className="future-signature">This is not a finished story. It is a work in progress.</div>
   </section>
  </main>
  <footer className="footer"><a className="footer-brand" href="#home">The Art of Becoming <span>✳</span></a><p>A little space for creativity, curiosity, and everything still to come.</p><a className="back-top" href="#home">Back to the beginning ↑</a></footer>
 </div>;
}
