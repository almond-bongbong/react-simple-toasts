import React from 'react';
import dayjs from 'dayjs';
import styles from './change-log.module.css';

function ChangeLog() {
  return (
    <div>
      <section id="introduction">
        <h2>📚 Introduction</h2>
        <p>
          This page provides information about the changes and updates made in each version of
          react-simple-toasts. Please refer to this page for the details of new features,
          improvements, and bug fixes in each version.
        </p>
      </section>

      <section className={styles.new}>
        <h3>6.0.1</h3>
        <div className={styles.date}>{dayjs().format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🔄 Compatibility</h4>
        <ul className={styles.features}>
          <li>
            <strong>React 19 Support:</strong> Added compatibility support for React 19 RC version.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>6.0.0</h3>
        <div className={styles.date}>{dayjs().format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🔄 Major Changes</h4>
        <ul className={styles.features}>
          <li>
            <strong>BEM Styling Introduced:</strong> Switched from CSS Modules class-based styling
            to BEM methodology. This change makes style overriding easier.
          </li>
          <li>
            <strong>Explicit Style Import Required:</strong> From version 6.0.0, you need to
            explicitly import the <code>style.css</code> file.
          </li>
        </ul>
      </section>

      <section>
        <h3>5.11.0</h3>
        <div className={styles.date}>{dayjs().format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Named Export:</strong> Added a named export <code>toast</code> to resolve type
            issues with the default export.
            <a href="https://github.com/almond-bongbong/react-simple-toasts/pull/92">#92</a>
          </li>
        </ul>
        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Maintain Theme on Update:</strong> Fixed an issue where the theme was not being
            maintained after updates.
            <a href="https://github.com/almond-bongbong/react-simple-toasts/pull/95">#95</a>
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.10.0</h3>
        <div className={styles.date}>{dayjs(1695454943400).format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>dark-edge</code>,{' '}
            <code>light-edge</code>.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.9.0</h3>
        <div className={styles.date}>{dayjs(1694441587084).format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Introduced new themes: <code>moonlight</code> and{' '}
            <code>sunset</code>. These themes offer a visually appealing experience and provide more
            customization options for toast notifications.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.8.3</h3>
        <div className={styles.date}>{dayjs(1693947426761).format('YYYY.MM.DD')}</div>{' '}
        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>Add Terser Plugin:</strong> Integrated Terser plugin into Rollup configuration
            for code minification and optimization.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.8.2</h3>
        <div className={styles.date}>{dayjs(1692873349604).format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>Theme Option Type Update:</strong> Modified the theme option type to accept
            string, and improved the ability to use custom themes through the theme option.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.8.1</h3>
        <div className={styles.date}>{dayjs(1692873339604).format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Fix Theme Style Overlap with Render Option:</strong> Fixed a bug where the theme
            style overlapped when using the render option.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.8.0</h3>
        <div className={styles.date}>{dayjs().format('YYYY.MM.DD')}</div>
        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Loading Option:</strong> Added a loading option. The loading option provides the
            functionality to display a loading indicator within a toast message. It can be set as a{' '}
            <code>boolean</code> value or as a <code>Promise</code> object, allowing for more
            customized loading behavior.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.7.1</h3>
        <div className={styles.date}>{dayjs(1692359510375).format('YYYY.MM.DD')}</div>{' '}
        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>Duration Configuration:</strong> Added support for <code>0</code> and{' '}
            <code>null</code> as the <code>duration</code> option. This allows the toast messages
            not to close automatically when using these values. The existing <code>Infinity</code>{' '}
            option will continue to create an "infinite toast."
          </li>
        </ul>
        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Fixed Long Message Positioning:</strong> Fixed an issue where the position was
            not calculated correctly for messages that break into multiple lines.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.7.0</h3>
        <div className={styles.date}>{dayjs(1692063912987).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Gap Configuration Option:</strong> Added a new <code>gap</code> option that
            allows you to control the distance between toast messages. This new feature provides
            greater flexibility in customizing the appearance of the toasts.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.6.1</h3>
        <div className={styles.date}>{dayjs(1690979544805).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Fixed Failed Tests:</strong> Resolved issues related to failing tests.
          </li>
        </ul>

        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>Build System Enhancement for Development:</strong> Improved the build system for
            a smoother development experience.
          </li>
          <li>
            <strong>Code Cleanup:</strong> Removed unnecessary code for better maintainability and
            performance.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.6.0</h3>
        <div className={styles.date}>{dayjs(1690979544805).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>blue-dusk</code>,{' '}
            <code>ocean-wave</code>.
          </li>
        </ul>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Offset Options:</strong> Added new offset options: <code>offsetX</code> and{' '}
            <code>offsetY</code>. These options allow you to control the horizontal and vertical
            distance of the toast message from the edge of the viewport.
          </li>
        </ul>

        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>CSS Modules for Theme classNames:</strong> CSS Modules have been applied to
            theme classNames. This allows for better local scoping of CSS by default and reduces the
            chance of globally scoped CSS interfering with the components.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.5.0</h3>
        <div className={styles.date}>{dayjs(1690070400000).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>chroma</code>.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.4.0</h3>
        <div className={styles.date}>{dayjs(1689196653355).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>pink-dawn</code>.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.3.0</h3>
        <div className={styles.date}>{dayjs(1688884298301).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>plain</code>.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.2.1</h3>
        <div className={styles.date}>{dayjs(1688257564385).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Fixed styling for center position:</strong> Fixed a bug where incorrect styles
            were displayed when position was set to center.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.2.0</h3>
        <div className={styles.date}>{dayjs(1687592209000).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🌈 Theme Expansion</h4>
        <ul className={styles.features}>
          <li>
            <strong>New Themes:</strong> Added new themes: <code>success</code>, <code>info</code>,
            <code>warning</code>, <code>failure</code>, and <code>frosted-glass</code>.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.1.0</h3>
        <div className={styles.date}>{dayjs(1686740905761).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>isReversedOrder Option:</strong> A new <code>isReversedOrder</code> option has
            been added. By setting this option to true, the order of the displayed toasts will be
            reversed.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.0.1</h3>
        <div className={styles.date}>{dayjs(1686577466589).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>Remove deprecated time option:</strong> The previously deprecated{' '}
            <code>time</code> option has been removed in this version for better performance and
            efficiency.
          </li>
        </ul>
        <h4 className={styles.sub_title}>🐛 Bug Fixes</h4>
        <ul className={styles.features}>
          <li>
            <strong>Clickable with Render option:</strong> Fixed a bug where click options were not
            working when the <code>render</code> option was used.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>5.0.0</h3>
        <div className={styles.date}>{dayjs(1686444450563).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>zIndex Options:</strong> We have added zIndex options. You can now set the css
            z-index property for individual toast messages or for the entire message.
          </li>
        </ul>

        <h4 className={styles.sub_title}>⚙️ Improvements</h4>
        <ul className={styles.features}>
          <li>
            <strong>HTML Structure of Toast Messages:</strong> We have improved and refactored the
            HTML structure of the toast messages. This was done for improved scalability with
            continuous updates.
          </li>
          <li>
            <strong>Animation Simplification:</strong> We have streamlined the overall animations.
            Particularly, the animation for toast messages appearing from the top has been improved
            to be more UX-friendly.
          </li>
        </ul>
      </section>

      <section className={styles.new}>
        <h3>4.0.0</h3>
        <div className={styles.date}>{dayjs(1686100642000).format('YYYY.MM.DD')}</div>

        <h4 className={styles.sub_title}>🎉 New Features</h4>
        <ul className={styles.features}>
          <li>
            <strong>Theme Support:</strong> react-simple-toasts now supports theming. You can use
            built-in themes ('dark' and 'light') or create your own custom themes using CSS.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default ChangeLog;
