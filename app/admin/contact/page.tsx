'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import Link from 'next/link';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    subject: string;
    message: string;
    date: string;
    read: boolean;
}

export default function ContactAdminPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/api/v1/contact');
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (err) {
                console.error("Failed to fetch messages", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
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

    if (loading) return <div className={styles.loading}>Loading Contact Messages...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <Link href="/admin/dashboard" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                        &larr; Back to Dashboard
                    </Link>
                    <h1 className={styles.title}>Contact Inquiries</h1>
                </div>
            </header>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Contact Info</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                                    No messages found
                                </td>
                            </tr>
                        ) : (
                            messages.map((msg) => (
                                <tr key={msg.id}>
                                    <td style={{ whiteSpace: 'nowrap', color: '#9ca3af' }}>
                                        {new Date(msg.date).toLocaleDateString()}
                                    </td>
                                    <td style={{ fontWeight: 600, color: '#fff' }}>{msg.name}</td>
                                    <td>
                                        <div style={{ fontSize: '0.9rem' }}>{msg.email}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>{msg.phone || '-'}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{msg.address || '-'}</div>
                                    </td>
                                    <td>{msg.subject}</td>
                                    <td title={msg.message}>
                                        <div className={styles.messageContent}>
                                            {msg.message}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            title="Delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
