'use client';

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

// Core Components
import StatsGrid from '@/components/core/admin/StatsGrid';
import ContactMessages, { Message } from '@/components/core/admin/ContactMessages';
import ReturnRequests from '@/components/core/admin/ReturnRequests';
import MessageModals from '@/components/core/admin/MessageModals';
import { Button } from '@/components/ui/Button';

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
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const openViewModal = (msg: Message) => {
        setCurrentMessage(msg);
        setIsViewModalOpen(true);
    };

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
            {stats && <StatsGrid stats={stats} />}

            <div className={styles.section}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                    <Button
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
                    </Button>
                    <Button
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
                    </Button>
                </div>

                {activeTab === 'messages' && (
                    <ContactMessages 
                        messages={messages}
                        openAddModal={openAddModal}
                        openViewModal={openViewModal}
                        openEditModal={openEditModal}
                        handleDelete={handleDelete}
                    />
                )}

                {activeTab === 'returns' && (
                    <ReturnRequests returns={returns} />
                )}
            </div>

            {/* Modals placed at the bottom */}
            <MessageModals 
                isViewModalOpen={isViewModalOpen}
                setIsViewModalOpen={setIsViewModalOpen}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isEditing={isEditing}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                handleSave={handleSave}
            />
        </div>
    );
}
