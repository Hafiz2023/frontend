
import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories, getProducts } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function LacePage() {
    const categorySlug = 'lace';

    const allProductsInDb = getProducts(categorySlug, 1, 100).data;
    // Filter to only include the specific items we want for this page, or just use them all.
    // Since we hardcoded the array before, let's try to match the previous list but use the data (images/descriptions) from our DB source.
    const specificSlugs = ['print-woven-lace', 'print-canvas-lace', 'print-ribbon-satin-lace', 'print-lace'];

    // Fallback to hardcoded list if DB finding fails (unlikely)
    const products = specificSlugs.map(slug => {
        const found = allProductsInDb.find(p => p.slug === slug);
        if (found) {
            return {
                ...found,
                imageSrc: found.image // map 'image' to 'imageSrc'
            };
        }
        return null;
    }).filter(p => p !== null) as any[];

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Lace"
                breadcrumbs={[{ label: "Lace" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2024/06/Print-Canvas-Lace-500x500-1.jpg"
            />

            <div className={styles.container}>
                <main className={styles.mainContent}>
                    {products.length > 0 ? (
                        <div className={styles.grid}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    category={product.category}
                                    imageSrc={product.imageSrc}
                                    slug={product.slug}
                                    baseUrl="/category/lace"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No lace products found.</p>
                        </div>
                    )}

                    {/* Pagination */}
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
                            {products.map((product) => (
                                <li key={product.id}><Link href={`/category/lace/${product.slug}`}>{product.title}</Link></li>
                            ))}
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
