'use client'
import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const animatedOnce = useRef(false);
  const [elementsVisible, setElementsVisible] = useState(false);
  const loaderDelay = 100; // 0.5 seconds for loader

  useEffect(() => {
    // Only run the animation once after page loads and loader finishes
    if (!animatedOnce.current) {
      setTimeout(() => {
        setElementsVisible(true);
        animatedOnce.current = true;
      }, loaderDelay);
    }

    // Load Spline viewer
    const loadSplineViewer = async () => {
      if (!window.splineViewer) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
        script.async = true;
        script.onload = () => {
          const viewer = document.querySelector('spline-viewer');
          if (viewer) {
            viewer.setAttribute('url', viewer.getAttribute('url'));
          }
        };
        document.body.appendChild(script);
      }
    };
    
    // Handle scroll for parallax and fade effects
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    loadSplineViewer();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate effects based on scroll position
  const scrollFade = Math.max(0, 1 - scrollPosition / 500);
  const heroTransform = `translateY(${scrollPosition * 0.2}px)`;
  const textTransform = `translateY(${scrollPosition * -0.1}px)`;

  // Function to scroll to the next component
  const scrollToNextComponent = () => {
    // Get the height of the current component
    const heroHeight = document.querySelector('.hero-section').clientHeight;
    
    // Scroll to just after the hero section
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative overflow-hidden bg-[#e3e3dc] hero-section">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <div 
        className="mb-36 px-6 md:px-10 lg:p-0"
        style={{ 
          opacity: scrollFade,
          transform: heroTransform,
          transition: 'opacity 0.5s ease-out, transform 0.3s ease-out'
        }}
      >
        <div className="h-screen md:h-[80vh] lg:h-screen w-full flex relative mt-[-13vh] lg:mt-[0%] xl:mt-[0%] flex-col justify-center min-h-[90vh-6rem]">
          
          {/* CONTENT DIV */}
          <div 
            className="sm:mt-[-25vh] md:mt-[15vh] md:min-w-[20rem] md:ml-[4%] xl:ml-[5%] lg:mt-[-35vh] xl:mt-[-25vh] 2xl:mt-[9vh] z-40"
            style={{
              transform: textTransform,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div 
              className="flex items-center mb-6"
              style={{ 
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s'
              }}
            >
              <div className="h-1 w-16 bg-green-500 mr-4"></div>
              <p className="text-green-500 font-medium tracking-wider text-3xl ">𝑵𝒐𝒕𝒊𝒒𝒖𝒆</p>
            </div>
            
            <h1 
              className="sm:max-w-full md:max-w-[50rem] lg:max-w-[40rem] xl:max-w-[50rem] 2xl:max-w-[60rem] text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-wide mb-6 z-40 text-black"
              style={{ 
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
              }}
            >
            <h1 className='text-green-500 inline-block relative text-glow'> Welcome to Notique </h1> <br />

              <span className="text-black text-2xl font-light"> Built for thinkers, makers, and founders. Take notes, take off.

</span>

            </h1>
            
            <p 
              className="font-medium lg:max-w-[35rem] text-black text-lg"
              style={{ 
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s'
              }}
            >
             More than just a note app — Notique is your digital thinking space. Write freely, structure effortlessly, and bring clarity to every idea, big or small.
            </p>
            
            <div 
              className="flex gap-6 mt-10"
              style={{ 
                opacity: elementsVisible ? 1 : 0,
                transform: elementsVisible ? 'none' : 'translateY(20px)',
                transition: 'opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s'
              }}
            >
              <button 
                className="px-8 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all shadow-lg shadow-green-500/30 button-pulse"
                onClick={scrollToNextComponent}
              >
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-green-400 text-green-400 font-bold rounded hover:bg-white/10 transition-all border-shimmer">
                Learn More
              </button>
            </div>

            <div className='left-0 ml-[-25vh] h-20 w-4xl mt-24'></div>
          </div>
          
          {/* 3D MODEL VIEWER - Keeping all original positioning values */}
          <div 
            className="absolute -top-16 right-0 w-[100%] lg:-mt-16 lg:w-[99%] lg:scale-[0.5] md:scale-[0.4] md:right-[-30%] lg:right-[-24%] xl:w-[80%] xl:scale-[0.6] xl:right-[-15%] xl:mt-[-4vh] 2xl:w-[70%] 2xl:scale-[0.7] 2xl:right-[-8%] 2xl:top-[5%] h-full flex items-center justify-center opacity-100 model-float"
            style={{ 
              opacity: elementsVisible ? 1 : 0,
              transition: 'opacity 1s ease-out 0.7s'
            }}
          >
            <div className="w-40 lg:h-24 xl:h-16 bg-[#e3e3dc] right-0 bottom-0 absolute opacity-100 z-50"></div>
            
            {/* Glowing effect around the 3D model */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 rounded-full blur-3xl"></div>
            
            <spline-viewer 
              className="hidden md:hidden lg:block"
              url="https://prod.spline.design/ySDhYuwhD7xjvCC6/scene.splinecode">
            </spline-viewer>
          </div>
          
          {/* Bottom decorative element */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-70">
            <div className="h-1 w-16 bg-green-500"></div>
          </div>
        </div>
      </div>
      
      {/* Add a styled keyframes for gradient animation in style element */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .model-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .text-glow {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.7);
        }
        
        .button-pulse {
          animation: pulse 2s infinite;
        }
        
        .border-shimmer {
          background: linear-gradient(to right, rgba(230,230,230,0) 0%, rgba(230,230,230,0.6) 50%, rgba(230,230,230,0) 100%);
          background-size: 200% 100%;
          background-position: -100% 0;
          animation: shimmer 3s infinite;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
};

export default Hero;