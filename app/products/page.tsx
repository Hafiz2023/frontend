import React from 'react';
import styles from './Products.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: number;
    title: string;
    image: string;
    slug: string;
    description: string;
}

export default function ProductsPage() {
    const products: Product[] = [
        {
            id: 1,
            title: "Woven Labels",
            image: "/tag-fabric-white.png",
            slug: "woven-labels",
            description: "High-definition damask labels for a premium, long-lasting brand finish."
        },
        {
            id: 2,
            title: "Hang Tags",
            image: "/printed-tags-banner.png",
            slug: "printed-tags",
            description: "Custom printed hang tags in various shapes, sizes, and premium paper stocks."
        },
        {
            id: 3,
            title: "Leather Patches",
            image: "/LeartherTags/leather-patches-collection.jpg",
            slug: "leather-patches",
            description: "Authentic and faux leather patches, perfect for denim and rugged outerwear."
        },
        {
            id: 4,
            title: "Printed Labels",
            image: "/tag-black-gold.png",
            slug: "printed-tags",
            description: "Soft satin and cotton printed labels, ideal for care instructions and branding."
        },
        {
            id: 5,
            title: "Paper Bags",
            image: "/tag-kraft-minimal.png",
            slug: "paper-bags",
            description: "Eco-friendly, branded paper bags to give your customers a complete shopping experience."
        },
        {
            id: 6,
            title: "Custom Lace",
            image: "/tag-fabric-white.png",
            slug: "lace",
            description: "Intricate custom lace designs for fashion embellishments and detailed trimming."
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Our Product Collection</h1>
                <p className={styles.subtitle}>
                    Explore our diverse range of premium branding accessories. From high-definition woven labels to artisanal leather patches, we craft details that define your brand.
                </p>
            </div>

            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.imageWrapper}>
                            {/* Note: Using standard img for external URLs if domain not in next.config, else use Image */}
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className={styles.productImage}
                                style={{ objectFit: 'cover' }}
                            />
                            <div className={styles.overlay}></div>
                        </div>

                        <div className={styles.cardContent}>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <p className={styles.productDesc}>{product.description}</p>
                            <Link href={`/category/${product.slug}`} className={styles.viewBtn}>
                                View Collection &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.customSection}>
                <h2 className={styles.customTitle}>Need Something Unique?</h2>
                <p className={styles.customText}>
                    We specialize in fully customized orders. If you don&apos;t see exactly what you&apos;re looking for, our design team can bring your vision to life from scratch.
                </p>
                <Link href="/contact-us" className={styles.customBtn}>
                    Request Custom Quote
                </Link>
            </div>
        </div>
    );
}

