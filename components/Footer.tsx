import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Brand & About */}
                <div className={styles.brandColumn}>
                    <h3>ZA Traders.</h3>
                    <p className={styles.brandDescription}>
                        Empowering fashion brands with premium woven labels, tags, and accessories.
                        Quality craftsmanship meets modern design.
                    </p>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className={styles.sectionTitle}>Company</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/blog">Our Blog</Link></li>
                        <li><Link href="/contact-us">Contact</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h4 className={styles.sectionTitle}>Support</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/products">Our Products</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                        <li><Link href="/returns">Returns & Exchange</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact & Newsletter */}
                <div>
                    <h4 className={styles.sectionTitle}>Stay Connected</h4>
                    <div className={styles.contactInfo}>
                        <p>📍 Ichra Bazaar, Lahore, Pakistan</p>
                        <p>📞 +92 312 2189966</p>
                        <p>✉ admin@zatraders.pk</p>
                    </div>

                    <div className={styles.newsletter}>
                        <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>Subscribe to our newsletter</p>
                        <div className={styles.inputGroup}>
                            <input type="email" placeholder="Your email address" />
                            <button aria-label="Subscribe"><i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    © {new Date().getFullYear()} ZA Traders. All Rights Reserved.
                </div>
                <div className={styles.paymentMethods}>
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fab fa-cc-apple-pay"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
