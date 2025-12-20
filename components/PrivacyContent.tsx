import React from 'react';
import styles from './PrivacyContent.module.css';

export default function PrivacyContent() {
    return (
        <main className={styles.privacyContent}>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>1. Introduction</h2>
                <p className={styles.text}>
                    Welcome to Za Traders. We respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                    (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>2. Data We Collect</h2>
                <p className={styles.text}>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul className={styles.list}>
                    <li className={styles.listItem}><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                    <li className={styles.listItem}><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                    <li className={styles.listItem}><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>3. How We Use Your Data</h2>
                <p className={styles.text}>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li className={styles.listItem}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>4. Data Security</h2>
                <p className={styles.text}>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>5. Contact Us</h2>
                <p className={styles.text}>
                    If you have any questions about this privacy policy or our privacy practices, please contact us.
                </p>
            </section>
        </main>
    );
}
