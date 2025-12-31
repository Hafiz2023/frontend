import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllCategories } from '@/lib/products';
import styles from './page.module.css';

async function fetchApiProduct(slug: string) {
    try {
        // Fetch all products for the category and filter (temporary solution until slug endpoint exists)
        // We fetch generic 'products' endpoint. We might need to iterate categories or guess.
        // For now, let's assume it's in Leather Patches since we are in that folder, 
        // but strictly we should search all or pass category.
        const res = await fetch(`http://127.0.0.1:5000/api/public/products?category=Leather Patches`, { cache: 'no-store' });
        if (!res.ok) return null;
        const data = await res.json();
        const found = data.find((p: any) => p.slug === slug || p.sku.toLowerCase() === slug.toLowerCase());

        if (found) {
            return {
                id: found.id,
                title: found.title,
                category: found.category,
                image: found.image,
                slug: found.slug,
                description: found.description || `Premium quality ${found.title}. Contact us for more details.`
            };
        }
        return null;
    } catch (e) {
        return null;
    }
}

export default async function LeatherPatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let product: any = getProductBySlug(slug);

    if (!product) {
        product = await fetchApiProduct(slug);
    }

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
                    <Link href="/leather-patches">Leather Patches</Link>
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
                            <span>04/10/2023</span> {/* Static date to match screenshot approx */}
                        </div>
                    </header>

                    <div className={styles.featuredImageWrapper}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className={styles.featuredImage}
                            priority
                        />
                    </div>

                    <div className={styles.content}>
                        <p>{product.description}</p>
                        <p>
                            At ZA Traders, we specialize in high-quality leather patches that add a premium touch to your garments.
                            Our {product.title} are crafted with precision and care, ensuring durability and style.
                            Whether for jeans, jackets, hats, or bags, these patches are the perfect branding solution.
                        </p>
                        <h3>Key Features:</h3>
                        <ul>
                            <li>Premium Genuine or Faux Leather</li>
                            <li>Precise Laser Engraving or Embossing</li>
                            <li>Custom Shapes and Sizes</li>
                            <li>Durable and Long-lasting</li>
                        </ul>
                    </div>

                    <div className={styles.tags}>
                        <Link href="#" className={styles.tagLink}>Leather Patches</Link>
                        <Link href="#" className={styles.tagLink}>Custom Branding</Link>
                        <Link href="#" className={styles.tagLink}>Garment Accessories</Link>
                    </div>

                    <nav style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                        <Link href="/leather-patches" style={{ textDecoration: 'none', color: '#555' }}>
                            &larr; Back to List
                        </Link>
                        {/* Next/Prev links could be dynamic, staying simple for now */}
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
                                {/* Placeholder for captcha image */}
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
