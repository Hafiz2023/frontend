import React from 'react';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostData {
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    content: React.ReactNode;
}

// Mock Database of Blog Posts
const blogPosts: Record<string, BlogPostData> = {
    "importance-of-woven-labels": {
        title: "The Unsung Heroes of Fashion: Why Woven Labels are Crucial",
        category: "Product Guide",
        date: "Feb 1, 2024",
        author: "Admin",
        image: "https://images.unsplash.com/photo-1605518216965-7bc042f9540b?auto=format&fit=crop&w=1200&q=80",
        content: (
            <>
                <p>
                    In the vibrant and competitive world of fashion, every detail contributes to a brand&apos;s narrative and perceived value. While design, fabric, and fit often take center stage, there&apos;s a small yet mighty component that quietly shapes a brand&apos;s image and customer perception: the woven label. Far from being a mere tag, a well-crafted woven label is a powerful tool for establishing brand identity, communicating quality, and fostering customer loyalty.
                </p>

                <h2>Beyond Identification: Strengthening Brand Identity</h2>
                <p>
                    Woven labels serve as miniature brand ambassadors, carrying your logo, name, and brand message directly onto your products. When customers repeatedly encounter a finely stitched label on a garment or accessory, it reinforces your brand&apos;s identity in their minds, making your product instantly more memorable. This consistent visual cue builds brand trust and helps your brand stand out in a saturated market.
                </p>

                <h2>A Touch of Quality: Elevating Perceived Value</h2>
                <p>
                    One of the most significant advantages of woven labels is their ability to convey a sense of premium quality and professionalism. Unlike printed labels that can look cheap, fade, or tear, woven labels offer a textured, luxurious finish that customers instinctively associate with higher craftsmanship and attention to detail. This subtle detail can elevate a product from &quot;basic&quot; to &quot;boutique,&quot; justifying higher price points and instilling confidence in the purchase.
                </p>

                <h2>Built to Last: Durability and Longevity</h2>
                <p>
                    Woven labels are renowned for their exceptional durability. Crafted by interlacing threads, they are designed to withstand repeated washing, ironing, and wear without fading, fraying, or peeling. This ensures that your brand&apos;s image remains intact throughout the product&apos;s lifecycle, maintaining its professional appearance even after years of use.
                </p>

                <h3>Key Benefits at a Glance:</h3>
                <ul>
                    <li><strong>Premium Texture:</strong> Soft, lustrous threads create a high-end feel.</li>
                    <li><strong>Longevity:</strong> Will not fade or wash out over time.</li>
                    <li><strong>Customization:</strong> Endless options for folds, cuts, and thread colors.</li>
                    <li><strong>Comfort:</strong> High-quality damask weaves are soft against the skin.</li>
                </ul>

                <h2>Conclusion</h2>
                <p>
                    Investing in high-quality woven labels is a strategic decision for any fashion brand. These small, often-overlooked details are powerful tools that enhance brand recognition, elevate perceived quality, ensure durability, and contribute to a superior customer experience. By carefully selecting and designing your woven labels, you can craft a silent yet impactful signature that communicates your brand's values and commitment to excellence.
                </p>
            </>
        )
    },
    "sustainable-packaging-guide": {
        title: "Sustainable Packaging 101",
        category: "Sustainability",
        date: "Feb 10, 2024",
        author: "Eco Team",
        image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
        content: (
            <p>Full article coming soon...</p>
        )
    },
    // Add other placeholders/slugs as needed
};

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = blogPosts[params.slug];

    if (!post) {
        return notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.articleWrapper}>
                <header className={styles.header}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        <span>{post.date}</span>
                        <span>By {post.author}</span>
                    </div>
                </header>

                <img src={post.image} alt={post.title} className={styles.heroImage} />

                <div className={styles.content}>
                    {post.content}
                </div>

                <Link href="/blog" className={styles.backLink}>
                    &larr; Back to Insights
                </Link>
            </div>
        </div>
    );
}
