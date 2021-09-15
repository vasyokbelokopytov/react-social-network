import React from 'react';
import styles from './Settings.module.css';

import ComingSoon from '../common/ComingSoon/ComingSoon';

const Settings: React.FC = () => {
  return (
    <section className={styles.settings}>
      <ComingSoon />
    </section>
  );
};

export default Settings;
