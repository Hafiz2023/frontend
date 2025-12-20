import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section className={styles.aboutWrapper}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <Image
                        src="/about-us-sticker.png"
                        alt="About Us"
                        fill
                        className={styles.aboutImage}
                    />
                </div>

                <div className={styles.contentSection}>
                    <span className={styles.subHeading}>About Us</span>
                    <h2 className={styles.title}>ZA Traders Pakistan</h2>
                    <p className={styles.description}>
                        ZA Traders Pakistan is providing best quality printed tags, leather patches, paper bags and woven labels since 2000.
                        Our clients know us by our affordable cost, product quality, and reliability.
                        ZA Traders has built up its credentials through on time deliveries to win over the confidence of its buyers.
                    </p>
                    <Link href="/about-us" className={styles.btn}>
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
