import React from "react";
import { render } from "react-dom";

import "./firebase";

async function loadRelativeTimeFormat() {
  if (Intl.RelativeTimeFormat) {
    return;
  }

  const { default: RelativeTimeFormat } = await import("relative-time-format");
  const en = await import("relative-time-format/locale/en.json");

  RelativeTimeFormat.addLocale(en);
  Intl.RelativeTimeFormat = RelativeTimeFormat;
}

loadRelativeTimeFormat()
  .then(async () => {
    const { default: App } = await import("./App.js");
    render(<App />, document.getElementById("root"));
  })
  .catch(error => console.error(error));
