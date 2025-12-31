'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/products';
import CursorEffect from '@/components/CursorEffect';
import styles from './page.module.css';
import PageHeader from '@/components/PageHeader';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

export default function CareersPage() {
    const allCategories = getAllCategories();
    const [jobs, setJobs] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch careers from the API
        const fetchCareers = async () => {
            try {
                // In production, this would be your actual domain
                // For local dev, we use relative path assuming proxy or direct fetch if cors headers allow
                // Since this is client side, we use the relative path hoping Next.js rewrites or direct backend port
                // Attempting standard fetch
                const response = await fetch('http://127.0.0.1:5000/api/public/careers');
                if (response.ok) {
                    const data = await response.json();
                    setJobs(data);
                } else {
                    // Fallback Mock Data if API fails/not running
                    console.error("API Fetch Failed, loading mock data");
                    setJobs([
                        {
                            id: 1,
                            title: "Graphic Designer",
                            department: "Creative",
                            location: "Lahore, Pakistan",
                            type: "Full Time",
                            description: "We are looking for a creative Graphic Designer to join our team..."
                        },
                        {
                            id: 2,
                            title: "Sales Executive",
                            department: "Sales",
                            location: "Lahore, Pakistan",
                            type: "Full Time",
                            description: "Energetic sales executive required with experience in textile..."
                        }
                    ]);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                // Fallback Mock Data
                setJobs([
                    {
                        id: 1,
                        title: "Graphic Designer",
                        department: "Creative",
                        location: "Lahore, Pakistan",
                        type: "Full Time",
                        description: "We are looking for a creative Graphic Designer to join our team..."
                    },
                    {
                        id: 2,
                        title: "Sales Executive",
                        department: "Sales",
                        location: "Lahore, Pakistan",
                        type: "Full Time",
                        description: "Energetic sales executive required with experience in textile..."
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <CursorEffect />

            {/* Hero Section */}
            <PageHeader
                title="Careers at ZA Traders"
                breadcrumbs={[{ label: "Careers" }]}
                backgroundImage="/hero-bg.png" // Reusing available asset or create a new one
            />

            <div className={styles.container}>
                <main className={styles.content}>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>Join Our Vision</h2>
                        <p>
                            At ZA Traders, we are more than just a label manufacturer. We are a team of innovators, designers, and craftsmen dedicated to helping brands tell their story.
                            If you are passionate about quality, creativity, and sustainability, we want to hear from you.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>Loading opportunities...</div>
                    ) : (
                        <div className={styles.jobList}>
                            {jobs.map((job) => (
                                <div key={job.id} className={styles.jobCard}>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.jobMeta}>
                                        <span><Briefcase size={16} /> {job.department}</span>
                                        <span><MapPin size={16} /> {job.location}</span>
                                        <span><Clock size={16} /> {job.type}</span>
                                    </div>
                                    <p className={styles.jobDescription}>{job.description}</p>
                                    <Link href={`/careers/${job.id}`} className={styles.applyButton}>
                                        View Details & Apply
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && jobs.length === 0 && (
                        <div style={{ color: '#888', textAlign: 'center', padding: '3rem', border: '1px dashed #333', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Openings Currently</h3>
                            <p>Check back later or email us your resume directly.</p>
                        </div>
                    )}

                </main>

                <aside className={styles.sidebar}>
                    {/* Search Widget */}
                    <div className={styles.widget}>
                        <label className={styles.widgetTitle} style={{ display: 'block' }}>Search Jobs</label>
                        <form className={styles.searchForm}>
                            <input type="text" className={styles.searchInput} placeholder="Keywords..." />
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </form>
                    </div>

                    {/* Departments Widget */}
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Departments</h3>
                        <ul className={styles.categoryList}>
                            <li><Link href="#">Creative & Design</Link></li>
                            <li><Link href="#">Production</Link></li>
                            <li><Link href="#">Sales & Marketing</Link></li>
                            <li><Link href="#">Administration</Link></li>
                            <li><Link href="#">Supply Chain</Link></li>
                        </ul>
                    </div>

                    {/* Product Categories Widget */}
                    <div className={styles.widget}>
                        <h3 className={styles.widgetTitle}>Our Products</h3>
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
