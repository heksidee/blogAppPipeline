import { useSelector } from 'react-redux';
import './NotificationStyles.css';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) return null;

  return <div className={`notification ${notification.type}`}>{notification.message}</div>;
};

export default Notification;
