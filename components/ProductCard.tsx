import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    title: string;
    imageSrc: string;
    category: string;
    slug: string;
    baseUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageSrc, category, slug, baseUrl = '/product' }) => {
    // If slug is absolute (starts with /), ignore baseUrl
    const href = slug.startsWith('/') ? slug : `${baseUrl}/${slug}`;

    return (
        <Link href={href} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={imageSrc}
                    alt={title}
                    className={styles.image}
                    width={400}
                    height={400}
                />
                <div className={styles.overlay}>
                    <span className={styles.quickViewBtn}>View Details</span>
                </div>
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.readMore}>Read More &rarr;</span>
            </div>
        </Link>
    );
};

export default ProductCard;
