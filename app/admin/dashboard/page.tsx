'use client';

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

interface Message {
    id: number; // Changed to number to match backend if needed, or stick to string if mapped
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
}

interface DashboardStats {
    customers: number;
    vendors: number;
    products: number;
    invoices: number;
    low_stock: number;
    pending_invoices: number;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/v1/dashboard-stats');
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                // Fetch Messages
                const msgsRes = await fetch('/api/v1/contact');
                if (msgsRes.ok) {
                    const msgsData = await msgsRes.json();
                    setMessages(msgsData);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className={styles.loading}>Loading Dashboard...</div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
            </header>

            {/* Stats Grid */}
            {stats && (
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Customers</h3>
                        <p className={styles.statValue}>{stats.customers}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Vendors</h3>
                        <p className={styles.statValue}>{stats.vendors}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Products</h3>
                        <p className={styles.statValue}>{stats.products}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Invoices</h3>
                        <p className={styles.statValue}>{stats.invoices}</p>
                    </div>
                    <div className={`${styles.statCard} ${styles.warning}`}>
                        <h3>Low Stock</h3>
                        <p className={styles.statValue}>{stats.low_stock}</p>
                    </div>
                    <div className={`${styles.statCard} ${styles.info}`}>
                        <h3>Pending Bills</h3>
                        <p className={styles.statValue}>{stats.pending_invoices}</p>
                    </div>
                </div>
            )}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact Messages</h2>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No messages found</td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr key={msg.id}>
                                        <td>{new Date(msg.date).toLocaleDateString()}</td>
                                        <td>{msg.name}</td>
                                        <td>{msg.email}</td>
                                        <td>{msg.subject}</td>
                                        <td>
                                            <div className={styles.messageContent} title={msg.message}>
                                                {msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
