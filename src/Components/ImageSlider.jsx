'use client';

import { useEffect, useState } from 'react';

const StartupImageSlider = () => {
  const [activeCase, setActiveCase] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: 50 });

  useEffect(() => {
    // Create a ref to the component container for cursor boundary detection
    const sliderContainer = document.getElementById('startup-slider-container');
    
    if (!sliderContainer) return;
  

    // Add hover event listeners for hover targets
    const addHoverListeners = () => {
      const hoverTargets = sliderContainer.querySelectorAll('.hover-target');
      
      const handleMouseOver = () => {
        document.getElementById('cursor2')?.classList.add('hover');
        document.getElementById('cursor3')?.classList.add('hover');
      };
      
      const handleMouseOut = () => {
        document.getElementById('cursor2')?.classList.remove('hover');
        document.getElementById('cursor3')?.classList.remove('hover');
      };
      
      hoverTargets.forEach((target) => {
        target.addEventListener('mouseover', handleMouseOver);
        target.addEventListener('mouseout', handleMouseOut);
      });

      return () => {
        hoverTargets.forEach((target) => {
          target.removeEventListener('mouseover', handleMouseOver);
          target.removeEventListener('mouseout', handleMouseOut);
        });
      };
    };

    // sliderContainer.addEventListener('mousemove', handleMouseMove);
    // const cleanupHover = addHoverListeners();

    // Trigger first case as active on mount
    setActiveCase(1);

    return () => {
      // sliderContainer.removeEventListener('mousemove', handleMouseMove);
      cleanupHover();
    };
  }, []);

  const handleCaseMouseEnter = (caseNumber) => {
    setActiveCase(caseNumber);
  };

  // Updated categories for startup focus
  const categories = ['vision', 'funding', 'growth', 'Mentoring'];

  return (
    <div id="startup-slider-container" className="w-full h-screen bg-black overflow-hidden relative inset-0 m-0 p-0 fixed">
   
      {/* Main Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Case Study Navigation */}
        <ul className="absolute top-1/2 left-1/2 z-10 w-auto m-0 p-0 transform -translate-x-1/2 -translate-y-1/2 list-none">
          {categories.map((category, index) => (
            <li 
              key={index}
              className={`m-0 auto text-center ${activeCase === index + 1 ? 'active' : ''}`}
              onMouseEnter={() => handleCaseMouseEnter(index + 1)}
            >
              <a 
                href="#" 
                className={`relative inline-block text-center py-0 my-[15px] font-sans text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-wider
                          ${activeCase === index + 1 ? 'text-white' : 'text-zinc-800'} 
                          transition-all duration-300 hover-target
                          before:absolute before:content-[''] before:left-1/2 before:bottom-0 before:h-[6px] before:w-0 before:transform before:-translate-x-1/2
                          before:transition-all before:duration-200
                          before:bg-gradient-to-r before:from-green-500 before:to-green-300
                          ${activeCase === index + 1 ? 'before:w-full' : ''}
                          `}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>

        {/* Case Study Images */}
        <ul className="absolute top-0 left-0 w-full h-full m-0 z-[2]">
          {/* Slide 1 - Vision */}
          <li className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none transition-all duration-300 ${activeCase === 1 ? 'show' : ''}`}>
            <div className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none opacity-0 translate-y-[60px] transition-all duration-500 ${activeCase === 1 ? 'opacity-100 translate-y-0' : ''}`}>
              <span className="absolute w-[26%] top-[12%] left-[25%] block md:block sm:w-[calc(100%-40px)] sm:top-1/2 sm:left-[20px] sm:transform sm:-translate-y-1/2">
                <img 
                  src="https://i.pinimg.com/736x/a3/41/e9/a341e91725407c6ba4227148ed1ccffa.jpg" 
                  alt="Vision 1" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 1 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[15%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/30/fb/df/30fbdfb5571ce2eee0614fc7d30f934d.jpg" 
                  alt="Vision 2" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 1 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[10%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/81/97/95/819795633bb655204b3022097ba53e5a.jpg" 
                  alt="Vision 3" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 1 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/8c/d6/43/8cd643cf1e1adfb9ea51b91f5246937c.jpg" 
                  alt="Vision 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 1 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/8c/d6/43/8cd643cf1e1adfb9ea51b91f5246937c.jpg" 
                  alt="Vision 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 1 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
            </div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block list-none text-[20vw] font-sans font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(34,197,94,0.3)] z-[1] transition-all duration-300 ${activeCase === 1 ? 'opacity-100' : 'opacity-0'}`}>
              01
            </div>
            <div className={`absolute bottom-[25px] left-1/2 w-[40px] ml-[-70px] block tracking-wider text-center list-none text-[13px] font-sans font-light leading-none text-green-500 z-[6] transition-all duration-300 ${activeCase === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
              01
            </div>
            <div className={`absolute bottom-[25px] left-1/2 ml-[30px] w-[40px] text-center block tracking-wider list-none text-[13px] font-sans font-light leading-none text-green-500 z-[6] transition-all duration-300 before:absolute before:content-[''] before:top-1/2 before:left-[-60px] before:w-[60px] before:h-[1px] before:z-[1] before:bg-green-500`}>
              04
            </div>
          </li>

          {/* Slide 2 - Funding */}
          <li className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none transition-all duration-300 ${activeCase === 2 ? 'show' : ''}`}>
            <div className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none opacity-0 translate-y-[60px] transition-all duration-500 ${activeCase === 2 ? 'opacity-100 translate-y-0' : ''}`}>
              <span className="absolute w-[14%] top-[7%] left-[15%] block md:block sm:w-[calc(100%-40px)] sm:top-1/2 sm:left-[20px] sm:transform sm:-translate-y-1/2">
                <img 
                  src="https://i.pinimg.com/736x/11/ac/e3/11ace3e4825b6957923786c5c3d19443.jpg" 
                  alt="Funding 1" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 2 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[15%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/65/a2/3b/65a23bd9fb01161c9417960efa315172.jpg" 
                  alt="Funding 2" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 2 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[15%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/f5/0a/70/f50a70673a7f182b1aa8d6f18dc4acdc.jpg" 
                  alt="Funding 3" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 2 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/84/68/44/84684467e008de73218276315a431ecd.jpg" 
                  alt="Funding 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 2 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/84/68/44/84684467e008de73218276315a431ecd.jpg" 
                  alt="Funding 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 2 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>

            </div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block list-none text-[20vw] font-sans font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(34,197,94,0.3)] z-[1] transition-all duration-300 ${activeCase === 2 ? 'opacity-100' : 'opacity-0'}`}>
              02
            </div>
            <div className={`absolute bottom-[25px] left-1/2 w-[40px] ml-[-70px] block tracking-wider text-center list-none text-[13px] font-sans font-light leading-none text-green-500 z-[6] transition-all duration-300 ${activeCase === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
              02
            </div>
          </li>

          {/* Slide 3 - Growth */}
          <li className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none transition-all duration-300 ${activeCase === 3 ? 'show' : ''}`}>
            <div className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none opacity-0 translate-y-[60px] transition-all duration-500 ${activeCase === 3 ? 'opacity-100 translate-y-0' : ''}`}>
              <span className="absolute w-[12%] top-[9%] left-[18%] block md:block sm:w-[calc(100%-40px)] sm:top-1/2 sm:left-[20px] sm:transform sm:-translate-y-1/2">
                <img 
                  src="https://i.pinimg.com/736x/91/ed/54/91ed542cdd6ee811246bb3d7b3d9dab7.jpg" 
                  alt="Growth 1" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 3 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[15%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/8e/90/1f/8e901f7e4827cac9073ae2c3131d90fa.jpg" 
                  alt="Growth 2" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 3 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[15%] top-[11%] left-[62%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/03/17/3d/03173deb51908f31169c8927d1bc8e88.jpg" 
                  alt="Growth 3" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 3 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[15%] top-[54%] left-[12%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/6f/8b/51/6f8b510629825d53859594944b058a2d.jpg" 
                  alt="Growth 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 3 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/8e/90/1f/8e901f7e4827cac9073ae2c3131d90fa.jpg" 
                  alt="Growth 2" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 3 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
            </div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block list-none text-[20vw] font-sans font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(34,197,94,0.3)] z-[1] transition-all duration-300 ${activeCase === 3 ? 'opacity-100' : 'opacity-0'}`}>
              03
            </div>
            <div className={`absolute bottom-[25px] left-1/2 w-[40px] ml-[-70px] block tracking-wider text-center list-none text-[13px] font-sans font-light leading-none text-green-500 z-[6] transition-all duration-300 ${activeCase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
              03
            </div>
          </li>

          {/* Slide 4 - Innovation */}
          <li className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none transition-all duration-300 ${activeCase === 4 ? 'show' : ''}`}>
            <div className={`absolute w-full h-full top-0 left-0 overflow-hidden list-none opacity-0 translate-y-[60px] transition-all duration-500 ${activeCase === 4 ? 'opacity-100 translate-y-0' : ''}`}>
              <span className="absolute w-[16%] top-[12%] left-[25%] block md:block sm:w-[calc(100%-40px)] sm:top-1/2 sm:left-[20px] sm:transform sm:-translate-y-1/2">
                <img 
                  src="https://i.pinimg.com/736x/f2/df/c7/f2dfc73493b1e9a8c3c8c71bc0336b77.jpg" 
                  alt="Innovation 1" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 4 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[16%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/70/22/fd/7022fde301338644bca180ebce7d51a7.jpg" 
                  alt="Innovation 2" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 4 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[16%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/32/ef/3e/32ef3e2ce15db067e704c43d1bcb4475.jpg" 
                  alt="Innovation 3" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 4 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] left-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/71/10/33/7110333d396b0e8bb778da6bb0e36b55.jpg" 
                  alt="Innovation 4" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 4 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
              <span className="absolute w-[29%] top-[54%] right-[5%] block md:block sm:hidden">
                <img 
                  src="https://i.pinimg.com/736x/32/ef/3e/32ef3e2ce15db067e704c43d1bcb4475.jpg" 
                  alt="Innovation 3" 
                  className={`w-full h-auto block transition-all duration-300 ease-in-out rounded-lg shadow-lg border-2 border-green-600 ${activeCase === 4 ? 'scale-100' : 'scale-[0.6] origin-top'}`}
                />
              </span>
            </div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block list-none text-[20vw] font-sans font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(34,197,94,0.3)] z-[1] transition-all duration-300 ${activeCase === 4 ? 'opacity-100' : 'opacity-0'}`}>
              04
            </div>
            <div className={`absolute bottom-[25px] left-1/2 w-[40px] ml-[-70px] block tracking-wider text-center list-none text-[13px] font-sans font-light leading-none text-green-500 z-[6] transition-all duration-300 ${activeCase === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
              04
            </div>
          </li>
        </ul>

        {/* Logo and Tagline */}
        {/* <div className="absolute top-8 left-8 z-50">
          <div className="font-bold text-2xl text-white">GrowthHub<span className="text-green-500">.</span></div>
          <div className="text-sm text-green-400">Empowering Startups</div>
        </div> */}

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-8 z-50 flex items-center">
          <div className="w-64 h-1 bg-opacity-30 bg-green-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300" 
              style={{ width: `${(activeCase / 4) * 100}%` }}
            ></div>
          </div>
          <div className="ml-4 text-sm text-green-400">
            {activeCase}/4
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupImageSlider;