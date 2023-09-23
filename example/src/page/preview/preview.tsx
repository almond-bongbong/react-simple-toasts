import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../component/button/button';
import styles from './preview.module.css';
import { useLayoutEffect, useRef, useState } from 'react';

function Preview() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const category = new URLSearchParams(search).get('category') || 'standard';
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setContainerSize([container.offsetWidth, container.offsetHeight]);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.button_wrap}>
        <Button onClick={() => navigate({ search: '?category=standard' })}>Standard</Button>
        <Button onClick={() => navigate({ search: '?category=creative' })}>Creative</Button>
      </div>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.size}>
          {containerSize[0]} x {containerSize[1]}
        </div>
        {category === 'standard' && (
          <>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=dark" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=light" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=dark-edge" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=light-edge" />
            </div>
          </>
        )}

        {category === 'creative' && (
          <>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=plain" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=success" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=info" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=warning" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=failure" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=pink-dawn" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=chroma" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=frosted-glass" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=blue-dusk" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=ocean-wave" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=sunset" />
            </div>
            <div className={styles.section}>
              <iframe src="/preview/section?theme=moonlight" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Preview;
