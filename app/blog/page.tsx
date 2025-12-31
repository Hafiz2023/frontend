import React from 'react';
import styles from './Blog.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image_url: string;
    published_date: string;
    author: string;
    category: string;
    featured?: boolean;
}

export default function BlogPage() {
    const posts: BlogPost[] = [
        {
            id: 1,
            title: "Fashion Branding Trends for 2025",
            slug: "fashion-branding-trends-2025",
            excerpt: "Discover the visual strategies that will define the luxury market next year, from immersive storytelling to eco-conscious minimalism.",
            image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
            published_date: "Dec 28, 2024",
            author: "Sarah Jenks",
            category: "Trends",
            featured: true
        },
        {
            id: 2,
            title: "The Art of Woven Labels",
            slug: "importance-of-woven-labels",
            excerpt: "Why high-definition damask labels are the subtle detail that elevates a garment from ordinary to premium.",
            image_url: "https://images.unsplash.com/photo-1605518216965-7bc042f9540b?auto=format&fit=crop&w=800&q=80",
            published_date: "Feb 1, 2024",
            author: "Admin",
            category: "Product Guide"
        },
        {
            id: 3,
            title: "Sustainable Packaging 101",
            slug: "sustainable-packaging-guide",
            excerpt: "How switching to recyclable paper bags and organic cotton tags can boost your brand image and save the planet.",
            image_url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
            published_date: "Feb 10, 2024",
            author: "Eco Team",
            category: "Sustainability"
        },
        {
            id: 4,
            title: "Designing the Perfect Hang Tag",
            slug: "choosing-hang-tags",
            excerpt: "A complete guide to paper stocks, finishes, and typography for selecting hang tags that reflect your identity.",
            image_url: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=800&q=80",
            published_date: "Feb 15, 2024",
            author: "Design Studio",
            category: "Design Tips"
        }
    ];

    const featuredPost = posts.find(p => p.featured);
    const standardPosts = posts.filter(p => !p.featured);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Latest Insights</h1>
                <p className={styles.subtitle}>
                    Expert advice, industry trends, and inspiration from the world of fashion branding and accessories.
                </p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
                <div className={`${styles.card} ${styles.featured}`}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.badge}>Featured Story</div>
                        <Image
                            src={featuredPost.image_url}
                            alt={featuredPost.title}
                            fill
                            className={styles.image}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.meta}>
                            <span>{featuredPost.published_date}</span>
                            <span>•</span>
                            <span className={styles.author}>{featuredPost.author}</span>
                        </div>
                        <h2 className={styles.postTitle}>
                            <Link href={`/blog/${featuredPost.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {featuredPost.title}
                            </Link>
                        </h2>
                        <p className={styles.excerpt}>{featuredPost.excerpt}</p>
                        <Link href={`/blog/${featuredPost.slug}`} className={styles.readMore}>
                            Read Full Article &rarr;
                        </Link>
                    </div>
                </div>
            )}

            {/* Standard Grid */}
            <div className={styles.grid}>
                {standardPosts.map((post) => (
                    <div key={post.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.badge}>{post.category}</div>
                            <Image
                                src={post.image_url}
                                alt={post.title}
                                fill
                                className={styles.image}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles.content}>
                            <div className={styles.meta}>
                                <span>{post.published_date}</span>
                                <span>•</span>
                                <span className={styles.author}>{post.author}</span>
                            </div>
                            <h3 className={styles.postTitle}>
                                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                                Read Story &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

