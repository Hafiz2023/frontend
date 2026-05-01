import React from 'react';
import styles from './Admin.module.css';
import { Message } from './ContactMessages';

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
            {isViewModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsViewModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Contact Message</h3>
                            <button className={styles.closeBtn} onClick={() => setIsViewModalOpen(false)}>&times;</button>
                        </div>

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
                            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setIsViewModalOpen(false)}>Close</button>
                            <a href={`mailto:${currentMessage.email}`} className={`${styles.btn} ${styles.btnPrimary}`} style={{ textDecoration: 'none' }}>
                                Reply
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>{isEditing ? 'Edit Message' : 'Add New Message'}</h3>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    placeholder="Name"
                                    value={currentMessage.name || ''}
                                    onChange={e => setCurrentMessage({ ...currentMessage, name: e.target.value })}
                                    style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                    required
                                />
                                <input
                                    placeholder="Email"
                                    type="email"
                                    value={currentMessage.email || ''}
                                    onChange={e => setCurrentMessage({ ...currentMessage, email: e.target.value })}
                                    style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                    required
                                />
                                <input
                                    placeholder="Phone"
                                    type="tel"
                                    value={currentMessage.phone || ''}
                                    onChange={e => setCurrentMessage({ ...currentMessage, phone: e.target.value })}
                                    style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                />
                                <input
                                    placeholder="Address"
                                    value={currentMessage.address || ''}
                                    onChange={e => setCurrentMessage({ ...currentMessage, address: e.target.value })}
                                    style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' }}
                                />
                                <input
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
                                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
