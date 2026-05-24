import { useState } from 'react';
import { Reveal } from './Reveal';

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const EMPTY: FormState = { name: '', email: '', phone: '', topic: '', message: '' };

const TOPICS = [
  'New project',
  'Existing project / support',
  'Hire Divora as a team',
  'Other',
];

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<{ kind: 'idle' | 'success' | 'error'; msg: string }>({ kind: 'idle', msg: '' });

  const update = <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, topic, message } = form;

    if (!name.trim() || !email.trim() || !topic.trim() || !message.trim()) {
      setStatus({ kind: 'error', msg: 'Please fill in the required fields.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'error', msg: 'That email address doesn’t look right.' });
      return;
    }

    await fetch('https://api.divoratechnology.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, helpWith: topic, message })
    });

    setStatus({ kind: 'success', msg: 'Opening your email app… if it didn’t open, write to support@divoratechnology.com.' });
    setForm(EMPTY);
  };

  const statusClass =
    status.kind === 'success' ? 'is-success' :
      status.kind === 'error' ? 'is-error' : '';

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <Reveal className="section-header centered">
          <p className="eyebrow"><span className="dot" /> Get in touch</p>
          <h2>Tell us about your project.</h2>
          <p className="lead">We reply to every serious inquiry within one business day.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal as="form" className="contact-form" noValidate onSubmit={submit}>
            <div className="field">
              <input
                type="text" id="name" required autoComplete="name"
                placeholder=" " value={form.name} onChange={update('name')}
              />
              <label htmlFor="name">Your name</label>
            </div>
            <div className="field">
              <input
                type="email" id="email" required autoComplete="email"
                placeholder=" " value={form.email} onChange={update('email')}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="field">
              <input
                type="tel" id="phone" autoComplete="tel"
                placeholder=" " value={form.phone} onChange={update('phone')}
              />
              <label htmlFor="phone">Phone (optional)</label>
            </div>
            <div className="field">
              <select id="topic" required value={form.topic} onChange={update('topic')}>
                <option value="" disabled hidden></option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <label htmlFor="topic">What can we help with?</label>
            </div>
            <div className="field field-full">
              <textarea
                id="message" rows={5} required
                placeholder=" " value={form.message} onChange={update('message')}
              />
              <label htmlFor="message">A few lines about your idea</label>
            </div>
            <button type="submit" className="button primary submit" data-cursor="hover">
              <span>Send message</span>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className={`form-status ${statusClass}`} role="status" aria-live="polite">
              {status.msg}
            </p>
          </Reveal>

          <Reveal as="aside" className="contact-info">
            <div className="contact-block">
              <p className="lbl">Office</p>
              <p>F-1004, Amrapali Platinum<br />Sector 119, Noida 201301<br />Uttar Pradesh, India</p>
            </div>
            <div className="contact-block">
              <p className="lbl">Phone</p>
              <p><a href="tel:+917982634542" data-cursor="hover">+91 79826 34542</a></p>
              <p><a href="tel:+917982634542" data-cursor="hover">+91 79826 34542</a></p>
            </div>
            <div className="contact-block">
              <p className="lbl">Email</p>
              <p>
                <a href="mailto:info@divoratechnology.com" data-cursor="hover">info@divoratechnology.com</a><br />
                <a href="mailto:support@divoratechnology.com" data-cursor="hover">support@divoratechnology.com</a><br />
                <a href="mailto:account@divoratechnology.com" data-cursor="hover">account@divoratechnology.com</a>
              </p>
            </div>
            <div className="contact-block hours">
              <p className="lbl">Hours</p>
              <p>Mon – Sat · 10:00 – 19:00 IST</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
