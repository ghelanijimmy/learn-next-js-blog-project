import ReactDOM from "react-dom";

import classes from "./notification.module.css";
import { RequestStatus } from "@/components/contact-form/contact-form";

function Notification(props: {
  title: string;
  message: string;
  status: RequestStatus;
}) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === RequestStatus.Success) {
    statusClasses = classes.success;
  }

  if (status === RequestStatus.Error) {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")!
  );
}

export default Notification;
