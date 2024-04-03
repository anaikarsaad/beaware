import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

const SuccessAnimation: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const animationData = require('../images/Success_animation.json');

  useEffect(() => {
    let anim: AnimationItem | undefined;

    const loadAnimation = async () => {
      if (container.current) {
        anim = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData,
        });

        anim.addEventListener('DOMLoaded', () => {
          if (anim) {
            anim.play();
          }
        });
      }
    };

    loadAnimation();

    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationData]);

  return <div ref={container}></div>;
};

export default SuccessAnimation;
