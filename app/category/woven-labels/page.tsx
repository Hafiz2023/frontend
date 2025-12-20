import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function WovenLabelsPage() {
    const categorySlug = 'woven-labels';

    // Hardcoded products to match the specific request for "same images"
    const products = [
        {
            id: 'wl-1',
            title: 'Ribbon Satan Labels',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2023/12/Ribbon-Sattan-Label-500x500-1.jpg',
            slug: 'ribbon-satan-labels'
        },
        {
            id: 'wl-2',
            title: 'Woven Labels For Fashion Brands',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/09/Woven-label-brand-500x500-1.jpg',
            slug: 'woven-labels-for-fashion-brands'
        },
        {
            id: 'wl-3',
            title: 'Woven Label Branding',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/woven-label-zinari-500x500-1.jpg',
            slug: 'woven-label-branding'
        },
        {
            id: 'wl-4',
            title: 'Custom Woven Tags',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Woven-label-berry-500x500-1.jpg',
            slug: 'custom-woven-tags'
        },
        {
            id: 'wl-5',
            title: 'Woven Label With Size',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Woven-label-with-size-500x500-1.jpg',
            slug: 'woven-label-with-size'
        },
        {
            id: 'wl-6',
            title: 'Woven Labels Small Quantities',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Chunlu-Woven-Label-500x500-1.jpg',
            slug: 'woven-labels-small-quantities'
        }
    ];

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Woven Labels"
                breadcrumbs={[{ label: "Woven Labels" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2023/12/Ribbon-Sattan-Label-500x500-1.jpg"
            />

            <div className={styles.container}>
                <main>
                    {products.length > 0 ? (
                        <div className={styles.grid}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    category={product.category}
                                    imageSrc={product.imageSrc}
                                    slug={product.slug}
                                    baseUrl="/woven-labels"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No woven labels found.</p>
                        </div>
                    )}

                    {/* Pagination - Simplified for this page */}
                    <div className={styles.pagination}>
                        <span className={`${styles.pageLink} ${styles.activePage}`}>1</span>
                    </div>
                </main>

                <aside className={styles.sidebar}>
                    {/* Search Widget */}
                    <div className={styles.widget}>
                        <form className={styles.searchForm}>
                            <input type="text" placeholder="Search..." className={styles.searchInput} />
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </form>
                    </div>

                    {/* Recent Posts Widget */}
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Recent Posts</h3>
                        <ul className={styles.categoryList}>
                            <li><Link href="#">Print Woven Lace</Link></li>
                            <li><Link href="#">Print Canvas Lace</Link></li>
                            <li><Link href="#">Print Ribbon Satin Lace</Link></li>
                            <li><Link href="#">Print Lace</Link></li>
                            <li><Link href="#">Ribbon Satan Labels</Link></li>
                        </ul>
                    </div>

                    {/* Categories Widget */}
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Categories</h3>
                        <ul className={styles.categoryList}>
                            {allCategories.map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href={`/category/${cat}`}
                                        className={cat === categorySlug ? styles.activeCategory : ''}
                                    >
                                        {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
