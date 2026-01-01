'use client';

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./SomeFacts.module.css";

const stats = [
    { number: 2450, label: "PLACEMENT" },
    { number: 13, label: "YEARS EXPERIENCE", suffix: "+" },
    { number: 300, label: "BRANDS", suffix: "+" },
    { number: 8, label: "COUNTRIES", suffix: "+" },
];

export default function SomeFacts() {
    const ref = useRef<HTMLDivElement | null>(null);
    const controls = useAnimation();
    const [counts, setCounts] = useState(stats.map(() => 0));
    const [animated, setAnimated] = useState(stats.map(() => false));
    const [sectionVisible, setSectionVisible] = useState(false);

    // Smooth Counter Function (for one item)
    const animateSingleCounter = useCallback(
        (index: number) => {
            if (animated[index]) return; // Skip if already animated
            setAnimated((prev) => {
                const copy = [...prev];
                copy[index] = true;
                return copy;
            });

            const duration = 2000; // milliseconds
            const fps = 60;
            const steps = duration / (1000 / fps);
            let frame = 0;

            const easeOutQuad = (t: number) => t * (2 - t);

            const interval = setInterval(() => {
                frame++;
                const progress = easeOutQuad(frame / steps);
                setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(stats[index].number * progress);
                    return newCounts;
                });
                if (frame >= steps) {
                    clearInterval(interval);
                    setCounts((prev) => {
                        const newCounts = [...prev];
                        newCounts[index] = stats[index].number;
                        return newCounts;
                    });
                }
            }, 1000 / fps);
        },
        [animated]
    );

    // Animate all counters when section scrolls into view
    const startAllCounters = useCallback(() => {
        stats.forEach((_, i) => animateSingleCounter(i));
    }, [animateSingleCounter]);

    // Detect when section is in view (only once)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !sectionVisible) {
                    controls.start("visible");
                    startAllCounters();
                    setSectionVisible(true);
                }
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [controls, sectionVisible, startAllCounters]);

    return (
        <section
            ref={ref}
            className={styles.section}
        >
            {/* Background Glow */}
            <div className={styles.glowBackground}></div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1 }}
                className={styles.header}
            >
                <h2 className={styles.titleBadge}>
                    SOME FACTS
                </h2>
                <div className={styles.underline}></div>
            </motion.div>

            {/* Stats Section */}
            <div className={styles.grid}>
                {stats.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={controls}
                        variants={{
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { delay: i * 0.2 },
                            },
                        }}
                        whileHover={{
                            scale: 1.07,
                            y: -5,
                            transition: { type: "spring", stiffness: 80, damping: 10 },
                        }}
                        onMouseEnter={() => animateSingleCounter(i)}
                        className={styles.card}
                    >
                        {/* Hover Glow Layer */}
                        <div className={styles.hoverGlow}></div>

                        <h3 className={styles.number}>
                            {counts[i]}
                            {item.suffix && counts[i] >= item.number ? item.suffix : ""}
                        </h3>

                        <p className={styles.label}>
                            {item.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
