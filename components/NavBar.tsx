import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import styles from './NavBar.module.css';

const NavBar = () => {
    const links = [
        { name: 'Printed Tags', href: '/category/printed-tags' },
        { name: 'Leather Patches', href: '/leather-patches' },
        { name: 'Woven Labels', href: '/category/woven-labels' },
        { name: 'Paper Bags', href: '/category/paper-bags' },
        { name: 'Lace', href: '/category/lace' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
    ];

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                ZA Traders
            </Link>
            <div className={styles.navLinks}>
                {links.map((link) => (
                    <Link key={link.name} href={link.href} className={styles.link}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className={styles.actions}>
                <Search className={styles.searchIcon} size={20} />
                <Link href="http://localhost:5000/auth/login" className={styles.loginButton}>
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
