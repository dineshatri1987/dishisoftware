import { Reveal } from './Reveal';

type Group = { title: string; items: string[] };

const GROUPS: Group[] = [
  { title: 'Backend',      items: ['.NET', 'ASP.NET Core', 'C#', 'Python', 'Django', 'FastAPI', 'Node.js', 'Express', 'NestJS'] },
  { title: 'Frontend',     items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'jQuery', 'React.js', 'Vue.js', 'Next.js'] },
  { title: 'Data & Infra', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Azure'] },
];

export function TechStack() {
  return (
    <section className="section tech-section" id="tech">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow"><span className="dot" /> Our stack</p>
          <h2>Tools we know inside out.</h2>
          <p className="lead">
            Pragmatic choices, not hype. We pick technology that fits the problem and outlives the project.
          </p>
        </Reveal>

        <div className="tech-categories">
          {GROUPS.map((g) => (
            <Reveal key={g.title} className="tech-cat">
              <h4>{g.title}</h4>
              <div className="tech-pills">
                {g.items.map((it) => (
                  <span key={it} className="pill" data-cursor="hover">{it}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
