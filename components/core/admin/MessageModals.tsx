import React from 'react';
import styles from './Admin.module.css';
import { Message } from './ContactMessages';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

interface MessageModalsProps {
    isViewModalOpen: boolean;
    setIsViewModalOpen: (val: boolean) => void;
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    isEditing: boolean;
    currentMessage: Partial<Message>;
    setCurrentMessage: (msg: Partial<Message>) => void;
    handleSave: (e: React.FormEvent) => void;
}

export default function MessageModals({
    isViewModalOpen,
    setIsViewModalOpen,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    currentMessage,
    setCurrentMessage,
    handleSave
}: MessageModalsProps) {
    return (
        <>
            {/* View Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Contact Message"
            >
                <div className={styles.modalBody}>
                    <div className={styles.detailRow}>
                        <span className={styles.label}>From:</span>
                        <div className={styles.value}>
                            <strong>{currentMessage.name}</strong> &lt;{currentMessage.email}&gt;
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            {currentMessage.phone} | {currentMessage.address || 'No Address'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            {currentMessage.date ? new Date(currentMessage.date).toLocaleString() : ''}
                        </div>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Subject:</span>
                        <div className={styles.value}>{currentMessage.subject}</div>
                    </div>

                    <div className={styles.detailRow}>
                        <span className={styles.label}>Message:</span>
                        <div className={styles.messageBox}>
                            {currentMessage.message}
                        </div>
                    </div>
                </div>

                <div className={styles.modalActions}>
                    <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    <a href={`mailto:${currentMessage.email}`} style={{ textDecoration: 'none' }}>
                        <Button variant="primary">Reply</Button>
                    </a>
                </div>
            </Modal>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isEditing ? 'Edit Message' : 'Add New Message'}
            >
                <form onSubmit={handleSave}>
                    <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            placeholder="Name"
                            value={currentMessage.name || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, name: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                            required
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            value={currentMessage.email || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, email: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                            required
                        />
                        <Input
                            placeholder="Phone"
                            type="tel"
                            value={currentMessage.phone || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, phone: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                        />
                        <Input
                            placeholder="Address"
                            value={currentMessage.address || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, address: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                        />
                        <Input
                            placeholder="Subject"
                            value={currentMessage.subject || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, subject: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                        />
                        <textarea
                            placeholder="Message"
                            rows={5}
                            value={currentMessage.message || ''}
                            onChange={e => setCurrentMessage({ ...currentMessage, message: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', fontFamily: 'inherit' }}
                            required
                        ></textarea>
                    </div>

                    <div className={styles.modalActions}>
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
