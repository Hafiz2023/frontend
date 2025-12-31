import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';
import { getProducts as getMockProducts } from '@/lib/products';
import CursorEffect from '@/components/CursorEffect';

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

interface Product {
    id: number | string;
    title: string;
    category: string;
    image?: string;
    imageSrc?: string;
    slug: string;
}

export default async function LeatherPatchesPage() {
    const categorySlug = 'leather-patches';
    const pageNum = 1;

    // 1. Try Fetching from API
    let products: Product[] = [];

    const apiData = await fetchApiProducts(categorySlug);

    if (apiData) {
        products = apiData.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            image: p.image,
            slug: p.slug
        }));
    } else {
        // 2. Fallback
        const { data } = getMockProducts(categorySlug, pageNum, 9);
        products = data.map((d) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            image: d.image,
            slug: d.slug
        }));
    }

    const allCategories = getAllCategories();

    return (
        <div className={styles.pageWrapper}>
            <CursorEffect />
            <PageHeader
                title="Leather Patches"
                breadcrumbs={[{ label: "Leather Patches" }]}
                backgroundImage="/LeartherTags/leather-patches-collection.jpg"
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
                            <p>No leather patches found.</p>
                        </div>
                    )}

                    <div className={styles.pagination}>
                        <span className={`${styles.pageLink} ${styles.activePage}`}>1</span>
                        <Link href="/category/leather-patches/page/2" className={styles.pageLink}>2</Link>
                        <Link href="/category/leather-patches/page/3" className={styles.pageLink}>3</Link>
                        <Link href="/category/leather-patches/page/2" className={styles.pageLink}>Next &raquo;</Link>
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
                </aside>
            </div>
        </div>
    );
}
