import React from 'react';
import { Phone, Mail, Facebook, Instagram, PhoneForwarded } from 'lucide-react';
import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <Phone size={16} />
          <span>+92 312 2189966</span>
        </div>
        <div className={styles.contactItem}>
          <Mail size={16} />
          <span>admin@zatraders.pk</span>
        </div>
      </div>
      <div className={styles.socials}>
        <Facebook size={18} className={styles.socialIcon} />
        <PhoneForwarded size={18} className={styles.socialIcon} /> {/* WhatsApp */}
        <Instagram size={18} className={styles.socialIcon} />
      </div>
    </div>
  );
};

export default TopBar;
