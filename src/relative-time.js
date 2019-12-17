const rtf = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
  style: "long"
});

export function getRelativeTime(date) {
  const now = new Date();
  let timePassed = Math.floor(now.getTime() - date.getTime());

  const divide = n => {
    timePassed = Math.floor(timePassed / n);
  };

  divide(1000); // seconds
  if (timePassed < 60) {
    return rtf.format(-timePassed, "second");
  }

  divide(60); // minutes
  if (timePassed < 60) {
    return rtf.format(-timePassed, "minute");
  }

  divide(60); // hours
  if (timePassed < 24) {
    return rtf.format(-timePassed, "hour");
  }

  divide(24); // days
  if (timePassed < 7) {
    return rtf.format(-timePassed, "day");
  }

  divide(7); // weeks
  if (
    date.getUTCMonth() === now.getUTCMonth() ||
    date.getUTCDate() < now.getUTCDate()
  ) {
    return rtf.format(-timePassed, "week");
  }

  divide(30.4167); // months (average)
  if (timePassed < 12) {
    return rtf.format(-timePassed, "month");
  }

  // years
  return rtf.format(-timePassed, "year");
}
