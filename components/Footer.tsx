"use client";

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaArrowUp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FiChevronRight, FiSend } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.glowEffect}></div>
            <div className={styles.container}>

                {/* Brand & About */}
                <div className={styles.brandColumn}>
                    <h3 className={styles.brandLogo}>ZA Traders<span>.</span></h3>
                    <p className={styles.brandDescription}>
                        Empowering fashion brands with premium woven labels, tags, and accessories. 
                        We blend quality craftsmanship with modern design to elevate your brand identity.
                    </p>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.linksColumn}>
                    <h4 className={styles.sectionTitle}>Company</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/"><FiChevronRight className={styles.linkIcon} /> Home</Link></li>
                        <li><Link href="/about-us"><FiChevronRight className={styles.linkIcon} /> About Us</Link></li>
                        <li><Link href="/careers"><FiChevronRight className={styles.linkIcon} /> Careers</Link></li>
                        <li><Link href="/blog"><FiChevronRight className={styles.linkIcon} /> Our Blog</Link></li>
                        <li><Link href="/contact-us"><FiChevronRight className={styles.linkIcon} /> Contact</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div className={styles.linksColumn}>
                    <h4 className={styles.sectionTitle}>Support</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/products"><FiChevronRight className={styles.linkIcon} /> Our Products</Link></li>
                        <li><Link href="/faq"><FiChevronRight className={styles.linkIcon} /> FAQs</Link></li>
                        <li><Link href="/shipping"><FiChevronRight className={styles.linkIcon} /> Shipping Policy</Link></li>
                        <li><Link href="/returns"><FiChevronRight className={styles.linkIcon} /> Returns & Exchange</Link></li>
                        <li><Link href="/privacy-policy"><FiChevronRight className={styles.linkIcon} /> Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact & Newsletter */}
                <div className={styles.contactColumn}>
                    <h4 className={styles.sectionTitle}>Stay Connected</h4>
                    <div className={styles.contactInfo}>
                        <p><FaMapMarkerAlt className={styles.contactIcon} /> <span>Ichra Bazaar, Lahore, Pakistan</span></p>
                        <p><FaPhoneAlt className={styles.contactIcon} /> <span>+92 312 2189966</span></p>
                        <p><FaEnvelope className={styles.contactIcon} /> <span>admin@zatraders.pk</span></p>
                    </div>

                    <div className={styles.newsletter}>
                        <p className={styles.newsletterText}>Subscribe to our newsletter</p>
                        <div className={styles.inputGroup}>
                            <input type="email" placeholder="Email address..." aria-label="Email address" />
                            <button aria-label="Subscribe" className={styles.subscribeBtn}><FiSend /></button>
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.bottomBarWrapper}>
                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} <span className={styles.highlight}>ZA Traders</span>. All Rights Reserved.
                    </div>
                    
                    <button onClick={scrollToTop} className={styles.backToTop} aria-label="Back to top">
                        <FaArrowUp />
                    </button>
                    
                    <div className={styles.paymentMethods}>
                        <i className="fab fa-cc-visa" title="Visa"></i>
                        <i className="fab fa-cc-mastercard" title="Mastercard"></i>
                        <i className="fab fa-cc-paypal" title="PayPal"></i>
                        <i className="fab fa-cc-apple-pay" title="Apple Pay"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
