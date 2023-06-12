import React from 'react';
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import toast from '../src';

const EXIT_ANIMATION_DURATION = 320;

describe('toast', () => {
  it('renders a toast when the show button is clicked', async () => {
    const TOAST_TEXT = 'Hello Message';
    render(
      <button type="button" onClick={() => toast(TOAST_TEXT)}>
        show
      </button>,
    );

    const button = screen.getByText('show');
    await act(() => button.click());

    screen.getByText(TOAST_TEXT);
  });

  it('displays the toast for the specified duration and then removes it', async () => {
    const TOAST_TEXT = 'message for duration';
    const DURATION = 500;
    await act(() => toast(TOAST_TEXT, DURATION));

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('renders toast with infinite duration until manually closed', async () => {
    const TOAST_TEXT = 'message for infinity duration';
    const infiniteToast = await act(() => toast(TOAST_TEXT, Infinity));

    const toastElement = screen.getByText(TOAST_TEXT);
    await act(() => infiniteToast.close());
    await waitForElementToBeRemoved(toastElement, {
      timeout: EXIT_ANIMATION_DURATION,
    });
  });

  it('renders and removes toast based on specified duration in options', async () => {
    const TOAST_TEXT = 'message for duration with options';
    const DURATION = 500;
    await act(() => toast(TOAST_TEXT, { duration: DURATION }));

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('applies custom className to toast container', async () => {
    const TOAST_TEXT = 'message for classname';
    const CLASSNAME = 'test-classname';
    await act(() => toast(TOAST_TEXT, { className: CLASSNAME }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    expect(toastDOM).toHaveClass(CLASSNAME);
  });

  it('closes the toast when clickClosable is true and toast is clicked', async () => {
    const TOAST_TEXT = 'message for closeable';
    await act(() => toast(TOAST_TEXT, { clickClosable: true }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());

    await waitForElementToBeRemoved(toastDOM, {
      timeout: EXIT_ANIMATION_DURATION,
    });
  });

  it('renders toast with specified position', async () => {
    const TOAST_TEXT = 'message for top-center';
    await act(() => toast(TOAST_TEXT, { position: 'top-center' }));
    const toastDOM1 = screen.getByText(TOAST_TEXT);

    expect(toastDOM1.parentElement).toHaveClass('top-center');
  });

  it('limits visible toasts based on maxVisibleToasts', async () => {
    const TOAST_TEXT = 'message for maxVisibleToasts';
    await act(() => {
      toast(TOAST_TEXT);
      toast(TOAST_TEXT, { maxVisibleToasts: 1 });
    });

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

  it('renders custom toast content with render prop', async () => {
    const TOAST_TEXT = 'message for custom render';
    const render = () => <div className="custom-class">custom render</div>;
    await act(() => toast(TOAST_TEXT, { render }));

    const toastDOM = screen.getByText('custom render');
    expect(toastDOM).toHaveClass('custom-class');
  });

  it('triggers onClick event when toast is clicked', async () => {
    const TOAST_TEXT = 'message for click';
    const onClick = jest.fn();
    await act(() => toast(TOAST_TEXT, { clickable: true, onClick }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onCloseStart and onClose when toast is clicked with clickClosable set to true', async () => {
    const TOAST_TEXT = 'message for onClose';
    const onCloseStart = jest.fn();
    const onClose = jest.fn();
    await act(() =>
      toast(TOAST_TEXT, { onCloseStart, onClose, clickClosable: true }),
    );

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());
    expect(onCloseStart).toHaveBeenCalled();
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('updates the toast duration and removes the toast after the new duration', async () => {
    const TOAST_TEXT = 'message for updateDuration';
    const DURATION = Infinity;
    const NEW_DURATION = 500;
    const toastInstance = await act(() => toast(TOAST_TEXT, DURATION));

    toastInstance.updateDuration(NEW_DURATION);
    const toastElement = screen.getByText(TOAST_TEXT);

    await waitForElementToBeRemoved(toastElement, {
      timeout: NEW_DURATION + EXIT_ANIMATION_DURATION,
    });
  });

  it('updates the content of the displayed toast', async () => {
    const TOAST_TEXT = 'message for updateContent';
    const NEW_TOAST_TEXT = 'new message for updateContent';
    const toastInstance = await act(() => toast(TOAST_TEXT));
    const toastElement = screen.getByText(TOAST_TEXT);

    await act(() => toastInstance.update(NEW_TOAST_TEXT));
    expect(toastElement).toHaveTextContent(NEW_TOAST_TEXT);
  });

  it('applies the specified theme to the toast', async () => {
    const TOAST_TEXT = 'message for theme';
    await act(() => toast(TOAST_TEXT, { theme: 'light' }));
    const toastElement = screen.getByText(TOAST_TEXT);

    expect(toastElement).toHaveClass('toast-light');
  });

  it('applies the specified zIndex to the toast', async () => {
    const TOAST_TEXT = 'message for zIndex';
    await act(() => toast(TOAST_TEXT, { zIndex: 10 }));
    const toastElement = screen.getByText(TOAST_TEXT);

    expect(toastElement.parentElement).toHaveStyle('z-index: 10');
  });

  it('renders second toast upper than first toast when isReversedOrder set to true', async () => {
    const FIRST_TEXT = 'first message';
    const SECOND_TEXT = 'second message';
    await act(() => toast(FIRST_TEXT));
    await act(() => toast(SECOND_TEXT, { isReversedOrder: true }));
    const toastElements = screen.getAllByText(/message/);
    expect(toastElements[0]).toHaveTextContent(SECOND_TEXT);
  });
});
