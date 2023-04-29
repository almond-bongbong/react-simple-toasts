import React from 'react';
import { render, screen } from '@testing-library/react';
import toast from '../src';

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
});
