import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from '../../page.module.css'; // Reuse styles from parent

export async function generateStaticParams() {
    // Generate params for first few pages of leather-patches
    // In a real app with many products, you might not static generate all of them
    const categorySlug = 'leather-patches';
    const { totalPages } = getProducts(categorySlug, 1, 9);

    return Array.from({ length: totalPages }, (_, i) => ({
        page: (i + 1).toString(),
    }));
}

export default async function LeatherPatchesPaginationPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const pageNum = parseInt(page);
    const categorySlug = 'leather-patches';

    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    const { data: products, totalPages } = getProducts(categorySlug, pageNum, 9);

    if (products.length === 0 && pageNum > 1) {
        // If user manually types a high page number
        return (
            <div className={styles.container}>
                <div className={styles.noProducts}>
                    <p>No more leather patches found.</p>
                    <Link href="/leather-patches" className={styles.primaryButton}>Back to first page</Link>
                </div>
            </div>
        );
    }

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            {/* Hero Section */}
            <PageHeader
                title="Leather Patches"
                breadcrumbs={[
                    { label: "Leather Patches", href: "/leather-patches" },
                    { label: `Page ${pageNum}` }
                ]}
                backgroundImage="/hero-bg.png"
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

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        {pageNum > 1 && (
                            <Link href={pageNum === 2 ? "/leather-patches" : `/leather-patches/page/${pageNum - 1}`} className={styles.pageLink}>&laquo; Prev</Link>
                        )}

                        {pageNum > 1 && (
                            <Link href="/leather-patches" className={styles.pageLink}>1</Link>
                        )}

                        {/* Current Page Indicator (if not 1) */}
                        {pageNum > 1 && (
                            <span className={`${styles.pageLink} ${styles.activePage}`}>{pageNum}</span>
                        )}

                        {/* Next pages */}
                        {pageNum < totalPages && (
                            <Link href={`/leather-patches/page/${pageNum + 1}`} className={styles.pageLink}>{pageNum + 1}</Link>
                        )}

                        {pageNum < totalPages && (
                            <Link href={`/leather-patches/page/${pageNum + 1}`} className={styles.pageLink}>Next &raquo;</Link>
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
                            <li><Link href="#">PrintCanvas Lace</Link></li>
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
