import React from 'react';
import styles from './Admin.module.css';

export interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    subject: string;
    message: string;
    date: string;
}

interface ContactMessagesProps {
    messages: Message[];
    openAddModal: () => void;
    openViewModal: (msg: Message) => void;
    openEditModal: (msg: Message) => void;
    handleDelete: (id: number) => void;
}

export default function ContactMessages({ 
    messages, 
    openAddModal, 
    openViewModal, 
    openEditModal, 
    handleDelete 
}: ContactMessagesProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className={styles.sectionTitle}>Contact Messages</h2>
                <button 
                    onClick={openAddModal} 
                    style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
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
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <button
                                            onClick={() => openViewModal(msg)}
                                            className={styles.viewBtn}
                                            style={{ marginRight: '0.5rem' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            View
                                        </button>
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
    );
}
