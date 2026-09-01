"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src?: string;
  alt: string;
  label?: string;
  bg?: string;
};

const slides: Slide[] = [
  { src: "/assets/car4.jpg", alt: "" },
  { src: "/assets/car4.jpg", alt: "" },
  { src: "/assets/car4.jpg", alt: "" },
  { src: "/assets/car4.jpg", alt: "" },
];

const GOLD = "#c9a227";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="p-1" style={{ border: `2px solid ${GOLD}` }}>
        <div className="p-1.5" style={{ border: `1px solid ${GOLD}` }}>
          <div className="relative aspect-3/1 overflow-hidden bg-paper-raised">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={
                  "absolute inset-0 transition-opacity duration-700 " +
                  (i === index ? "opacity-100" : "opacity-0")
                }
              >
                {slide.src ? (
                  <Image src={slide.src} alt={slide.alt} fill className="object-cover" />
                ) : (
                  <div
                    className={
                      "flex h-full w-full items-center justify-center text-2xl font-display font-semibold text-ink-soft " +
                      (slide.bg ?? "bg-paper")
                    }
                  >
                    {slide.label}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                "h-1.5 w-1.5 rounded-full " +
                (i === index ? "bg-saffron" : "bg-line")
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
