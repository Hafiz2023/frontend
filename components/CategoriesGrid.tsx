import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoriesGrid.module.css';

const CATEGORIES = [
    {
        id: 1,
        title: "Woven Labels",
        description: "High quality custom woven labels for your clothing brand. Perfect for main labels, size labels, and care labels.",
        image: "/tag-fabric-white.png", // utilizing available images
        link: "/category/woven-labels"
    },
    {
        id: 2,
        title: "Leather Patches",
        description: "Premium leather patches for jeans, bags, and caps. Available in genuine and faux leather with embossed logos.",
        image: "/tag-black-gold.png",
        link: "/category/leather-patches"
    },
    {
        id: 3,
        title: "Printed Tags",
        description: "Custom printed hang tags and fabric tags. Wide range of paper stocks and finishes available.",
        image: "/printed-tags-banner.png",
        link: "/category/printed-tags"
    },
    {
        id: 4,
        title: "Paper Bags",
        description: "Eco-friendly and stylish paper bags for your retail store. Custom printed with your brand logo.",
        image: "/tag-kraft-minimal.png",
        link: "/category/paper-bags"
    },
    {
        id: 5,
        title: "Hang Tags",
        description: "High-quality hang tags to give your products a professional look. Various shapes and sizes.",
        image: "/hero-bg.png",
        link: "/category/hang-tags"
    }

];

const CategoriesGrid = () => {
    return (
        <section className={styles.gridWrapper}>
            <h2 className={styles.sectionTitle}>Our Products</h2>
            <div className={styles.grid}>
                {CATEGORIES.map((cat) => (
                    <div key={cat.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.content}>
                            <div>
                                <h3 className={styles.title}>{cat.title}</h3>
                                <p className={styles.description}>{cat.description}</p>
                            </div>
                            <Link href={cat.link} className={styles.link}>
                                Learn More &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesGrid;
