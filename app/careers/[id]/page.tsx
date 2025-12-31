'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import PageHeader from '@/components/PageHeader';
import CursorEffect from '@/components/CursorEffect';
import { Briefcase, MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements?: string; // Optional in our mock data structure
    posted_date?: string;
}

export default function CareerDetailsPage() {
    const params = useParams();
    const id = params.id;

    const [job, setJob] = useState<Career | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock Fetch specific job
        // In real app: fetch(`/api/public/careers/${id}`)

        // Simulating fetch delay
        setTimeout(() => {
            // Mock data - normally this comes from API
            const mockJobs: Career[] = [
                {
                    id: 1,
                    title: "Graphic Designer",
                    department: "Creative",
                    location: "Lahore, Pakistan",
                    type: "Full Time",
                    description: "We are looking for a creative Graphic Designer to join our team. The ideal candidate will have strong creative skills and a portfolio of work which demonstrates their passion for illustrative design and typography. This candidate will have experiences in working with numerous different design platforms such as digital and print forms.",
                    requirements: "Proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign).\n3+ years of experience in graphic design.\nStrong portfolio showcasing print and digital work.\nAbility to meet deadlines.",
                    posted_date: "2024-01-15"
                },
                {
                    id: 2,
                    title: "Sales Executive",
                    department: "Sales",
                    location: "Lahore, Pakistan",
                    type: "Full Time",
                    description: "Energetic sales executive required with experience in textile. You will be responsible for discovering and pursuing new sales prospects, negotiating deals and maintaining customer satisfaction. If you have excellent communication skills and feel comfortable reaching out to potential customers to demonstrate our services and products through email and phone, we’d like to meet you.",
                    requirements: "Proven experience as a Sales Executive or relevant role.\nProficiency in English.\nExcellent knowledge of MS Office.\nThorough understanding of marketing and negotiating techniques.",
                    posted_date: "2024-01-20"
                }
            ];

            const foundJob = mockJobs.find(j => j.id.toString() === id);
            setJob(foundJob || null);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return (
            <div className={styles.pageWrapper}>
                <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#c9a14a' }}>
                    Loading...
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className={styles.pageWrapper}>
                <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
                    <h2>Job Not Found</h2>
                    <Link href="/careers" style={{ color: '#c9a14a', marginTop: '1rem' }}>Back to Careers</Link>
                </div>
            </div>
        );
    }

    // Parse requirements line by line
    const requirementsList = job.requirements ? job.requirements.split('\n') : [];

    return (
        <div className={styles.pageWrapper}>
            <CursorEffect />
            <PageHeader
                title={job.title}
                breadcrumbs={[
                    { label: "Careers", href: "/careers" },
                    { label: job.title }
                ]}
                backgroundImage="/hero-bg.png"
            />

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Main Content */}
                    <main className={styles.details}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{job.title}</h1>
                            <div className={styles.meta}>
                                <span><Briefcase size={18} className={styles.metaIcon} /> {job.department}</span>
                                <span><MapPin size={18} className={styles.metaIcon} /> {job.location}</span>
                                <span><Clock size={18} className={styles.metaIcon} /> {job.type}</span>
                            </div>
                        </div>

                        <section>
                            <h3 className={styles.sectionTitle}>Job Description</h3>
                            <p className={styles.text}>{job.description}</p>
                        </section>

                        <section>
                            <h3 className={styles.sectionTitle}>Key Requirements</h3>
                            <ul className={styles.requirementsList}>
                                {requirementsList.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className={styles.sectionTitle}>What We Offer</h3>
                            <ul className={styles.requirementsList}>
                                <li>Competitive Salary Package</li>
                                <li>Health Insurance</li>
                                <li>Professional Development Environment</li>
                                <li>Annual Leaves</li>
                            </ul>
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside>
                        <div className={styles.sidebarCard}>
                            <h4 className={styles.sidebarTitle}>Job Overview</h4>

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Posted Date</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Calendar size={14} color="#c9a14a" />
                                    {job.posted_date || 'Recently'}
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Department</span>
                                {job.department}
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Location</span>
                                {job.location}
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <a href={`mailto:careers@zatraders.pk?subject=Application for ${job.title}`} className={styles.applyButton}>
                                    Apply for this Job
                                </a>
                                <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
                                    Send your CV via email
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
