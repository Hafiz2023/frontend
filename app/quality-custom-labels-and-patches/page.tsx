
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function QualityLabelsPage() {
    return (
        <div>
            {/* Hero Section */}
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>Quality Custom Labels for Clothing</h1>
                <div className={styles.heroBreadcrumb}>
                    <Link href="/">Home</Link>
                    <span style={{ margin: '0 0.5rem' }}>&raquo;</span>
                    <span>Quality Custom Labels for Clothing</span>
                </div>
            </div>

            <div className={styles.container}>
                <main className={styles.blogPost}>
                    <header className={styles.postHeader}>
                        <div className={styles.meta}>
                            <span>Posted by: <Link href="#">Admin</Link></span>
                            <span> | </span>
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
                        <div className={styles.navItem}>
                            {/* Empty Prev */}
                        </div>
                        <Link href="#" className={styles.navLink} style={{ textAlign: 'right' }}>
                            <span className={styles.navLabel}>Next Post</span>
                            <span className={styles.navTitle}>Custom Branding &rarr;</span>
                        </Link>
                    </nav>

                    {/* Comment Section */}
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 800 }}>Leave a Reply</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>Your email address will not be published. Required fields are marked *</p>
                        <form style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="comment">Comment *</label>
                                <textarea id="comment" rows={8} style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9' }}></textarea>
                            </div>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name *</label>
                                    <input type="text" id="name" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9' }} />
                                </div>

                                <div>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email *</label>
                                    <input type="email" id="email" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9' }} />
                                </div>

                                <div>
                                    <label htmlFor="website" style={{ display: 'block', marginBottom: '0.5rem' }}>Website</label>
                                    <input type="text" id="website" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9' }} />
                                </div>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input type="checkbox" id="save-info" />
                                <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                            </div>

                            <div className={styles.captchaBox}>
                                <input type="checkbox" id="captcha" />
                                <label htmlFor="captcha" style={{ fontSize: '0.9rem', fontWeight: 500 }}>I am human</label>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 'auto' }}>
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Recaptcha_Logo.svg/128px-Recaptcha_Logo.svg.png" alt="Captcha" width={24} height={24} />
                                    <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Privacy - Terms</span>
                                </div>
                            </div>

                            <button type="button" style={{ justifySelf: 'start', padding: '1rem 2.5rem', background: '#a38348', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Post Comment</button>
                        </form>
                    </div>

                </main>

                <aside className={styles.sidebar}>
                    <div className={styles.widget} style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Search</label>
                        <form className={styles.searchForm}>
                            <input type="text" className={styles.searchInput} />
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </form>
                    </div>

                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Recent Posts</h3>
                        <ul className={styles.widgetList}>
                            <li><Link href="#">Print Woven Lace</Link></li>
                            <li><Link href="#">Print Canvas Lace</Link></li>
                            <li><Link href="#">Print Ribbon Satin Lace</Link></li>
                            <li><Link href="#">Print Lace</Link></li>
                            <li><Link href="#">Ribbon Satan Labels</Link></li>
                        </ul>
                    </div>

                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Categories</h3>
                        <ul className={styles.widgetList}>
                            <li><Link href="/category/default">Default</Link></li>
                            <li><Link href="/category/printed-tags">Printed Tags</Link></li>
                            <li><Link href="/category/shoppers">Shoppers</Link></li>
                            <li><Link href="/category/woven-labels">Woven Labels</Link></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
