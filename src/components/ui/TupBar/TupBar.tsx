import { routerUrls } from '@config/routerUrls';
import styles from './TupBar.module.scss';
import { useLocation } from 'react-router-dom';
import { HomeIcon } from '@components/ui/icons/HomeIcon';
import { ClockIcon } from '@components/ui/icons/ClockIcon';
import { ProfileIcon } from '@components/ui/icons/ProfileIcon';

const TupBar = () => {
    const location = useLocation();
  return (
    <ul className={styles.tapBar}>
      <li>
        <a href={routerUrls.root.mask}>
            <HomeIcon active={location.pathname === routerUrls.root.mask} />
        </a>
      </li>
      <li>
        <a href={routerUrls.schedule.mask}>
            <ClockIcon active={location.pathname === routerUrls.schedule.mask} />
        </a>
      </li>
      <li>
        <a href={routerUrls.login.mask}>
            <ProfileIcon active={location.pathname === routerUrls.login.mask} />
        </a>
      </li>
    </ul>
  );
};

export default TupBar;
