'use client';

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
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

interface ReturnReq {
    id: number;
    order_number: string;
    email: string;
    reason: string;
    details: string;
    status: string;
    date: string;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [returns, setReturns] = useState<ReturnReq[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'messages' | 'returns'>('messages');

    // CRUD State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<Partial<Message>>({});
    const [isEditing, setIsEditing] = useState(false);

    const fetchData = async () => {
        try {
            // Fetch Stats
            const statsRes = await fetch('http://127.0.0.1:5000/api/v1/dashboard-stats');
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            // Fetch Messages
            const msgsRes = await fetch('http://127.0.0.1:5000/api/v1/contact');
            if (msgsRes.ok) {
                const msgsData = await msgsRes.json();
                setMessages(msgsData);
            }

            // Fetch Returns
            const returnsRes = await fetch('http://127.0.0.1:5000/api/v1/returns');
            if (returnsRes.ok) {
                const returnsData = await returnsRes.json();
                setReturns(returnsData);
            }
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/v1/contact/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setMessages(messages.filter(msg => msg.id !== id));
            } else {
                alert('Failed to delete message');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting message');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing
                ? `http://127.0.0.1:5000/api/v1/contact/${currentMessage.id}`
                : 'http://127.0.0.1:5000/api/v1/contact';

            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentMessage)
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchData(); // Refresh list
            } else {
                alert('Failed to save message');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving message');
        }
    };

    const openAddModal = () => {
        setCurrentMessage({ name: '', email: '', phone: '', address: '', subject: '', message: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (msg: Message) => {
        setCurrentMessage(msg);
        setIsEditing(true);
        setIsModalOpen(true);
    };

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
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('messages')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'messages' ? '#c9a14a' : '#888',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            paddingBottom: '0.5rem',
                            borderBottom: activeTab === 'messages' ? '2px solid #c9a14a' : 'none'
                        }}
                    >
                        Contact Messages
                    </button>
                    <button
                        onClick={() => setActiveTab('returns')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: activeTab === 'returns' ? '#c9a14a' : '#888',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            paddingBottom: '0.5rem',
                            borderBottom: activeTab === 'returns' ? '2px solid #c9a14a' : 'none'
                        }}
                    >
                        Return Requests
                    </button>
                </div>

                {activeTab === 'messages' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 className={styles.sectionTitle}>Contact Messages</h2>
                            <button onClick={openAddModal} style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                + Add New
                            </button>
                        </div>

                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>No messages found</td>
                                        </tr>
                                    ) : (
                                        messages.map((msg) => (
                                            <tr key={msg.id}>
                                                <td>{new Date(msg.date).toLocaleDateString()}</td>
                                                <td>{msg.name}</td>
                                                <td>{msg.email}</td>
                                                <td>{msg.phone || '-'}</td>
                                                <td>{msg.address || '-'}</td>
                                                <td>{msg.subject}</td>
                                                <td>
                                                    <div className={styles.messageContent} title={msg.message}>
                                                        {msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onClick={() => openEditModal(msg)} style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>Edit</button>
                                                    <button onClick={() => handleDelete(msg.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'returns' && (
                    <>
                        <h2 className={styles.sectionTitle}>Return Requests</h2>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Order #</th>
                                        <th>Email</th>
                                        <th>Reason</th>
                                        <th>Details</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returns.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No return requests found</td>
                                        </tr>
                                    ) : (
                                        returns.map((req) => (
                                            <tr key={req.id}>
                                                <td>{new Date(req.date).toLocaleDateString()}</td>
                                                <td>{req.order_number}</td>
                                                <td>{req.email}</td>
                                                <td>{req.reason}</td>
                                                <td>{req.details}</td>
                                                <td>
                                                    <span style={{
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.85rem',
                                                        background: req.status === 'Pending' ? '#f59e0b20' : '#10b98120',
                                                        color: req.status === 'Pending' ? '#f59e0b' : '#10b981'
                                                    }}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg-card, #1e1e1e)', padding: '2rem', borderRadius: '8px', width: '500px', maxWidth: '90%', color: 'var(--text-primary, #fff)'
                    }}>
                        <h3>{isEditing ? 'Edit Message' : 'Add New Message'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <input
                                placeholder="Name"
                                value={currentMessage.name || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, name: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                                required
                            />
                            <input
                                placeholder="Email"
                                type="email"
                                value={currentMessage.email || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, email: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                                required
                            />
                            <input
                                placeholder="Phone"
                                type="tel"
                                value={currentMessage.phone || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, phone: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                            />
                            <input
                                placeholder="Address"
                                value={currentMessage.address || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, address: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                            />
                            <input
                                placeholder="Subject"
                                value={currentMessage.subject || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, subject: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                            />
                            <textarea
                                placeholder="Message"
                                rows={4}
                                value={currentMessage.message || ''}
                                onChange={e => setCurrentMessage({ ...currentMessage, message: e.target.value })}
                                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: '#fff' }}
                                required
                            ></textarea>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.5rem 1rem', background: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
