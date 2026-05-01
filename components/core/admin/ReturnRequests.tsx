import React from 'react';
import styles from './Admin.module.css';

interface ReturnReq {
    id: number;
    order_number: string;
    email: string;
    reason: string;
    details: string;
    status: string;
    date: string;
}

interface ReturnRequestsProps {
    returns: ReturnReq[];
}

export default function ReturnRequests({ returns }: ReturnRequestsProps) {
    return (
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
    );
}
