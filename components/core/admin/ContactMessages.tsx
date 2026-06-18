import React, { useMemo } from 'react';
import styles from './Admin.module.css';
import { Button } from '@/components/ui/Button';
import { Table, Column } from '@/components/ui/Table';

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
    const columns: Column<Message>[] = useMemo(() => [
        { key: 'date', title: 'Date', render: (msg) => new Date(msg.date).toLocaleDateString() },
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone', render: (msg) => msg.phone || '-' },
        { key: 'address', title: 'Address', render: (msg) => msg.address || '-' },
        { key: 'subject', title: 'Subject' },
        { 
            key: 'message', 
            title: 'Message', 
            render: (msg) => (
                <div className={styles.messageContent} title={msg.message}>
                    {msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}
                </div>
            )
        },
        {
            key: 'actions',
            title: 'Actions',
            render: (msg) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        onClick={() => openViewModal(msg)}
                        className={styles.viewBtn}
                        style={{ marginRight: '0.5rem' }}
                        size="sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View
                    </Button>
                    <Button onClick={() => openEditModal(msg)} variant="ghost" size="sm" style={{ marginRight: '0.5rem', color: '#3b82f6' }}>Edit</Button>
                    <Button onClick={() => handleDelete(msg.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}>Delete</Button>
                </div>
            )
        }
    ], [openViewModal, openEditModal, handleDelete]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className={styles.sectionTitle}>Contact Messages</h2>
                <Button 
                    onClick={openAddModal} 
                    style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    + Add New
                </Button>
            </div>

            <Table 
                columns={columns} 
                data={messages} 
                keyExtractor={(msg) => msg.id} 
            />
        </>
    );
}
