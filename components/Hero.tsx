'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const SLIDES = [
    {
        id: 1,
        title: "Quality Custom Labels for Clothing",
        subtitle: "Our commitment to produce quality and top-notch garment accessories offers a great deal of sustainability in all our products. We aim to expedite our progress towards breaking the norms of...",
        image: "/hero-bg.png",
        link: "/quality-custom-labels-and-patches",
        cta: "Learn More"
    },
    {
        id: 2,
        title: "Custom Branding Solutions",
        subtitle: "Labels are a great way to promote your business or brand your products. Our custom printed labels are produced on top-of-the-line printing presses.",
        image: "/printed-tags-banner.png",
        link: "/quality-custom-labels-and-patches",
        cta: "Learn More"
    },
    {
        id: 3,
        title: "Vast Variety of Labels",
        subtitle: "A high-quality label attracts more customers because it represents professionalism, style, and dedication.",
        image: "/tag-black-gold.png",
        link: "/category/woven-labels",
        cta: "Learn More"
    }
];

const Hero = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect();
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <section className={styles.heroWrapper}>
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {SLIDES.map((slide) => (
                        <div key={slide.id} className={styles.embla__slide}>
                            <div className={styles.slideImageContainer}>
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    priority={slide.id === 1}
                                    className={styles.slideImage}
                                />
                                <div className={styles.overlay}></div>
                            </div>
                            <div className={styles.slideContent}>
                                <h1 className={styles.slideTitle}>{slide.title}</h1>
                                <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                                <div className={styles.buttonGroup}>
                                    <Link href={slide.link} className={styles.primaryButton}>
                                        {slide.cta}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.dotsContainer}>
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
