import classes from "./contact-form.module.css";
import React, { useCallback, useEffect } from "react";
import Notification from "@/components/ui/notification";

export enum RequestStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
  Empty = "",
}
export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = React.useState("");
  const [enteredName, setEnteredName] = React.useState("");
  const [enteredMessage, setEnteredMessage] = React.useState("");
  const [requestStatus, setRequestStatus] = React.useState<RequestStatus>(
    RequestStatus.Empty
  );
  const [requestError, setRequestError] = React.useState("");

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.target.value);
  };

  const messageChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredMessage(event.target.value);
  };
  const submitFormHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const makeRequest = async () => {
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            name: enteredName,
            message: enteredMessage,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        setRequestStatus(RequestStatus.Success);
        setEnteredEmail("");
        setEnteredName("");
        setEnteredMessage("");

        return data;
      };

      try {
        setRequestStatus(RequestStatus.Pending);
        await makeRequest();
      } catch (err) {
        if (err instanceof Error) {
          setRequestError(err.message);
        }
        setRequestStatus(RequestStatus.Error);
      }
    },
    [enteredEmail, enteredMessage, enteredName]
  );

  let notification = {
    status: RequestStatus.Empty,
    title: "",
    message: "",
  };

  if (requestStatus === RequestStatus.Pending) {
    notification = {
      status: RequestStatus.Pending,
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === RequestStatus.Success) {
    notification = {
      status: RequestStatus.Success,
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === RequestStatus.Error) {
    notification = {
      status: RequestStatus.Error,
      title: "Error!",
      message: requestError,
    };
  }

  useEffect(() => {
    if (
      requestStatus === RequestStatus.Success ||
      requestStatus === RequestStatus.Error
    ) {
      const timer = setTimeout(() => {
        setRequestStatus(RequestStatus.Empty);
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <>
      <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form onSubmit={submitFormHandler} className={classes.form}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={enteredEmail}
                onChange={emailChangeHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={enteredName}
                onChange={nameChangeHandler}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={messageChangeHandler}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>
      {notification.status !== RequestStatus.Empty && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}
