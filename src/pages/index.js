import Head from 'next/head'
import Image from 'next/image'
import { Fira_Code } from 'next/font/google'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import useTilt from '@/hooks/useTilt'
import useMagneticHover from '@/hooks/useMagneticHover'
import useParallax from '@/hooks/useParallax'

// Floating emoji component
const Emoji = ({ id, left, top, onDone }) => {
  const [style, setStyle] = useState({
    position: 'absolute',
    left,
    top,
    fontSize: '2rem',
    opacity: 1,
    transition: 'top 3s ease-out, opacity 3s ease-out'
  });
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStyle(s => ({ ...s, top: s.top - 100, opacity: 0 }));
    }, 10);
    const t2 = setTimeout(() => {
      onDone(id);
    }, 3010);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [id, onDone]);
  return <span style={style}>👍</span>;
};

const fira = Fira_Code({ subsets: ['latin'] })

const App = () => {
  // background parallax position
  const bgPosition = useParallax({ sensitivityX: 40, sensitivityY: 40, offsetY: -25, easing: 0.25, divideBy: 3 })
  // control slide-in for profile and content
  const [showProfile, setShowProfile] = useState(false);
  const [showContent, setShowContent] = useState(false);
  // social modal open
  const [modalOpen, setModalOpen] = useState(false);
  // floating emojis
  const [emojis, setEmojis] = useState([]);
  const [pfpPressed, setPfpPressed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  // refs
  const modalRef = useRef(null);
  const tiltRef = useRef(null);
  const captionRef = useRef(null);
  const pfpRef = useRef(null);
  const themeRef = useRef(null);
  // magnetic hover translations
  const captionTranslate = useMagneticHover(captionRef, { maxPullX: 32, maxPullY: 16, easing: 0.8 });
  const pfpTranslate = useMagneticHover(pfpRef, { maxPullX: 8, maxPullY: 8, easing: 0.12 });
  const themeTranslate = useMagneticHover(themeRef, { maxPullX: 6, maxPullY: 6, easing: 0.12 });

  // clean up clicks outside social modal
  useOnClickOutside(modalRef, () => setModalOpen(false));
  // tilt effect on profile image
  useTilt(tiltRef);

  // initial slide-in
  useEffect(() => {
    const t = setTimeout(() => {
      setShowProfile(true);
      setShowContent(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  // sync theme state from current DOM on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);


  // handle profile image click to add emoji
  const handleProfileClick = useCallback(() => {
    const id = Date.now();
    const left = Math.random() * (window.innerWidth - 50);
    const top = Math.random() * (window.innerHeight - 50);
    setEmojis(prev => [...prev, { id, left, top }]);
  }, []);
  // remove emoji by id
  const removeEmoji = useCallback((id) => {
    setEmojis(prev => prev.filter(e => e.id !== id));
  }, []);

  // theme toggle
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.add('theme-transition');
    root.classList.toggle('dark', next);
    setIsDark(next);
    window.setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 320);
  }, []);

  // hopping name
  const name = "andrew chen";
  const nameElements = useMemo(() => (
    name.split("").map((letter, index) => (
      <span
        key={index}
        className={letter === " " ? "space" : "hop-animation"}
        style={
          letter === " "
            ? { ...fira.style }
            : { animationDelay: `${index * 0.1}s`, ...fira.style }
        }
      >
        {letter}
      </span>
    ))
  ), [name]);


  return (
    <div>
      <Head>
        <title>@sqwertyl</title>
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>
      <div
        className="min-h-screen flex items-center fade-in dot-bg bg-white dark:bg-black"
        style={{
          backgroundPosition: `${bgPosition.x}px ${bgPosition.y}px`
        }}
      >
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className={`${showProfile ? 'opacity-100 slideIn mb-10' : 'opacity-0 mb-10'}`}>
            <div
              ref={tiltRef}
              className="inline-block select-none"
              style={{
                translate: `${Math.round(pfpTranslate.x * 10) / 10}px ${Math.round(pfpTranslate.y * 10) / 10}px`
              }}
              >
              <Image
                src="/pfp.jpeg"
                alt="Profile picture"
                width={224}
                height={224}
                ref={pfpRef}
                onClick={handleProfileClick}
                onPointerDown={() => setPfpPressed(true)}
                onPointerUp={() => setPfpPressed(false)}
                onPointerCancel={() => setPfpPressed(false)}
                onPointerLeave={() => setPfpPressed(false)}
                className={`profile-picture cursor-pointer rounded-full w-56 h-56 ${pfpPressed ? 'pfp-pressed' : ''}`}
                draggable={false}
              />
            </div>
          </div>
          <div className={`text-center ${showContent ? 'opacity-100 slideIn' : 'opacity-0'}`}>
            <h1 className="text-5xl font-bold mb-2 text-black dark:text-gray-200">{nameElements}</h1>
            <div className="relative" ref={modalRef}>
              <p
                role="button"
                tabIndex={0}
                aria-label="Toggle social links"
                onClick={() => setModalOpen(o => !o)}
                onKeyDown={e => e.key === 'Enter' && setModalOpen(o => !o)}
                className={`inline-block select-none px-4 text-2xl font-medium cursor-pointer ${
                  modalOpen ? 'caption-text-clicked' : 'caption-text'
                }`}
                ref={captionRef}
                style={{
                  ...fira.style,
                  translate: !modalOpen ? `${Math.round(captionTranslate.x * 10) / 10}px ${Math.round(captionTranslate.y * 10) / 10}px` : undefined
                }}
              >
                <span className="caption-inner">@links</span>
              </p>
              <div
                className={`social-modal absolute left-1/4 w-1/2 h-14 ${modalOpen ? 'social-modal-clicked' : 'select-none'}`}
              >
                <div className="icon-container">
                  <a href="https://linkedin.com/in/andrewchen118" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                    <span className="link-label">LinkedIn</span>
                  </a>
                </div>
                <div className="icon-container">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FontAwesomeIcon icon={faFileAlt} size="xl" />
                    <span className="link-label">Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {emojis.map(e => (
          <Emoji key={e.id} id={e.id} left={e.left} top={e.top} onDone={removeEmoji} />
        ))}
        <button
          type="button"
          ref={themeRef}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={isDark}
          onClick={toggleTheme}
          style={{
            translate: `${Math.round(themeTranslate.x * 10) / 10}px ${Math.round(themeTranslate.y * 10) / 10}px`
          }}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-950 transition dark:bg-gray-950 dark:text-gray-100"
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </button>
      </div>
    </div>
  );

};

export default App;
