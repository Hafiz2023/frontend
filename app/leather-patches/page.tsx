import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function LeatherPatchesPage() {
    const categorySlug = 'leather-patches';
    const pageNum = 1; // Default to page 1 for the main route

    const { data: products, totalPages } = getProducts(categorySlug, pageNum, 9); // 9 items per page

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            {/* Hero Section */}
            <PageHeader
                title="Leather Patches"
                breadcrumbs={[{ label: "Leather Patches" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2023/04/leather-patches-banner.jpg"
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
                                    imageSrc={product.image}
                                    slug={product.slug}
                                    baseUrl="/leather-patches"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No leather patches found.</p>
                        </div>
                    )}

                    {/* Pagination - Static for page 1 main route, link to page 2 if needed */}
                    <div className={styles.pagination}>
                        <span className={`${styles.pageLink} ${styles.activePage}`}>1</span>
                        {totalPages > 1 && (
                            <Link href="/leather-patches/page/2" className={styles.pageLink}>2</Link>
                        )}
                        {totalPages > 2 && (
                            <Link href="/leather-patches/page/3" className={styles.pageLink}>3</Link>
                        )}
                        {totalPages > 1 && (
                            <Link href="/leather-patches/page/2" className={styles.pageLink}>Next &raquo;</Link>
                        )}
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
