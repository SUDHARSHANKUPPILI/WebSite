import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && preferDark)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <>
      <Head>
        <title>Your Name – Resume</title>
        <meta name="description" content="Professional resume website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow p-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Your Name</h1>
          <nav className="flex items-center space-x-4">
            {['about', 'experience', 'education', 'skills', 'contact'].map((sec) => (
              <a key={sec} href={`#${sec}`} className="btn btn-outline text-sm">
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            ))}
            <button onClick={toggleDark} className="btn btn-primary ml-2">
              {dark ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-16">
        <Section id="about" title="About Me" delay={0}>
          <p className="text-lg">
            I'm a [Your Profession] with [X] years of experience...
          </p>
        </Section>
        <Section id="experience" title="Work Experience" delay={100}>
          <div>
            <h3 className="font-bold text-lg">Job Title – Company</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Jan 2022 – Present</p>
            <ul className="list-disc list-inside mt-2 text-md">
              <li>Led team of 5 developers on enterprise projects.</li>
              <li>Improved page speed by 40% via optimization.</li>
            </ul>
          </div>
        </Section>
        <Section id="education" title="Education" delay={200}>
          <p className="font-bold">
            B.Sc. in Computer Science – University Name
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Graduated: 2020
          </p>
        </Section>
        <Section id="skills" title="Skills" delay={300}>
          <div className="flex flex-wrap gap-3">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Git'].map((skill) => (
              <span key={skill} className="btn btn-outline">{skill}</span>
            ))}
          </div>
        </Section>
        <Section id="contact" title="Contact" delay={400}>
          <p>Email: <a href="mailto:you@example.com" className="link">you@example.com</a></p>
          <p>LinkedIn: <a href="#" className="link">linkedin.com/in/you</a></p>
          <p>GitHub: <a href="#" className="link">github.com/yourusername</a></p>
        </Section>
      </main>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-16 p-6">
        &copy; 2025 Your Name. All rights reserved.
      </footer>
    </>
  );
}

function Section({ id, title, delay, children }) {
  return (
    <section id={id} data-aos="fade-up" data-aos-delay={delay}>
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}
