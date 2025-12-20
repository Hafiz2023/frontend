import React from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/products';
import CursorEffect from '@/components/CursorEffect';
import styles from './page.module.css';
import PageHeader from '@/components/PageHeader';

export default function AboutUsPage() {
    const allCategories = getAllCategories();

    return (
        <div className={styles.pageWrapper}>
            <CursorEffect />
            {/* Hero Section */}
            {/* Reusable Page Header */}
            <PageHeader
                title="About Us"
                breadcrumbs={[{ label: "About Us" }]}
                backgroundImage="/hero-bg.png"
            />

            <div className={styles.container}>
                <main className={styles.content}>
                    <p>
                        ZA Traders have been trading online since 2000. We pride ourselves on providing top quality products, sensible prices and unbeatable customer service.
                    </p>
                    <p>
                        It is our goal to provide the right labels for the right job, whether you need to identify clothing for school or residents in a care home.
                    </p>
                    <p>
                        We believe that only by continually reviewing and, where possible, improving the products and services we offer, ZA Traders will continue to lead the way in the woven and printed clothing label markets.
                    </p>
                    <p>
                        We always listen to our customers&apos; feedback. Our friendly team is always on hand to help you out with any questions you may have.
                    </p>
                    <p>
                        ZA Traders has come a long way since our start in 2000. Our business still operates with some 6 key fundamentals as it always has.
                    </p>

                    <ol className={styles.fundamentalsList}>
                        <li>
                            <strong>Quality not Quantity -</strong> We value each and every order - no matter how big or small, and each order is fulfilled with the same high quality standards.
                        </li>
                        <li>
                            <strong>Affordability -</strong> Our streamlined design process means fewer steps which equals lower production costs. This allows us to pass those savings on to you.
                        </li>
                        <li>
                            <strong>Customer Service -</strong> If you&apos;re not happy, either are we - end of story. Our dedicated and professional design and customer service teams are here to assist you in any way possible.
                        </li>
                        <li>
                            <strong>Reliability -</strong> You can count on ZA Traders to provide the highest quality branding materials.
                        </li>
                        <li>
                            <strong>On Time Delivery -</strong> Our customers&apos; knows us for our on-time delivery and superior customer service.
                        </li>
                    </ol>
                </main>

                <aside className={styles.sidebar}>
                    {/* Search Widget */}
                    <div className={styles.widget}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Search</label>
                        <form className={styles.searchForm}>
                            <input type="text" className={styles.searchInput} />
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
                            <li><Link href="#">Ribbon Satin Labels</Link></li>
                        </ul>
                    </div>

                    {/* Categories Widget */}
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Categories</h3>
                        <ul className={styles.categoryList}>
                            {allCategories.map((cat) => (
                                <li key={cat}>
                                    <Link href={`/category/${cat}`}>
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
