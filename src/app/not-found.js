"use client";

import React, { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { Button } from "@heroui/react";
import { FiHome, FiShoppingBag, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

export default function NotFound() {
  const badgeRef = useRef(null);
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Initialize Lenis Smooth Scrolling & GSAP Animations
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP floating animation for the 404 Bag Icon
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -12,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Custom Magnetic Cursor Follower Engine
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[80vh] flex items-center justify-center px-4 py-12 overflow-hidden select-none"
      >
        {/* Custom Glowing Cursor Follower */}
        <div
          ref={cursorRef}
          className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-[2px] z-50 transition-all duration-300 ${
            isHovered ? "w-16 h-16 bg-primary/20 scale-125" : "w-8 h-8"
          }`}
        />

        <div className="max-w-md w-full text-center flex flex-col items-center z-10">
          {/* GSAP Floating Container + Framer Entrance */}
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mb-8 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-24 h-24 rounded-3xl bg-content1 border border-default-200/80 flex items-center justify-center text-foreground shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiShoppingBag className="w-11 h-11 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* 404 Pill Badge with Pulsing Glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.4,
              }}
              className="absolute -bottom-2 -right-3 bg-amber-500 text-black font-black text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-background"
            >
              404
            </motion.div>
          </motion.div>

          {/* Heading Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-3"
          >
            Item Not Found
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-default-500 text-base max-w-sm mb-10 leading-relaxed"
          >
            Sorry, the page or product you are looking for in{" "}
            <span className="font-semibold text-foreground">Miraz Shop</span> does
            not exist or has been moved to a new shelf.
          </motion.p>

          {/* Action Buttons with Hover Magnets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <NextLink href="/" passHref className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Button
                  color="default"
                  variant="flat"
                  size="lg"
                  startContent={<FiHome className="h-5 w-5" />}
                  className="font-semibold w-full sm:w-auto px-6 border border-default-200"
                >
                  Back to Home
                </Button>
              </motion.div>
            </NextLink>

            <NextLink href="/electronics" passHref className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Button
                  color="primary"
                  variant="solid"
                  size="lg"
                  startContent={<FiSearch className="h-5 w-5" />}
                  className="font-semibold w-full sm:w-auto px-6 shadow-md"
                >
                  Browse Products
                </Button>
              </motion.div>
            </NextLink>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}