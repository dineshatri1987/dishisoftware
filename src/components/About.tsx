import { Reveal } from './Reveal';

function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
}

const WHY = [
  'Senior engineers, no junior pass-through',
  'Weekly demos & transparent estimates',
  'Modern stack, written to last',
  'Dedicated support & accounts inbox',
  'India-time delivery, global communication',
];

export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container split">
        <Reveal>
          <p className="eyebrow"><span className="dot" /> About Divora</p>
          <h2>A small studio with senior hands.</h2>
          <p>
            Divora Technology is an independent IT studio based in{' '}
            <strong>Sector 119, Noida</strong>. We partner with founders, marketing teams
            and growing businesses to build software that earns its place in production.
          </p>
          <p>
            The studio is led by <strong>Khajani Devi</strong>, our owner — who believes
            small, accountable teams ship better software than large, layered ones.
            Every project is touched by a senior engineer, every line of code is owned.
          </p>
          <div className="about-meta">
            <div><strong>Founded by</strong><span>Khajani Devi</span></div>
            <div><strong>Based in</strong><span>Noida, India</span></div>
            <div><strong>Working with</strong><span>Startups &amp; SMBs worldwide</span></div>
          </div>
        </Reveal>

        <Reveal as="aside" className="info-box">
          <h3>Why teams pick Divora</h3>
          <ul>
            {WHY.map((line) => (
              <li key={line}><span>★</span> {line}</li>
            ))}
          </ul>
          <div className="info-cta">
            <a href="#contact" className="button primary" data-cursor="hover" onClick={scrollToId('contact')}>
              Book a call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
