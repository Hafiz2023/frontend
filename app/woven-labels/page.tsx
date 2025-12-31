import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';
import { getProducts as getMockProducts } from '@/lib/products';

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

export default async function WovenLabelsPage() {
    const categorySlug = 'woven-labels';
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
        // Cast mock data to Product[] assuming it matches structure or map it
        products = data.map((d) => ({
            id: d.id,
            title: d.title,
            category: d.category,
            image: d.image, // Map correctly
            slug: d.slug
        }));
    }

    const allCategories = getAllCategories();

    return (
        <div className={styles.pageWrapper}>
            <PageHeader
                title="Woven Labels"
                breadcrumbs={[{ label: "Woven Labels" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2022/06/woven-labels-1024x422.jpg"
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
                                    baseUrl="/woven-labels"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No woven labels found.</p>
                        </div>
                    )}

                    <div className={styles.pagination}>
                        <span className={`${styles.pageLink} ${styles.activePage}`}>1</span>
                        <Link href="/category/woven-labels/page/2" className={styles.pageLink}>2</Link>
                        <Link href="/category/woven-labels/page/3" className={styles.pageLink}>3</Link>
                        <Link href="/category/woven-labels/page/2" className={styles.pageLink}>Next &raquo;</Link>
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
