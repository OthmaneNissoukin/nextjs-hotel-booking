"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Slider({ height = "calc(100vh - 64px)", imgPriority = false, images, children }) {
  const [active, setActive] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    const ref = setInterval(() => {
      setActive(active >= images.length ? 1 : active + 1);
    }, 5000);

    return () => clearInterval(ref);
  });

  function handleTranslate(index) {
    clearInterval(ref);
    setActive(index);
  }

  return (
    <div className="slider" style={{ maxHeight: height }}>
      {/* OVERLAY */}
      <div className="slider-overlay">{children}</div>
      {/* END OVERLAY */}

      {/* SLIDES */}
      <div className="slideshow">
        {images.map((item, index) => (
          <div key={index} className={`slide ${active === index + 1 ? "active" : ""}`}>
            <Image priority={imgPriority} fill src={item} alt="slider image" />
          </div>
        ))}
      </div>
      {/* END SLIDES */}

      {/* SLIDER MENU */}
      <nav className="slider-menu">
        {images.map((undefined, index) => (
          <button
            key={index}
            onClick={() => handleTranslate(index + 1)}
            className={active === index + 1 ? "active" : ""}
          ></button>
        ))}
      </nav>
      {/* END SLIDER MENU */}

      {/* SLIDER CONTROL */}
      {/* END SLIDER CONTROL */}
    </div>
  );
}

export default Slider;
