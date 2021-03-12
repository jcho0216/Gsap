import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../App.scss';
import gsap from 'gsap';

//images
import austin from '../images/austin.webp';
import beijing from '../images/beijing.webp';
import dallas from '../images/dallas.webp';
import newyork from '../images/newyork.webp';
import sanfrancisco from '../images/sanfrancisco.webp';

const cities = [
  {name: 'Austin', image: austin},
  {name: 'Beijing', image: beijing},
  {name: 'Dallas', image: dallas},
  {name: 'New York', image: newyork},
  {name: 'Sanfrancisco', image: sanfrancisco}
]


const Hamburger = ({state}) => {
//for animated dom nodes
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2= useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);




  useEffect(() => {
    if(state.clicked === false) {
      //close menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menu, {
        duration: 1,
        css: {display: "none"}
      })
      // menu.style.display = "block";
    } else if (
      state.clicked === true || 
      (state.clicked === true && state.initial === null)
      ) {
      //open menu
      gsap.to(menu, {
        duration: 0,
        css: {display: "block"}
      })
      gsap.to([revealMenuBackground, revealMenu], {
        duration: 0,
        delay: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(revealMenuBackground, revealMenu);
      fadeInUp(info);
      staggerText(line1, line2, line3);
      // menu.style.display = "block";
    }
  }, [state]);


  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: .8,
      height: 0,
      transformOrigin: "right top",
      skewY: 2,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.1
      }
    })
  }


  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      
      opacity:0,
      ease: 'power3.inOut'
    })
  }


  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: .8,
      y: 100,
      delay: .1,
      height: 0,
      ease: 'power3.inOut',
      stagger: {
        amount: .3
      }
    })
  }

  const handleCity = city => {
    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`
    });

    gsap.to(cityBackground, {
      duration: 0,
      opacity: 1,
      ease: 'power3.inOut',
    });

    gsap.from(cityBackground, {
      duration: .3,
      skewY: 2,
      transformOrigin: 'right top'
    });
  }


  const handleCityReturn = () => {
    gsap.to(cityBackground, {
      duration: 0,
      opacity: 0
    })
  }

  const handleHover = e => {
    gsap.to(e.target, {
      duration: .1,
      y: 3,
      skewX: 4,
      ease: 'power3.inOut'
    })
  }

  const handleHoverExit = (e) => {
    gsap.to(e.target, {
      duration: .1,
      y: -3,
      skewX: 0,
      ease: 'power3.inOut'
    })
  }

  return (
    <div ref={el => menu = el} className='hamburger-menu'>  
    <div className="menu-secondary-background-color" ref={el => revealMenuBackground = el}></div>
    <div className="menu-layer" ref={el => revealMenu = el}>
      <div ref={el => cityBackground = el} className="menu-city-background"></div>
      <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li><Link 
                  onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)}
                  to='/opportunities' ref={el => line1 = el}>Opportunities</Link>
                  </li>

                  <li><Link 
                  onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)} to='/solutions' ref={el => line2 = el}>Solutions
                  </Link></li>

                  <li><Link 
                  onMouseEnter={e => handleHover(e)}
                  onMouseOut={e => handleHoverExit(e)} to='/contact-us' ref={el => line3 = el}>Contact us</Link>
                  </li>
                </ul>
              </nav>
              <div className="info" ref={el => info = el}>
                <h3>Our Promise</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque purus quis odio aliquet egestas. Sed in enim porttitor, ullamcorper leo at, congue purus. Etiam malesuada bibendum sem, eget imperdiet tortor scelerisque accumsan. Integer placerat eget nulla nec tempus. Nunc sit amet hendrerit libero, ut ornare est. Cras suscipit aliquam risus, eget placerat massa iaculis vel. Praesent euismod non nisl nec maximus. Donec semper, erat sit amet imperdiet porta, dolor turpis suscipit erat, a accumsan ante dolor a augue. Donec iaculis eros non elit auctor egestas. Fusce viverra posuere viverra. Suspendisse luctus sollicitudin arcu, non rhoncus enim.</p>
              </div>
              <div className="locations">
                Locations:
                {cities.map(el => (
                  <span key={el.name} onMouseEnter={()=>{handleCity(el.image)}} onMouseOut={handleCityReturn}>{el.name}</span>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
    
};

export default Hamburger;
