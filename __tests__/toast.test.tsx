import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import toast from '../src';

const EXIT_ANIMATION_DURATION = 410;

describe('toast', () => {
  it('renders a toast when the show button is clicked', () => {
    const TOAST_TEXT = 'Hello Message';
    render(
      <button type="button" onClick={() => toast(TOAST_TEXT)}>
        show
      </button>,
    );
    const button = screen.getByText('show');
    button.click();
    screen.getByText(TOAST_TEXT);
  });

  it('displays the toast for the specified duration and then removes it', async () => {
    const TOAST_TEXT = 'message for duration';
    const DURATION = 1000;
    toast(TOAST_TEXT, DURATION);

    screen.getByText(TOAST_TEXT);
    await waitFor(() => expect(screen.queryByText(TOAST_TEXT)).toBeNull(), {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('displays the toast indefinitely when given an infinite duration', () => {
    const TOAST_TEXT = 'message for infinity duration';
    toast(TOAST_TEXT, Infinity);

    screen.getByText(TOAST_TEXT);
  });
});
