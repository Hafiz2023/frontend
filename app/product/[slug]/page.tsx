import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProductBySlug } from '@/lib/products';

import styles from './ProductDetail.module.css';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    // Fallback if product not found (could redirect or show custom 404)
    if (!product) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.hero}>
                    <h1 className={styles.heroTitle}>Product Not Found</h1>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link> &raquo; <Link href="/category/printed-tags">Printed Tags</Link>
                    </div>
                </div>
                <div className={styles.contentContainer} style={{ textAlign: 'center', display: 'block' }}>
                    <p>Sorry, the product you are looking for does not exist.</p>
                    <Link href="/category/printed-tags" className={styles.primaryButton} style={{ marginTop: '2rem' }}>
                        Back to Printed Tags
                    </Link>
                </div>
            </div>
        );
    }

    const title = product.title;
    const image = product.image;
    const description = product.description;

    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>{title}</h1>
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span> &raquo; </span>
                    <Link href={`/category/${product.categorySlug}`}>{product.category}</Link>
                    <span> &raquo; </span>
                    <span>{title}</span>
                </div>
            </div>

            <div className={styles.contentContainer}>
                {/* Image Section */}
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        className={styles.productImage}
                        width={600}
                        height={600}
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Details Section */}
                <div className={styles.detailsWrapper}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h1 className={styles.productTitle}>{title}</h1>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.description}>
                        <p><strong>Product Details:</strong></p>
                        <ul>
                            <li>High quality material</li>
                            <li>Custom sizes available</li>
                            <li>Premium finishing options</li>
                            <li>Fast turnaround time</li>
                        </ul>
                    </div>

                    <div className={styles.actionButtons}>
                        <Link href="https://wa.me/923001234567" target="_blank" className={styles.primaryButton}>
                            <i className="fab fa-whatsapp" style={{ marginRight: '10px' }}></i>
                            Order via WhatsApp
                        </Link>
                        <Link href="/contact-us" className={styles.secondaryButton}>
                            Contact for Quote
                        </Link>
                    </div>

                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <span className={styles.icon}>📞</span> +92 312 2189966
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.icon}>✉️</span> admin@zatraders.pk
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
