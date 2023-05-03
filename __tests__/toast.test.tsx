import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import toast, { clearToasts } from '../src';

const EXIT_ANIMATION_DURATION = 310;

describe('toast', () => {
  afterEach(() => {
    clearToasts();
  });

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
    const DURATION = 500;
    toast(TOAST_TEXT, DURATION);

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('renders toast with infinite duration until manually closed', async () => {
    const TOAST_TEXT = 'message for infinity duration';
    const infiniteToast = toast(TOAST_TEXT, Infinity);

    const toastElement = screen.getByText(TOAST_TEXT);
    infiniteToast.close();
    await waitForElementToBeRemoved(toastElement, {
      timeout: EXIT_ANIMATION_DURATION,
    });
  });

  it('renders and removes toast based on specified duration in options', async () => {
    const TOAST_TEXT = 'message for duration with options';
    const DURATION = 500;
    toast(TOAST_TEXT, { duration: DURATION });

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('applies custom className to toast container', () => {
    const TOAST_TEXT = 'message for classname';
    const CLASSNAME = 'test-classname';
    toast(TOAST_TEXT, { className: CLASSNAME });

    const toastDOM = screen.getByText(TOAST_TEXT);
    expect(toastDOM.parentElement).toHaveClass(CLASSNAME);
  });

  it('closes the toast when clickClosable is true and toast is clicked', async () => {
    const TOAST_TEXT = 'message for closeable';
    toast(TOAST_TEXT, { clickClosable: true });

    const toastDOM = screen.getByText(TOAST_TEXT);
    toastDOM.click();
    await waitForElementToBeRemoved(toastDOM, {
      timeout: EXIT_ANIMATION_DURATION,
    });
  });

  it('renders toast with specified position', () => {
    const TOAST_TEXT = 'message for top-center';
    toast(TOAST_TEXT, { position: 'top-center' });
    const toastDOM1 = screen.getByText(TOAST_TEXT);
    expect(toastDOM1.closest('.toast-list')).toHaveClass('top-center');
  });

  it('limits visible toasts based on maxVisibleToasts', async () => {
    const TOAST_TEXT = 'message for maxVisibleToasts';
    toast(TOAST_TEXT);
    toast(TOAST_TEXT, { maxVisibleToasts: 1 });

    await waitFor(
      () => {
        const toasts = screen.getAllByText(TOAST_TEXT);
        expect(toasts.length).toBe(1);
      },
      {
        timeout: EXIT_ANIMATION_DURATION,
      },
    );
  });

  it('renders custom toast content with render prop', () => {
    const TOAST_TEXT = 'message for custom render';
    const render = () => <div className="custom-class">custom render</div>;
    toast(TOAST_TEXT, { render });

    const toastDOM = screen.getByText('custom render');
    expect(toastDOM).toHaveClass('custom-class');
  });

  it('triggers onClick event when toast is clicked', () => {
    const TOAST_TEXT = 'message for click';
    const onClick = jest.fn();
    toast(TOAST_TEXT, { clickable: true, onClick });

    const toastDOM = screen.getByText(TOAST_TEXT);
    toastDOM.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onCloseStart and onClose when toast is clicked with clickClosable set to true', async () => {
    const TOAST_TEXT = 'message for onClose';
    const onCloseStart = jest.fn();
    const onClose = jest.fn();
    toast(TOAST_TEXT, { onCloseStart, onClose, clickClosable: true });

    const toastDOM = screen.getByText(TOAST_TEXT);
    toastDOM.click();
    expect(onCloseStart).toHaveBeenCalled();
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('updates the toast duration and removes the toast after the new duration', async () => {
    const TOAST_TEXT = 'message for updateDuration';
    const DURATION = Infinity;
    const NEW_DURATION = 500;
    const toastInstance = toast(TOAST_TEXT, DURATION);

    toastInstance.updateDuration(NEW_DURATION);
    const toastElement = screen.getByText(TOAST_TEXT);

    await waitForElementToBeRemoved(toastElement, {
      timeout: NEW_DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('updates the content of the displayed toast', () => {
    const TOAST_TEXT = 'message for updateContent';
    const NEW_TOAST_TEXT = 'new message for updateContent';
    const toastInstance = toast(TOAST_TEXT);
    const toastElement = screen.getByText(TOAST_TEXT);

    toastInstance.update(NEW_TOAST_TEXT);
    expect(toastElement).toHaveTextContent(NEW_TOAST_TEXT);
  });
});
