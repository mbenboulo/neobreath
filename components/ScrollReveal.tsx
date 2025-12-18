"use client";

import { motion } from "framer-motion";

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
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 30 : -30,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
