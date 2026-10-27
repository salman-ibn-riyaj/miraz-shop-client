"use client";

import React, { useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiShoppingBag,
  FiArrowRight,
  FiHeart,
  FiStar,
  FiWatch,
  FiLayers,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const categories = [
    { icon: FiLayers, text: "Exclusive 3-Piece Collections" },
    { icon: FiHeart, text: "Beauty & Health Essentials" },
    { icon: FiWatch, text: "Luxury Watches & Ornaments" },
  ];

  const reduceMotion = useReducedMotion();

  // ---------- refs ----------
  const sectionRef = useRef(null);
  const frameRef = useRef(null); // image frame (GSAP shine + glow)
  const parallaxRef = useRef(null); // inner layer (GSAP scroll parallax)
  const shineRef = useRef(null);
  const glowRef = useRef(null);

  // ---------- Framer Motion: 3D tilt ----------
  const mx = useMotionValue(0); // -0.5 .. 0.5
  const my = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), springCfg);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), springCfg);

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // ---------- GSAP: scroll parallax + shine sweep + glow pulse ----------
  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Scroll parallax (Lenis এর সাথে ScrollTrigger sync থাকলে আরও smooth হবে)
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: -5, scale: 1.12 },
        {
          yPercent: 5,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Shine sweep — প্রতি কয়েক সেকেন্ডে একবার
      gsap.fromTo(
        shineRef.current,
        { xPercent: -150 },
        {
          xPercent: 250,
          duration: 1.6,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 3.5,
          delay: 1.2,
        }
      );

      // Glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.9,
        scale: 1.08,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-12 md:py-20 text-foreground transition-colors duration-200"
    >
      {/* Background Glow Highlights */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 space-y-6 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex justify-center lg:justify-start"
          >
            <Chip
              variant="flat"
              color="primary"
              size="md"
              startcontent={<FiStar className="h-3.5 w-3.5" />}
              className="font-semibold text-xs uppercase tracking-wider px-3"
            >
              Premium Lifestyle & Fashion Collection
            </Chip>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Elegance & Style Redefined at{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
              Miraj Shop
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-default-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Discover exquisite 3-piece designer wear, premium beauty care
            products, elegant ornaments, and timeless watches crafted to match
            your distinct beauty and lifestyle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Explore Watches */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <NextLink
                  href="/electronicsandgadgets/watches/menswatch"
                  className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-xl px-8 py-3.5 font-semibold tracking-wide text-white
        bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_auto]
        shadow-lg shadow-orange-500/40 dark:shadow-orange-500/30
        ring-1 ring-white/20
        transition-all duration-500 ease-out
        hover:bg-[position:right_center] hover:shadow-xl hover:shadow-orange-500/60"
                >
                  {/* Shine sweep */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[450%]" />

                  <FiWatch className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="relative">Explore Watches</span>
                  <FiArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </NextLink>
              </motion.div>

              {/* Explore Wallets */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <NextLink
                  href="/accessories/wallets"
                  className="group relative flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-xl px-8 py-3.5 font-semibold tracking-wide text-white
        bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-[length:200%_auto]
        shadow-lg shadow-teal-500/40 dark:shadow-teal-500/30
        ring-1 ring-white/20
        transition-all duration-500 ease-out
        hover:bg-[position:right_center] hover:shadow-xl hover:shadow-teal-500/60"
                >
                  {/* Shine sweep */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-[450%]" />

                  <FiShoppingBag className="relative h-5 w-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="relative">Explore Wallets</span>
                  <FiArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </NextLink>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-t border-default-200"
          >
            {categories.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-default-600">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="lg:col-span-7 relative"
          style={{ perspective: 1200 }}
        >
          {/* GSAP glow behind the image */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/40 via-amber-400/20 to-cyan-400/30 opacity-60 blur-2xl"
          />

          {/* Framer Motion 3D tilt */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: reduceMotion ? 0 : rotateX,
              rotateY: reduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <div
              ref={frameRef}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-default-200 shadow-2xl"
            >
              {/* GSAP parallax layer */}
              <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="/miraj-shop-banner.webp"
                  alt="Miraj Shop - Premium Lifestyle: watches, wallets, trimmers, three-piece, kids book"
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* GSAP shine sweep */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  ref={shineRef}
                  className="absolute top-0 left-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(50px)" }}
              className="absolute -top-4 -right-2 sm:-right-4"
            >
              <Chip color="warning" variant="shadow" className="font-bold">
                EID COLLECTION
              </Chip>
            </motion.div>

            {/* Floating offer card — bottom left */}
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
              style={{ transform: "translateZ(70px)" }}
              className="absolute -bottom-5 left-4 sm:left-6 bg-background/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-default-200 flex items-center gap-4 shadow-xl"
            >
              <div>
                <p className="text-xs text-default-400">Exclusive Offers</p>
                <p className="text-base font-extrabold text-primary">
                  Up to 40% OFF
                </p>
              </div>
              <Button
                as={NextLink}
                href="/ornaments-watches"
                size="sm"
                color="primary"
                variant="flat"
                endContent={<FiArrowRight className="h-4 w-4" />}
                className="font-bold"
              >
                Shop Collection
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}