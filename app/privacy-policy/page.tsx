import React from 'react';
import styles from './PrivacyPolicy.module.css';
import LoginSidebar from '../../components/LoginSidebar';
import PrivacyContent from '../../components/PrivacyContent';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>Last updated: December 19, 2025</p>
      </header>

      <div className={styles.content}>
        <PrivacyContent />
        <LoginSidebar />
      </div>
    </div>
  );
}
