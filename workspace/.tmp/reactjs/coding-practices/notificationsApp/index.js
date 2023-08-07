const Notification = (props) => {
  const { className, message, icon_src } = props;
  return (
    <div className={`bar-container ${className}`}>
      <img src={icon_src} className="bar-icon" />
      <p className="msg-heading">{message}</p>
    </div>
  );
};

const element = (
  <div className="main-container">
    <h1 className="main-heading">Notifications</h1>
    <Notification
      icon_src="https://assets.ccbp.in/frontend/react-js/primary-icon-img.png"
      className="notification-1"
      message="Information message"
    />
    <Notification
      icon_src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
      className="notification-2"
      message="Success message"
    />
    <Notification
      icon_src="https://assets.ccbp.in/frontend/react-js/warning-icon-img.png"
      className="notification-3"
      message="Warning message"
    />
    <Notification
      icon_src="https://assets.ccbp.in/frontend/react-js/danger-icon-img.png"
      className="notification-4"
      message="Error message"
    />
  </div>