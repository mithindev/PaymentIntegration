"use client";

import React, { useState } from "react";
import { delay, motion } from "framer-motion";

const ShareExprience = () => {
  const [animate, setAnimate] = useState(false);
  const [frontImage, setFrontImage] = useState<number | null>(null);

  const images = [
    { title: "Nothing", src: "/image1.jpg", tilt: 0 },
    { title: "Nothing", src: "/image2.jpg", tilt: -20 },
    { title: "Nothing", src: "/image3.jpg", tilt: 10 },
  ];

  const imageAnimationVariant = {
    initial: (index: number) => ({
      scale: 0,
      x: index === 1 ? -50 : index === 2 ? 50 : 0,
      zIndex: 0,
      opacity: 0,
    }),
    animate: (index: number) => ({
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.15,
        duration: 5,
        ease: [0.9, 0.1, 0.25, 1],
      },
    }),
    front: {
      scale: 1.1,
      zIndex: 10,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  React.useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="center h-40 w-full flex-col mx-auto bg-black">
      <div className="relative cursor-pointer center bg-primary p-4 border-2 rounded-[15px] flex-col gap-4">
        <div className="relative h-20 w-20">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.title}
              className="h-20 absolute w-20 object-cover border-4 border-white rounded-2xl"
              style={{
                rotate: image.tilt,
                right: index === 2 ? index * -8 : index * 6,
                top: index >= 1 ? 18 : index * 6,
              }}
              variants={imageAnimationVariant}
              initial="initial"
              animate={
                frontImage === index ? "front" : animate ? "animate" : "initial"
              }
              custom={index}
              onClick={() => setFrontImage(index)}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-center text-primary-foreground">
            Share this wishlist with your group
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Everyone can add homes, write notes, and vote for their favorites
          </p>
        </div>
        <button
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full h-9 rounded-md px-4"
          onClick={() => {
            setAnimate(false);
            setFrontImage(null);
            setTimeout(() => setAnimate(true), 10);
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
  
};
export default ShareExprience;
