import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { Work } from './components/Work';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <TechStack />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
