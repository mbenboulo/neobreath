"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down";
}

export default function ScrollReveal({
    children,
    className = "",
    direction = "up",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(
        scrollYProgress,
        [0, 0.15, 0.85, 1],
        direction === "up" ? [30, 0, 0, -30] : [-30, 0, 0, 30]
    );

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
