
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts, getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './Category.module.css';

// Reusing CSS from PrintedTags if possible or creating new generic one.
// We will create Category.module.css next.

export async function generateStaticParams() {
    const categories = getAllCategories();
    // Pre-render page 1 for each category
    const params = [];
    for (const cat of categories) {
        params.push({ slug: cat, page: '1' });
    }
    return params;
}

export default async function CategoryPaginationPage({ params }: { params: Promise<{ slug: string, page: string }> }) {
    const { slug, page } = await params;
    const pageNum = parseInt(page);

    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    const { data: products, totalPages } = getProducts(slug, pageNum, 9); // items per page

    if (products.length === 0 && pageNum > 1) {
        // Handle empty page better in real app
    }

    const categoryDisplayName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Sidebar categories
    const allCategories = getAllCategories();

    return (
        <div>
            <PageHeader
                title={categoryDisplayName}
                breadcrumbs={[
                    { label: categoryDisplayName, href: `/category/${slug}/page/1` },
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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No products found in this category.</p>
                        </div>
                    )}

                    <div className={styles.pagination}>
                        {pageNum > 1 && (
                            <Link href={`/category/${slug}/page/${pageNum - 1}`} className={styles.pageLink}>&laquo; Prev</Link>
                        )}

                        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={`/category/${slug}/page/${p}`}
                                className={`${styles.pageLink} ${p === pageNum ? styles.activePage : ''}`}
                            >
                                {p}
                            </Link>
                        ))}

                        {pageNum < totalPages && (
                            <Link href={`/category/${slug}/page/${pageNum + 1}`} className={styles.pageLink}>Next &raquo;</Link>
                        )}
                    </div>
                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.widget}>
                        <h3 className={styles.sidebarHeading}>Categories</h3>
                        <ul className={styles.categoryList}>
                            {allCategories.map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href={`/category/${cat}`}
                                        className={cat === slug ? styles.activeCategory : ''}
                                    >
                                        {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.widget} style={{ marginTop: '2rem' }}>
                        <h3 className={styles.sidebarHeading}>Recent Products</h3>
                        <ul className={styles.categoryList}>
                            {/* Keep static for now or fetch recent */}
                            <li><Link href="#">New Arrival: Woven Badge</Link></li>
                            <li><Link href="#">Premium Hang Tags</Link></li>
                            <li><Link href="#">Embossed Leather</Link></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
