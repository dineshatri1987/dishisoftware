import { Reveal } from './Reveal';

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  { n: '01', title: 'Discover', body: 'A free 30-minute call to understand your goals, users and constraints. You leave with clarity, not a hard sell.' },
  { n: '02', title: 'Plan',     body: 'A short written scope: features, stack, timeline and price. Fixed milestones, no surprise invoices.' },
  { n: '03', title: 'Design & build', body: 'Weekly demos. You see real working software early — and steer it before it’s set in stone.' },
  { n: '04', title: 'Launch',   body: 'We handle deploy, DNS, monitoring and that scary first day in production. You get to focus on customers.' },
  { n: '05', title: 'Support',  body: 'Ongoing maintenance plans, or hand-off with full docs. Your choice — your code, your call.' },
];

export function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow"><span className="dot" /> How we work</p>
          <h2>A simple, honest process.</h2>
          <p className="lead">No 80-page proposals. We talk, we plan, we ship — in short loops.</p>
        </Reveal>

        <ol className="timeline">
          {STEPS.map((s) => (
            <Reveal as="li" key={s.n}>
              <span className="step">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
