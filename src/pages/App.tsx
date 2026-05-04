import React from 'react';
import BulletinTable from '../components/bulletin/BulletinTable';
import StickyCoupon from '../components/coupon/StickyCoupon';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bülten</h1>
      </header>
      <main className={styles.main}>
        <BulletinTable />
      </main>
      <StickyCoupon />
    </div>
  );
};

export default App;
