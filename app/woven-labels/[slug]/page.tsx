import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllCategories } from '@/lib/products';
import styles from './page.module.css';

export default async function WovenLabelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Hardcoded products to match the listing page
    const products = [
        {
            id: 'wl-1',
            title: 'Ribbon Satan Labels',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2023/12/Ribbon-Sattan-Label-500x500-1.jpg',
            slug: 'ribbon-satan-labels',
            description: "We also make ribbon satin labels for clothing in Pakistan. We are known for our product quality and reasonable prices. Contact us for more details."
        },
        {
            id: 'wl-2',
            title: 'Woven Labels For Fashion Brands',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/09/Woven-label-brand-500x500-1.jpg',
            slug: 'woven-labels-for-fashion-brands',
            description: "We also make woven labels for fashion brands. We are proud ourselves for our quality and reasonable prices. Order your labels now."
        },
        {
            id: 'wl-3',
            title: 'Woven Label Branding',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/woven-label-zinari-500x500-1.jpg',
            slug: 'woven-label-branding',
            description: "We also create woven label branding if you want your brand to be known among your customers. We deliver across Pakistan."
        },
        {
            id: 'wl-4',
            title: 'Custom Woven Tags',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Woven-label-berry-500x500-1.jpg',
            slug: 'custom-woven-tags',
            description: "We also make custom woven tags with many customization options. Our clients know us by our quality and reasonable prices."
        },
        {
            id: 'wl-5',
            title: 'Woven Label With Size',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Woven-label-with-size-500x500-1.jpg',
            slug: 'woven-label-with-size',
            description: "We also make woven label with size in Pakistan. Our clients knows us by our quality and reasonable prices. Contact us for quotes."
        },
        {
            id: 'wl-6',
            title: 'Woven Labels Small Quantities',
            category: 'Woven Labels',
            imageSrc: 'https://zatraders.pk/wp-content/uploads/2022/08/Chunlu-Woven-Label-500x500-1.jpg',
            slug: 'woven-labels-small-quantities',
            description: "We also make woven labels small quantities as low as 500 pieces. For more inquiry you can contact us."
        }
    ];

    const product = products.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    const allCategories = getAllCategories();

    return (
        <div>
            {/* Hero Section */}
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>{product.title}</h1>
                <div className={styles.heroBreadcrumb}>
                    <Link href="/">Home</Link>
                    <span style={{ margin: '0 0.5rem' }}>&raquo;</span>
                    <Link href="/woven-labels">Woven Labels</Link>
                    <span style={{ margin: '0 0.5rem' }}>&raquo;</span>
                    <span>{product.title}</span>
                </div>
            </div>

            <div className={styles.container}>
                <main className={styles.blogPost}>
                    <header className={styles.postHeader}>
                        <div className={styles.meta}>
                            <span>Posted by: <Link href="#">Admin</Link></span>
                            <span> | </span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </header>

                    <div className={styles.featuredImageWrapper}>
                        <Image
                            src={product.imageSrc}
                            alt={product.title}
                            fill
                            className={styles.featuredImage}
                            priority
                        />
                    </div>

                    <div className={styles.content}>
                        <p>{product.description}</p>
                        <p>
                            Elevate your brand with our premium {product.title}.
                            We specialize in producing high-quality identifying marks that add value to your products.
                        </p>
                        <h3>Product Details:</h3>
                        <ul>
                            <li><strong>Product Type:</strong> Woven Label</li>
                            <li><strong>Material:</strong> Damask, Satin, or Taffeta options</li>
                            <li><strong>Customization:</strong> Fully custom design, size, and fold</li>
                            <li><strong>Minimum Order:</strong> Flexible MOQs available</li>
                        </ul>
                    </div>

                    <div className={styles.tags}>
                        <Link href="/woven-labels" className={styles.tagLink}>Woven Labels</Link>
                        <Link href="#" className={styles.tagLink}>Brand Identity</Link>
                        <Link href="#" className={styles.tagLink}>Clothing Tags</Link>
                    </div>

                    <nav style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        <Link href="/woven-labels" style={{ textDecoration: 'none', color: '#555' }}>
                            &larr; Back to List
                        </Link>
                    </nav>

                    {/* Comment Section (Replicated from Quality Labels) */}
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 800 }}>Leave a Reply</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>Your email address will not be published. Required fields are marked *</p>
                        <form style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="comment">Comment *</label>
                                <textarea id="comment" rows={8} style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', background: '#f9f9f9' }}></textarea>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                                <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '10px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.6rem', color: '#aaa' }}>reCAPTCHA</span>
                                    <span style={{ fontSize: '0.6rem', color: '#aaa' }}>Privacy - Terms</span>
                                </div>
                            </div>

                            <button type="button" style={{ justifySelf: 'start', padding: '1rem 2.5rem', background: '#a38348', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Post Comment</button>
                        </form>
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
                        <ul className={styles.widgetList}>
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
                        <ul className={styles.widgetList}>
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
