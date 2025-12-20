import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PageHeader.module.css';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    breadcrumbs,
    backgroundImage = "/hero-bg.png" // Default fallback
}) => {
    return (
        <div className={styles.headerWrapper}>
            <Image
                src={backgroundImage}
                alt={title}
                fill
                className={styles.backgroundImage}
                priority
            />
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.breadcrumb}>
                    <Link href="/" className={styles.breadcrumbLink}>
                        Home
                    </Link>
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className={styles.separator}>&raquo;</span>
                            {item.href ? (
                                <Link href={item.href} className={styles.breadcrumbLink}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={styles.currentPage}>{item.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
