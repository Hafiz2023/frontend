'use client';

import React, { useState } from 'react';
import styles from './Returns.module.css';

export default function ReturnsPage() {
    const [formData, setFormData] = useState({
        order_number: '',
        email: '',
        reason: 'defective',
        details: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('http://127.0.0.1:5000/api/public/returns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ order_number: '', email: '', reason: 'defective', details: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Returns & Exchange Center</h1>

            <div className={styles.contentGrid}>
                {/* Policy Section */}
                <div className={styles.policySection}>
                    <h3>Our Commitment</h3>
                    <p>
                        At ZA Traders, we stand 100% behind the quality of our products. We understand that sometimes things might not work out, and we are here to help ensuring a smooth experience.
                    </p>

                    <h3>Eligibility Criteria</h3>
                    <ul>
                        <li>Return request must be initiated within <strong>14 days</strong> of delivery.</li>
                        <li>Items must be unused, unwashed, and in original packaging.</li>
                        <li>Custom orders (e.g. printed tags with your logo) are non-refundable unless defective.</li>
                    </ul>

                    <h3>Exchange Process</h3>
                    <p>
                        If you received a defective item, initiate a request here. We will review it and arrange a replacement at no extra cost.
                    </p>

                    <div className={styles.highlightBox}>
                        <strong>Note:</strong> Refunds are processed to the original payment method within 7-10 business days after approval.
                    </div>
                </div>

                {/* Form Section */}
                <div className={styles.formSection}>
                    <h2 className={styles.formTitle}>Start a Return</h2>

                    <form onSubmit={handleSubmit}>
                        {status === 'success' && (
                            <div className={styles.success}>
                                Return request submitted! We will contact you shortly.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={styles.error}>
                                submission failed. Please try again or contact support.
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="order_number">Order Number</label>
                            <input
                                type="text"
                                id="order_number"
                                name="order_number"
                                placeholder="e.g. ZA-1024"
                                value={formData.order_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="reason">Reason for Return</label>
                            <select
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                            >
                                <option value="defective">Defective / Damaged</option>
                                <option value="incorrect_item">Received Incorrect Item</option>
                                <option value="size_issue">Size / Fit Issue</option>
                                <option value="not_satisfied">Not Satisfied</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="details">Additional Details</label>
                            <textarea
                                id="details"
                                name="details"
                                rows={4}
                                placeholder="Please describe the issue..."
                                value={formData.details}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
