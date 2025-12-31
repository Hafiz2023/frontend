import React from 'react';
import styles from './Shipping.module.css';
import Link from 'next/link';

export default function ShippingPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shipping & Delivery</h1>

            <div className={styles.contentWrapper}>
                {/* Main Content Info */}
                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            Delivery Areas
                        </h3>
                        <p className={styles.text}>
                            We are proud to offer nationwide shipping across all of Pakistan. Whether you are in a major city like Karachi, Lahore, or Islamabad, or in a more remote area, we ensure your custom labels and patches reach you safely. For international inquiries, please contact our support team.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Processing & Dispatch</h3>
                        <div className={styles.infoBox}>
                            <h4>Standard Orders</h4>
                            <p className="mb-2 text-gray-300">Processed within 2-3 business days.</p>
                            <h4>Custom Manufacturing</h4>
                            <p className="text-gray-300">Production takes 5-10 business days depending on design complexity.</p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Shipping Rates</h3>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Destination</th>
                                        <th>Estimated Time</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lahore (Local)</td>
                                        <td>1-2 Days</td>
                                        <td>Free (Orders &gt; 5k PKR)</td>
                                    </tr>
                                    <tr>
                                        <td>Major Cities</td>
                                        <td>2-3 Days</td>
                                        <td>Calculated at Checkout</td>
                                    </tr>
                                    <tr>
                                        <td>Remote Areas</td>
                                        <td>3-5 Days</td>
                                        <td>Calculated at Checkout</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Widget */}
                <aside className={styles.sidebar}>
                    <div className={styles.trackingCard}>
                        <h3 className={styles.trackingTitle}>Track Order</h3>
                        <p className={styles.text} style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            Enter your Order ID to see the current status of your shipment.
                        </p>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Order ID (e.g. ZA-1023)" className={styles.input} />
                        </div>
                        <button className={styles.trackBtn}>Track Now</button>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5rem' }}>Need Help?</h4>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                                Contact our support team if you have questions about your delivery.
                            </p>
                            <Link href="/contact-us" style={{ color: '#c9a14a', textDecoration: 'none', fontWeight: 500, display: 'inline-block', marginTop: '0.5rem' }}>
                                Contact Support &rarr;
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

