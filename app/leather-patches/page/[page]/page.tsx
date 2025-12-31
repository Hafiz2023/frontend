import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from '../../page.module.css';
import { getProducts as getMockProducts } from '@/lib/products';

// Helper to fetch products from API
async function fetchApiProducts(categorySlug: string) {
    try {
        const searchCanvas = categorySlug.replace(/-/g, ' ');
        const res = await fetch(`http://127.0.0.1:5000/api/public/products?category=${searchCanvas}`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return data.length > 0 ? data : null;
    } catch {
        return null;
    }
}

export async function generateStaticParams() {
    // Generate just a few pages statically
    return [{ page: '1' }, { page: '2' }, { page: '3' }];
}

interface Product {
    id: number | string;
    title: string;
    category: string;
    image?: string;
    imageSrc?: string;
    slug: string;
}

export default async function LeatherPatchesPaginationPage({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;
    const pageNum = parseInt(page);
    const categorySlug = 'leather-patches';

    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    // 1. Try Fetching from API
    let products: Product[] = [];
    let totalPages = 1;
    const itemsPerPage = 9;

    const apiData = await fetchApiProducts(categorySlug);

    if (apiData) {
        // Handle API Pagination manually since API returns all
        const totalItems = apiData.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);

        const start = (pageNum - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        products = apiData.slice(start, end).map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.image,
            slug: p.slug
        }));
    } else {
        // 2. Fallback
        const { data, totalPages: mockTotal } = getMockProducts(categorySlug, pageNum, itemsPerPage);
        products = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            image: d.image,
            slug: d.slug
        }));
        totalPages = mockTotal;
    }

    if (products.length === 0 && pageNum > 1) {
        // Return empty state or redirect logic
    }

    const allCategories = getAllCategories();

    return (
        <div className={styles.pageWrapper}>
            <PageHeader
                title="Leather Patches"
                breadcrumbs={[
                    { label: "Leather Patches", href: "/leather-patches" },
                    { label: `Page ${pageNum}` }
                ]}
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
                                    imageSrc={product.image || product.imageSrc || ''}
                                    slug={product.slug}
                                    baseUrl="/leather-patches"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No leather patches found on this page.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        {pageNum > 1 && (
                            <Link href={pageNum === 2 ? "/leather-patches" : `/leather-patches/page/${pageNum - 1}`} className={styles.pageLink}>&laquo; Prev</Link>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={p === 1 ? "/leather-patches" : `/leather-patches/page/${p}`}
                                className={`${styles.pageLink} ${p === pageNum ? styles.activePage : ''}`}
                            >
                                {p}
                            </Link>
                        ))}

                        {pageNum < totalPages && (
                            <Link href={`/leather-patches/page/${pageNum + 1}`} className={styles.pageLink}>Next &raquo;</Link>
                        )}
                    </div>
                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Search</h3>
                        <form className={styles.searchForm}>
                            <input type="text" placeholder="Search..." className={styles.searchInput} />
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </form>
                    </div>

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

                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Recent Posts</h3>
                        <ul className={styles.categoryList}>
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
