import Link from 'next/link';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import FloatingNav from './components/floating-nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';

export const revalidate = 180;
export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <FloatingNav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Education />
      <Contact />
      <footer className='w-full text-center uppercase bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative'>
        Credit by <Link target='_blank' href={'https://v0.dev/'}>v0.dev</Link>
      </footer>
    </main>
  );
}
