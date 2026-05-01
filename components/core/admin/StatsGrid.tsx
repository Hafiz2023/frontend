import React from 'react';
import styles from './Admin.module.css';

interface DashboardStats {
    customers: number;
    vendors: number;
    products: number;
    invoices: number;
    low_stock: number;
    pending_invoices: number;
}

interface StatsGridProps {
    stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
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
    );
}
