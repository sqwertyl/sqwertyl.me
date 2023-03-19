import Head from 'next/head'
// import Image from 'next/image'
import { Fira_Code } from 'next/font/google'
import { useEffect, useState } from 'react'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false;

library.add(faGithub);


const fira = Fira_Code({ subsets: ['latin'] })

const App = () => {
  const [bgPosition, setBgPosition] = useState({x:0, y:0});

  useEffect(() => {
    const profilePicture = document.getElementById("profilePicture");
    setTimeout(() => {
      content.classList.add("opacity-100", "slideIn");
      profilePicture.classList.add("opacity-100", "slideIn");
    }, 100);
  
    const profileImage = document.getElementById("profileImage");
  
    // Check if the device is mobile
    const isMobileDevice = window.matchMedia("(max-width: 767px)").matches;
  
    // Only apply perspective shift on non-mobile devices
    if (!isMobileDevice) {
      window.addEventListener("mousemove", (event) => {
        const x =
          ((event.clientX - window.innerWidth / 2) / window.innerWidth) * 30;
        const y = (event.clientY / window.innerHeight) * 30 - 20;
  
        profileImage.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
        setBgPosition({ x: x / 5, y: y / 5 });
      });
    }
  }, []);
  
  const name = "andrew chen";
  const nameElements = name.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className={letter===" " ? "space" : "hop-animation"}
        style={
          letter===" "
            ? { ...fira.style }
            : { animationDelay: `${index*0.1}s`, ...fira.style }
        }
      >
        {letter}
      </span>
    );
  });


  return (
    <div>
      <Head>
        <title>@sqwertyl</title>
        <link rel="icon" type="image/png" href="favicon.png"/>
      </Head>
      <div className={`min-h-screen flex items-center fade-in`} style={{backgroundImage:"url('bg.svg')", backgroundPosition:`${bgPosition.x}px ${bgPosition.y}px`}}>
        <div className="container mx-auto px-4 flex flex-col items-center">
        <div className={`mb-10 opacity-0`} id="profilePicture">
          <img id="profileImage" src="pfp.png" alt="Profile picture" className={`profile-picture rounded-full w-56 h-56`} draggable={false} />
        </div>
        <div className={`text-center opacity-0 content`} id="content">
          <h1 className={`text-5xl font-bold mb-2`}>{nameElements}</h1>
          <div className="relative group">
            <div className="inline-block" id="captionContainer">
              <p className={`text-2xl caption-text`} style={fira.style}>@sqwertyl</p>
            </div>
            <div className={`social-modal top-200 left-1/4 absolute w-1/2 h-14`}>
              {/* Add your social icons here */}
              <a href="https://github.com/sqwertyl" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faGithub} size="lg"/>
              </a>
              <a href="https://linkedin.com/in/andrewchen118" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faLinkedin} size="lg"/>
              </a>
              <span className={`absolute top-0 left-0 right-0 mx-auto w-full h-0 -mt-2 border-4 opacity-0`}></span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default App;