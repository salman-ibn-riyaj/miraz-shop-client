"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiArrowRight,
  FiHeart,
  FiStar,
  FiWatch,
  FiGrid,
  FiCheckCircle,
  FiLayers,
} from "react-icons/fi";
import Link from "next/link";

export default function Hero() {
  const categories = [
    { icon: FiLayers, text: "Exclusive 3-Piece Collections" },
    { icon: FiHeart, text: "Beauty & Health Essentials" },
    { icon: FiWatch, text: "Luxury Watches & Ornaments" },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-20 text-foreground transition-colors duration-200">
      {/* Background Glow Highlights */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading & Call to Actions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Badge */}
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

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Elegance & Style Redefined at{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
              Miraz Shop
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-default-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Discover exquisite 3-piece designer wear, premium beauty care products, elegant ornaments, and timeless watches crafted to match your distinct beauty and lifestyle.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/3-pcs"
                color="primary"
                variant="solid"
                size="lg"
                startcontent={<FiShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />}
                className="group relative overflow-hidden font-semibold tracking-wide px-8 py-3.5 w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-primary bg-[length:200%_auto] text-white shadow-lg shadow-primary/30 transition-all duration-300 ease-out hover:bg-[position:right_center] hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              >
                Explore Three-Piece
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/beauty-health"
                variant="flat"
                color="default"
                size="lg"
                startcontent={<FiHeart className="h-5 w-5 text-rose-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />}
                className="group relative font-semibold tracking-wide px-8 py-3.5 w-full sm:w-auto rounded-xl bg-background/60 backdrop-blur-md border border-default-200 hover:border-rose-200 dark:hover:border-rose-900 text-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
              >
                Beauty & Health
              </Link>
            </motion.div>
          </motion.div>

          {/* Category Highlights */}
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

        {/* Right Column: Visual Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Card Showcase Container */}
          <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-primary/20 via-content2 to-content1 border border-default-200 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">

            {/* Top Product Tag */}
            <div className="flex justify-between items-center z-10">
              <span className="text-xs font-bold tracking-wider text-default-400 uppercase">
                Trending Arrival
              </span>
              <Chip color="warning" size="sm" variant="flat" className="font-bold">
                NEW SEASON
              </Chip>
            </div>

            {/* Central Graphic Element */}
            <div className="relative my-auto flex flex-col items-center justify-center text-center z-10 py-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-xl mb-4"
              >
                <FiWatch className="w-14 h-14" />
              </motion.div>
              <h3 className="text-xl font-extrabold text-foreground">
                Ornaments & Luxury Watches
              </h3>
              <p className="text-xs text-default-500 max-w-xs mt-1">
                Handcrafted ornaments and luxury timepieces designed for every special occasion.
              </p>
            </div>

            {/* Floating Quick Action Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="z-10 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-default-200 flex items-center justify-between shadow-md"
            >
              <div>
                <p className="text-xs text-default-400">Exclusive Offers</p>
                <p className="text-base font-extrabold text-primary">Up to 40% OFF</p>
              </div>
              <Button
                as={NextLink}
                href="/ornaments-watches"
                size="sm"
                color="primary"
                variant="flat"
                startcontent={<FiArrowRight className="h-4 w-4" />}
                className="font-bold"
              >
                Shop Collection
              </Button>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}