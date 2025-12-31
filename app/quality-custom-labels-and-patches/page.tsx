'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import PageHeader from '@/components/PageHeader';
import CursorEffect from '@/components/CursorEffect';

export default function QualityLabelsPage() {
    return (
        <div className={styles.pageWrapper}>
            <CursorEffect />

            <PageHeader
                title="Quality Custom Labels for Clothing"
                breadcrumbs={[{ label: "Quality Custom Labels" }]}
                backgroundImage="https://zatraders.pk/wp-content/uploads/2022/06/labels-1024x422.jpg"
            />

            <div className={styles.container}>
                <main className={styles.blogPost}>
                    <header>
                        <div className={styles.meta}>
                            <span>Posted by: <Link href="#">Admin</Link></span>
                            <span className="mx-2">|</span>
                            <span>06/06/2022</span>
                        </div>
                    </header>

                    <div className={styles.featuredImageWrapper}>
                        <Image
                            src="https://zatraders.pk/wp-content/uploads/2022/06/labels-1024x422.jpg"
                            alt="Quality Custom Labels for Clothing"
                            fill
                            className={styles.featuredImage}
                            priority
                        />
                    </div>

                    <div className={styles.content}>
                        <p>
                            Our commitment to produce quality and top-notch garment accessories offers a great deal of sustainability in all our products. We aim to expedite our progress towards breaking the norms of patches and custom labels for clothing. We choose the right materials to encourage environment-friendly industrialization. Our sustainability factor is constant in all our decisions and facilities – from the raw material selection to the finished product, we aim to become the most ethical and responsible industry as we advance to support the great vision of sustainable manufacturing.
                        </p>
                    </div>

                    <div className={styles.tags}>
                        <Link href="#" className={styles.tagLink}>Sustainability</Link>
                        <Link href="#" className={styles.tagLink}>Custom Labels</Link>
                        <Link href="#" className={styles.tagLink}>Manufacturing</Link>
                    </div>

                    <nav className={styles.navigation}>
                        <div></div> {/* Spacer */}
                        <Link href="#" className={styles.navLink} style={{ textAlign: 'right' }}>
                            <span className={styles.navLabel}>Next Post</span>
                            <span className={styles.navTitle}>Custom Branding &rarr;</span>
                        </Link>
                    </nav>

                    {/* Comment Section */}
                    <div className={styles.commentsSection}>
                        <h3 className={styles.commentsTitle}>Leave a Reply</h3>
                        <p className={styles.commentsNote}>Your email address will not be published. Required fields are marked *</p>

                        <form className={styles.commentForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="comment">Comment *</label>
                                <textarea id="comment" rows={6} className={styles.formTextarea}></textarea>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name *</label>
                                    <input type="text" id="name" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" id="email" className={styles.formInput} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="website">Website</label>
                                    <input type="text" id="website" className={styles.formInput} />
                                </div>
                            </div>

                            <button type="button" className={styles.submitButton}>Post Comment</button>
                        </form>
                    </div>
                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.widget}>
                        <h3 className="text-white font-bold mb-4">Search</h3>
                        <form>
                            <input type="text" placeholder="Search..." className={styles.searchInput} />
                            <button type="submit" className={styles.searchButton} style={{ marginTop: '0.5rem' }}>Search</button>
                        </form>
                    </div>

                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Recent Posts</h3>
                        <ul className={styles.widgetList}>
                            <li><Link href="#">Print Woven Lace</Link></li>
                            <li><Link href="#">Print Canvas Lace</Link></li>
                            <li><Link href="#">Print Ribbon Satin Lace</Link></li>
                            <li><Link href="#">Print Lace</Link></li>
                            <li><Link href="#">Ribbon Satin Labels</Link></li>
                        </ul>
                    </div>

                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Categories</h3>
                        <ul className={styles.widgetList}>
                            <li><Link href="/category/printed-tags">Printed Tags</Link></li>
                            <li><Link href="/category/woven-labels">Woven Labels</Link></li>
                            <li><Link href="/category/leather-patches">Leather Patches</Link></li>
                            <li><Link href="/category/hang-tags">Hang Tags</Link></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
