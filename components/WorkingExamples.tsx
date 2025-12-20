import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WorkingExamples.module.css';

const EXAMPLES = [
    {
        id: 1,
        title: "Laser Engraving Cap Leather Patches",
        category: "Leather Patches",
        date: "03/04/2023",
        description: "We also make laser engraving cap leather patches in Pakistan. Our products are reliable and prices are very reasonable. Our clients knows us by our...",
        image: "/tag-black-gold.png", // Using existing relevant image
        link: "/category/leather-patches"
    },
    {
        id: 2,
        title: "Print Woven Lace",
        category: "Lace",
        date: "20/06/2024",
        description: "We also make print woven lace in Pakistan. We are known for our product quality and reasonable prices. Contact us for booking your order and any inquiry.",
        image: "/tag-fabric-white.png", // Using existing relevant image for lace/fabric
        link: "/category/lace"
    },
    {
        id: 3,
        title: "Printed Tags for Jeans",
        category: "Printed Tags",
        date: "06/10/2022",
        description: "We also make printed Tags for Jeans. We are known for our quality and good prices. You can contact us for any information or order...",
        image: "/printed-tags-banner.png", // Using existing relevant image
        link: "/category/printed-tags"
    }
];

const WorkingExamples = () => {
    return (
        <section className={styles.sectionWrapper}>
            <span className={styles.subHeading}>Recent Posts</span>
            <h2 className={styles.mainHeading}>Our Working Examples</h2>

            <div className={styles.grid}>
                {EXAMPLES.map((item) => (
                    <article key={item.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={styles.cardImage}
                            />
                        </div>
                        <div className={styles.metaInfo}>
                            {item.category} - {item.date}
                        </div>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <p className={styles.cardDescription}>{item.description}</p>
                        <Link href={item.link} className={styles.readMoreBtn}>
                            Read More
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default WorkingExamples;
