'use client';

import React, { useState } from 'react';
import styles from './Faq.module.css';
import Link from 'next/link';

export default function FAQPage() {
    // FAQs state to toggle active item
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the minimum order quantity (MOQ)?",
            answer: "Our minimum order quantity varies slightly by product type to ensure cost-effectiveness for you. Generally, for woven labels and hang tags, the MOQ is 1,000 pieces. For premium leather patches, it starts at 500 pieces. We are happy to discuss specific requirements for smaller trial runs."
        },
        {
            question: "Do you offer professional design services?",
            answer: "Yes! We have a dedicated in-house team of expert graphic designers. Whether you have a rough sketch or just an idea, we can help create polished, production-ready artwork. Basic layout adjustments are complimentary, while complex brand identity design may incur a nominal fee."
        },
        {
            question: "Can I see a sample before full production?",
            answer: "Absolutely. We believe in getting it right the first time. We provide high-resolution digital mockups for every order. For physical verification, we can produce a pre-production sample upon request, which is highly recommended for complex custom orders."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We offer flexible payment options to suit your convenience. We accept Bank Transfers (Meezan, HBL), JazzCash, and EasyPaisa. For production orders, we typically require a 50% advance to commence manufacturing, with the balance due before dispatch."
        },
        {
            question: "What is your standard turnaround time?",
            answer: "Speed is our strength. Standard orders are typically processed and ready for dispatch within 5-7 business days after design approval. Urgent rush orders can be accommodated on a case-by-case basis."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide! We have partnered with reliable international couriers to ensure your products reach you safely, no matter where you are located. Shipping costs will be calculated based on weight and destination."
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <p className={styles.subtitle}>
                Everything you need to know about our products, production process, and shipping policy.
            </p>

            <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                    >
                        <button
                            className={styles.question}
                            onClick={() => toggleFaq(index)}
                        >
                            {faq.question}
                            <svg
                                className={styles.icon}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div className={styles.answer}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Still have questions?</h2>
                <p className={styles.ctaText}>
                    Can't find the answer you're looking for? Please contact our friendly team.
                </p>
                <Link href="/contact-us" className={styles.contactBtn}>
                    Get in Touch
                </Link>
            </div>
        </div>
    );
}

