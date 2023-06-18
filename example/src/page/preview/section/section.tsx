import React, { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./section.module.css";
import toast, { Theme } from "react-simple-toasts";

function Section() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const theme = params.get('theme') as Theme;

  useLayoutEffect(() => {
    document.body.style.background = 'transparent';
  }, []);

  useEffect(() => {
    let count = 0;

    const intervalId = window.setInterval(() => {
      toast('Hello World!', { theme });
      count += 1;

      if (count === 3) {
        window.clearInterval(intervalId);
      }
    }, 1000);
  }, [theme]);

  return <div className={styles.container} />;
}

export default Section;
