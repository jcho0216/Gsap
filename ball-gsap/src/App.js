import React, { useEffect, useRef, useState } from 'react';
import { TweenMax, Power3} from 'gsap';
import './App.css';
function App() {
  let app = useRef(null);
  let circle = useRef(null);
  let circleRed = useRef(null);
  let circleBlue = useRef(null);

  const handleExpand = () => {
    TweenMax.to(circle, .8, {width: 200, height: 200, ease: Power3.easeOut});
    setExpand(true);
  }

  const handleShrink = () => {
    TweenMax.to(circle, .8, {width: 75, height: 75, ease: Power3.easeOut});
    setExpand(false);
  }

  const handleExpandRed = () => {
    TweenMax.to(circleRed, .8, {width: 200, height: 200, ease: Power3.easeOut});
    setExpand(true);
  }

  const handleShrinkRed = () => {
    TweenMax.to(circleRed, .8, {width: 75, height: 75, ease: Power3.easeOut});
    setExpand(false);
  }

  const handleExpandBlue = () => {
    TweenMax.to(circleBlue, .8, {width: 200, height: 200, ease: Power3.easeOut});
    setExpand(true);
  }

  const handleShrinkBlue = () => {
    TweenMax.to(circleBlue, .8, {width: 75, height: 75, ease: Power3.easeOut});
    setExpand(false);
  }


  const [ expand, setExpand] = useState(false);

  useEffect(() => {
    console.log(circle, circleRed, circleBlue);
    TweenMax.to(app, 0, {css: {visibility: 'visible'}})
    // TweenMax.from(circle, .8, {opacity: 0, x: 40, ease: Power3.easeOut})
    // TweenMax.from(circleRed, .8, {opacity: 0, x: 40, ease: Power3.easeOut, delay: 0.2})
    // TweenMax.from(circleBlue, .8, {opacity: 0, x: 40, ease: Power3.easeOut, delay: 0.4})
    TweenMax.staggerFrom([circle, circleRed, circleBlue], .8, {opacity: 0, x: 40, ease: Power3.easeOut}, 0.2);
  }, []);
  return (
    <div className="App" ref={el => app = el}>
      <header className="App-header">
        <div className="circle-container">
          <div className="circle" ref={el=>circle = el} onClick={expand !== true ? handleExpand : handleShrink}></div>
          <div className="circle red" ref={el=>circleRed = el} onClick={expand !== true ? handleExpandRed : handleShrinkRed}></div>
          <div className="circle blue" ref={el=>circleBlue = el} onClick={expand !== true ? handleExpandBlue : handleShrinkBlue}></div>
        </div>
      </header>
    </div>
  );
}

export default App;
