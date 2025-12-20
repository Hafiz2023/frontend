import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div>
                    <h4 className={styles.sectionTitle}>About ZA Traders</h4>
                    <p className={styles.text}>
                        We provide high quality printed tags, woven labels, leather patches, and more for your brand.
                        Enhance your product identity with our premium manufacturing.
                    </p>
                </div>
                <div>
                    <h4 className={styles.sectionTitle}>Quick Links</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="/contact-us">Contact Us</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className={styles.sectionTitle}>Contact Info</h4>
                    <p className={styles.text}>
                        Email: admin@zatraders.pk<br />
                        Phone: +92 312 2189966<br />
                        Address: Ichra Bazaar, Lahore, Pakistan
                    </p>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} ZA Traders. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
