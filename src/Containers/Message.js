import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { firestore } from "../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

import { getRelativeTime } from "../relative-time";

import classNames from "@chbphone55/classnames";

function Message({ message, timestamp, uid, activeUID }) {
  const [user, loadingUser, errorLoadingUser] = useDocument(
    firestore.doc(`users/${uid}`)
  );

  let avatar = null;
  if (loadingUser) {
    avatar = (
      <svg
        className="Message__avatar Message__avatar--placeholder"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#BBB" d="M0 0h10v10H0z" />
      </svg>
    );
  } else if (!errorLoadingUser) {
    const userData = user.data();
    avatar = (
      <div title={userData.displayName} className="Message__avatar-wrapper">
        <img className="Message__avatar" src={userData.photoURL} alt="" />
      </div>
    );
  }

  const readableTimestamp = useMemo(
    () =>
      timestamp ? getRelativeTime(new Date(timestamp.toDate() - 1000)) : "",
    [timestamp]
  );

  const [isTimestampShowing, setTimestampShowing] = useState(false);
  const toggleTimestampShowing = useCallback(() => {
    setTimestampShowing(!isTimestampShowing);
  }, [isTimestampShowing]);

  useEffect(() => {
    if (isTimestampShowing) {
      window.addEventListener("click", toggleTimestampShowing);
      return () => window.removeEventListener("click", toggleTimestampShowing);
    }
  }, [isTimestampShowing, toggleTimestampShowing]);

  return (
    <article
      className={classNames("Message", {
        "Message--from-user": uid === activeUID
      })}
    >
      {avatar}
      <div
        onClick={toggleTimestampShowing}
        className="Message__message"
        timestamp={readableTimestamp}
        data-show-timestamp={isTimestampShowing}
      >
        {message}
      </div>
    </article>
  );
}

export default Message;
