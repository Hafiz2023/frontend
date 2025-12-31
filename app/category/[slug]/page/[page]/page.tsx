import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getProducts as getMockProducts, getAllCategories } from '@/lib/products';
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

async function fetchApiProducts(categorySlug: string) {
    try {
        // Convert slug to likely category name (e.g. "woven-labels" -> "Woven Labels" or just "woven")
        // The API does a partial match ilike %query%
        const searchCanvas = categorySlug.replace(/-/g, ' ');
        const res = await fetch(`/api/public/products?category=${searchCanvas}`, { cache: 'no-store' });
        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}

interface Product {
    id: number | string;
    title: string;
    category: string;
    image?: string;
    imageSrc?: string;
    slug: string;
}

export default async function CategoryPaginationPage({ params }: { params: Promise<{ slug: string, page: string }> }) {
    const { slug, page } = await params;
    const pageNum = parseInt(page);

    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    // 1. Fetch from API first
    const apiProducts = await fetchApiProducts(slug);

    let products: Product[] = [];
    let totalPages = 1;
    let totalItems = 0;
    const itemsPerPage = 9;

    if (apiProducts.length > 0) {
        // Pagination logic for API data
        totalItems = apiProducts.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);

        const start = (pageNum - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Map API data to component Props
        products = apiProducts.slice(start, end).map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.image, // API returns full URL or path
            slug: p.slug
        }));
    } else {
        // 2. Fallback to Mock Data
        const { data, totalPages: mockTotal } = getMockProducts(slug, pageNum, itemsPerPage);
        products = data.map((d) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            categorySlug: d.categorySlug,
            image: d.image,
            slug: d.slug,
            price: d.price,
            description: d.description
        }));
        totalPages = mockTotal;
    }

    if (products.length === 0 && pageNum > 1) {
        // Handle empty page better in real app
    }

    const categoryDisplayName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Sidebar categories
    const allCategories = getAllCategories();

    // Determine background image based on category
    let bgImage = "/hero-bg.png";
    if (slug === 'leather-patches') {
        bgImage = "/LeartherTags/leather-patches-collection.jpg";
    } else if (slug === 'printed-tags' || slug === 'hang-tags') {
        bgImage = "/printed-tags-banner.png";
    } else if (slug === 'paper-bags') {
        bgImage = "/tag-kraft-minimal.png";
    } else if (slug === 'woven-labels') {
        bgImage = "/tag-fabric-white.png";
    }

    return (
        <div>
            <PageHeader
                title={categoryDisplayName}
                breadcrumbs={[
                    { label: categoryDisplayName, href: `/category/${slug}/page/1` },
                    { label: `Page ${pageNum}` }
                ]}
                backgroundImage={bgImage}
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
                                    baseUrl={`/category/${slug}`}
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
