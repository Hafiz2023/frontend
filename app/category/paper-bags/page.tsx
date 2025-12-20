import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getAllCategories } from '@/lib/products';
import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function PaperBagsPage() {
    const categorySlug = 'paper-bags';

    // Products data based on https://zatraders.pk/category/paper-bags/
    const products = [
        {
            id: 'pb-1',
            title: 'Kraft Paper Bags Manufacturers In Karachi',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/07/cheap-paper-bag-with-logo-500x500-1.jpg',
            slug: 'kraft-paper-bags-manufacturers-in-karachi'
        },
        {
            id: 'pb-2',
            title: 'Cheap Custom Paper Bags With Logo',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/07/cheap-paper-bag-with-logo-500x500-1.jpg',
            slug: 'cheap-custom-paper-bags-with-logo'
        },
        {
            id: 'pb-3',
            title: 'Paper Shopping Bags',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/shopping-plain-white-paper-bag-500x500-1.jpg',
            slug: 'paper-shopping-bags'
        },
        {
            id: 'pb-4',
            title: 'Custom Printed Paper Bags',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/printed-paper-bag.jpg',
            slug: 'custom-printed-paper-bags'
        },
        {
            id: 'pb-5',
            title: 'Paper Bags In Karachi',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/paper-bags-in-karachi.jpg',
            slug: 'paper-bags-in-karachi'
        },
        {
            id: 'pb-6',
            title: 'V Bottom Paper Bags',
            category: 'Paper Bags',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/06/v-bottom-paper-bag-500x500-1.jpeg',
            slug: 'v-bottom-paper-bags'
        }
    ];

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            <PageHeader
                title="Paper Bags"
                breadcrumbs={[{ label: "Paper Bags" }]}
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
                        <span className={`${styles.pageLink} ${styles.activePage}`}>1</span>
                        <Link href="/category/paper-bags/page/2" className={styles.pageLink}>2</Link>
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
