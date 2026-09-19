"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";

export default function FeaturedMensWatch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/api/featured-mens-watch`
        );
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured watches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Container variants for staggered entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Card entrance variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-background text-foreground overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] font-semibold text-primary mb-2 block"
            >
              Curated Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              Featured Men's Timepieces
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-md text-sm sm:text-base"
          >
            Discover masterfully crafted luxury watches engineered for elegance, precision, and durability.
          </motion.p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[420px] rounded-2xl bg-content2/50 animate-pulse border border-border"
              />
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && products.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <motion.div key={product._id || product.id} variants={itemVariants} className="h-full">
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No featured timepieces available at the moment.
          </div>
        )}

        {/* Gorgeous Animated "See All" Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link href="/electronicsandgadgets/watches/menswatch">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.04 },
                tap: { scale: 0.98 },
              }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-bold text-white dark:text-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Subtle Ambient Hover Glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="relative z-10 tracking-wider">See All Products</span>

              {/* Sliding Arrow Icon Animation */}
              <motion.span
                variants={{
                  hover: { x: 5 },
                  tap: { x: 0 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative z-10 text-lg"
              >
                <FiArrowRight />
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}