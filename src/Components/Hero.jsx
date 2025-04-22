'use client'
import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementsVisible, setElementsVisible] = useState(false);
  const heroRef = useRef(null);
  const loaderDelay = 100; // 0.1 seconds for loader

  useEffect(() => {
    // Show elements after page loads
    const timer = setTimeout(() => {
      setElementsVisible(true);
    }, loaderDelay);

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
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate effects based on scroll position
  const scrollFade = Math.max(0, 1 - scrollPosition / 500);
  const heroTransform = `translateY(${scrollPosition * 0.2}px)`;
  const textTransform = `translateY(${scrollPosition * -0.1}px)`;

  // Function to scroll to the next component
  const scrollToNextComponent = () => {
    const heroHeight = heroRef.current?.clientHeight || 0;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-[#e3e3dc] hero-section">
      {/* Animated background with subtle particles */}
      <div className="absolute inset-0 opacity-30 bg-particles"></div>
      
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-animation opacity-40"></div>
      
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
            {/* Brand label with slide-in animation */}
            <div className={`flex items-center mb-6 ${elementsVisible ? 'animate-slide-right' : 'opacity-0'}`}>
              <div className="h-1 w-16 bg-green-500 mr-4 animate-expand"></div>
              <p className="text-green-500 font-medium tracking-wider text-3xl animate-char-appear">𝑵𝒐𝒕𝒊𝒒𝒖𝒆</p>
            </div>
            
            {/* Headline with staggered reveal animation */}
            <h1 className={`sm:max-w-full md:max-w-[50rem] lg:max-w-[40rem] xl:max-w-[50rem] 2xl:max-w-[60rem] text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-wide mb-6 z-40 text-black ${elementsVisible ? 'animate-fade-up-delay-1' : 'opacity-0'}`}>
              <span className="text-green-500 inline-block relative text-glow animate-text-pulse"> Welcome to Notique </span> <br />
              <span className="text-black text-2xl font-light animate-fade-in-delay"> Built for thinkers, makers, and founders. Take notes, take off.</span>
            </h1>
            
            {/* Subheadline with fade-in animation */}
            <p className={`font-medium lg:max-w-[35rem] text-black text-lg ${elementsVisible ? 'animate-fade-up-delay-2' : 'opacity-0'}`}>
              More than just a note app — Notique is your digital thinking space. Write freely, structure effortlessly, and bring clarity to every idea, big or small.
            </p>
            
            {/* CTA buttons with staggered entrance and hover effects */}
            <div className={`flex gap-6 mt-10 ${elementsVisible ? 'animate-fade-up-delay-3' : 'opacity-0'}`}>
              <button 
                className="px-8 py-3 bg-green-500 text-black font-bold rounded hover:scale-105 transition-all shadow-lg shadow-green-500/30 button-pulse"
                onClick={scrollToNextComponent}
              >
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-green-400 text-green-400 font-bold rounded hover:bg-white/10 hover:scale-105 transition-all border-shimmer">
                Learn More
              </button>
            </div>

            <div className='left-0 ml-[-25vh] h-20 w-4xl mt-24'></div>
          </div>
          
          {/* 3D MODEL VIEWER with enhanced animation */}
          <div className={`absolute -top-16 right-0 w-[100%] lg:-mt-16 lg:w-[99%] lg:scale-[0.5] md:scale-[0.4] md:right-[-30%] lg:right-[-24%] xl:w-[80%] xl:scale-[0.6] xl:right-[-15%] xl:mt-[-4vh] 2xl:w-[70%] 2xl:scale-[0.7] 2xl:right-[-8%] 2xl:top-[5%] h-full flex items-center justify-center model-reveal ${elementsVisible ? 'model-float' : 'opacity-0'}`}>
            {/* Enhance the glow effect around the 3D model */}
            <div className="absolute inset-0 rotating-glow"></div>
            
            <div className="w-40 lg:h-24 xl:h-16 bg-[#e3e3dc] right-0 bottom-0 absolute opacity-100 z-50"></div>
            
            <spline-viewer 
              className="hidden md:hidden lg:block"
              url="https://prod.spline.design/ySDhYuwhD7xjvCC6/scene.splinecode">
            </spline-viewer>
          </div>
          
          {/* Animated scroll indicator */}
          <div className={`absolute bottom-10 left-0 w-full flex justify-center items-center flex-col ${elementsVisible ? 'animate-fade-in-delay-4' : 'opacity-0'}`}>
            <div className="h-1 w-16 bg-green-500 animate-pulse-width"></div>
            <div className="scroll-arrow mt-4"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced animations via CSS */}
      <style jsx>{`
        /* Background animations */
        .bg-gradient-animation {
          background: linear-gradient(-45deg, #2ece3280, #e8e8e280, #b8f5c880, #22c75e80);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .bg-particles {
          background-image: radial-gradient(#22c75e 1px, transparent 1px);
          background-size: 50px 50px;
          animation: particlesFade 10s ease infinite;
        }
        
        @keyframes particlesFade {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Text and element animations */
        .animate-slide-right {
          animation: slideRight 0.8s ease forwards;
        }
        
        .animate-expand {
          animation: expand 1.2s ease forwards;
        }
        
        .animate-char-appear {
          animation: charAppear 1s ease forwards;
        }
        
        .animate-fade-up-delay-1 {
          animation: fadeUp 0.8s ease 0.2s forwards;
        }
        
        .animate-fade-up-delay-2 {
          animation: fadeUp 0.8s ease 0.4s forwards;
        }
        
        .animate-fade-up-delay-3 {
          animation: fadeUp 0.8s ease 0.6s forwards;
        }
        
        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 1s ease 0.8s forwards;
        }
        
        .animate-fade-in-delay-4 {
          animation: fadeIn 1s ease 1.2s forwards;
        }
        
        .animate-text-pulse {
          animation: textPulse 3s ease-in-out infinite;
        }
        
        .animate-pulse-width {
          animation: pulseWidth 2s ease-in-out infinite;
        }
        
        @keyframes slideRight {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes expand {
          from { width: 0; opacity: 0; }
          to { width: 16; opacity: 1; }
        }
        
        @keyframes charAppear {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes textPulse {
          0% { text-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
          50% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
          100% { text-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
        }
        
        @keyframes pulseWidth {
          0%, 100% { width: 16px; }
          50% { width: 50px; }
        }

        /* 3D Model animations */
        .model-reveal {
          transition: opacity 1.5s ease-out;
        }
        
        .model-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .rotating-glow {
          background: radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: rotateGlow 10s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(0.5deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-0.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes rotateGlow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        /* Button animations */
        .button-pulse {
          animation: buttonPulse 3s infinite;
        }
        
        .border-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .border-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        
        @keyframes buttonPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        /* Scroll indicator animation */
        .scroll-arrow {
          width: 20px;
          height: 20px;
          border-right: 3px solid #22c75e;
          border-bottom: 3px solid #22c75e;
          transform: rotate(45deg);
          animation: scrollIndicator 2s infinite;
        }
        
        @keyframes scrollIndicator {
          0% { transform: rotate(45deg) translate(-5px, -5px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: rotate(45deg) translate(5px, 5px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Hero;