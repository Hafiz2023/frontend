import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from '../../page.module.css';

export default function PaperBagsPage2() {
    const categorySlug = 'paper-bags';

    const products = [
        {
            id: 'pb-7',
            title: 'Fashion Paper Bags',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/fashion-paper-bag-500x500-1.jpg',
            slug: 'fashion-paper-bags'
        },
        {
            id: 'pb-8',
            title: 'Kraft Paper Bags',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/Large-Brown-Kraft-paper-bag.jpg',
            slug: 'kraft-paper-bags'
        },
        {
            id: 'pb-9',
            title: 'Square Bottom Paper Bags in Pakistan',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/Paper-bags-in-Pakistan.jpg',
            slug: 'square-bottom-paper-bags-in-pakistan'
        }
    ];

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Paper Bags"
                breadcrumbs={[{ label: "Paper Bags", href: "/category/paper-bags" }, { label: "Page 2" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2022/07/cheap-paper-bag-with-logo-500x500-1.jpg"
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
                                    baseUrl="/category/paper-bags"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noProducts}>
                            <p>No paper bags found.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <Link href="/category/paper-bags" className={styles.pageLink}>1</Link>
                        <span className={`${styles.pageLink} ${styles.activePage}`}>2</span>
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
