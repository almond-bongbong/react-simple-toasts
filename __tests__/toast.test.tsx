import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import toast, { toast as toastNamed } from '../src';
import { generateMessage } from '../src/lib/utils';

const EXIT_ANIMATION_DURATION = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('toast', () => {
  it('renders a toast when the show button is clicked', async () => {
    const TOAST_TEXT = generateMessage();
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
    const TOAST_TEXT = generateMessage();
    const DURATION = 500;
    await act(() => toast(TOAST_TEXT, DURATION));

    const toastElement = screen.getByText(TOAST_TEXT);

    await waitFor(() => delay(DURATION + EXIT_ANIMATION_DURATION));
    fireEvent.transitionEnd(toastElement);

    expect(toastElement).not.toBeInTheDocument();
  });

  it('renders toast with infinite duration until manually closed', async () => {
    const TOAST_TEXT = generateMessage();
    const infiniteToast = await act(() => toast(TOAST_TEXT, Infinity));

    const toastElement = screen.getByText(TOAST_TEXT);
    await act(() => infiniteToast.close());

    await act(() => delay(EXIT_ANIMATION_DURATION));
    fireEvent.transitionEnd(toastElement);

    expect(toastElement).not.toBeInTheDocument();
  });

  it('renders and removes toast based on specified duration in options', async () => {
    const TOAST_TEXT = generateMessage();
    const DURATION = 500;
    await act(() => toast(TOAST_TEXT, { duration: DURATION }));

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitFor(() => delay(DURATION + EXIT_ANIMATION_DURATION));
    fireEvent.transitionEnd(toastElement);

    expect(toastElement).not.toBeInTheDocument();
  });

  it('applies custom className to toast container', async () => {
    const TOAST_TEXT = generateMessage();
    const CLASSNAME = 'test-classname';
    await act(() => toast(TOAST_TEXT, { className: CLASSNAME }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    expect(toastDOM).toHaveClass(CLASSNAME);
  });

  it('closes the toast when clickClosable is true and toast is clicked', async () => {
    const TOAST_TEXT = generateMessage();
    await act(() => toast(TOAST_TEXT, { clickClosable: true }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());

    await waitFor(() => delay(EXIT_ANIMATION_DURATION));
    fireEvent.transitionEnd(toastDOM);

    expect(toastDOM).not.toBeInTheDocument();
  });

  it('renders toast with specified position', async () => {
    const TOAST_TEXT = generateMessage();
    await act(() => toast(TOAST_TEXT, { position: 'top-center' }));
    const toastDOM1 = screen.getByText(TOAST_TEXT);

    expect(toastDOM1.parentElement).toHaveClass('toast__message--top-center');
  });

  it('limits visible toasts based on maxVisibleToasts', async () => {
    const TOAST_TEXT = generateMessage();
    const DURATION = 500;

    await act(() => {
      toast(TOAST_TEXT, DURATION);
      toast(TOAST_TEXT, { duration: DURATION, maxVisibleToasts: 1 });
    });

    const toastDOM = screen.getAllByText(TOAST_TEXT);

    toastDOM.forEach((toast) => {
      fireEvent.transitionEnd(toast);
    });

    const toasts = screen.getAllByText(TOAST_TEXT);
    expect(toasts.length).toBe(1);
  });

  it('renders custom toast content with render prop', async () => {
    const TOAST_TEXT = generateMessage();
    const render = () => <div className="custom-class">custom render</div>;
    await act(() => toast(TOAST_TEXT, { render }));

    const toastDOM = screen.getByText('custom render');
    expect(toastDOM).toHaveClass('custom-class');
  });

  it('triggers onClick event when toast is clicked', async () => {
    const TOAST_TEXT = generateMessage();
    const onClick = jest.fn();
    await act(() => toast(TOAST_TEXT, { clickable: true, onClick }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onCloseStart and onClose when toast is clicked with clickClosable set to true', async () => {
    const TOAST_TEXT = generateMessage();
    const DURATION = 500;
    const onCloseStart = jest.fn();
    const onClose = jest.fn();
    await act(() =>
      toast(TOAST_TEXT, { onCloseStart, onClose, clickClosable: true, duration: DURATION }),
    );

    const toastDOM = screen.getByText(TOAST_TEXT);
    await act(() => toastDOM.click());
    fireEvent.transitionEnd(toastDOM);

    expect(onCloseStart).toHaveBeenCalled();
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('updates the toast duration and removes the toast after the new duration', async () => {
    const TOAST_TEXT = generateMessage();
    const DURATION = Infinity;
    const NEW_DURATION = 500;
    const toastInstance = await act(() => toast(TOAST_TEXT, DURATION));

    toastInstance.updateDuration(NEW_DURATION);
    const toastElement = screen.getByText(TOAST_TEXT);

    await act(() => delay(NEW_DURATION));
    fireEvent.transitionEnd(toastElement);

    expect(toastElement).not.toBeInTheDocument();
  });

  it('updates the content of the displayed toast', async () => {
    const TOAST_TEXT = generateMessage();
    const NEW_TOAST_TEXT = generateMessage();
    const toastInstance = await act(() => toast(TOAST_TEXT));
    const toastElement = screen.getByText(TOAST_TEXT);

    await act(() => toastInstance.update(NEW_TOAST_TEXT));
    expect(toastElement).toHaveTextContent(NEW_TOAST_TEXT);
  });

  it('applies the specified theme to the toast', async () => {
    const TOAST_TEXT = generateMessage();
    await act(() => toast(TOAST_TEXT, { theme: 'light' }));
    const toastElement = screen.getByText(TOAST_TEXT);

    expect(toastElement).toHaveClass('toast__light');
  });

  it('applies the specified zIndex to the toast', async () => {
    const TOAST_TEXT = generateMessage();
    await act(() => toast(TOAST_TEXT, { zIndex: 10 }));
    const toastElement = screen.getByText(TOAST_TEXT);

    expect(toastElement.parentElement).toHaveStyle('z-index: 10');
  });

  it('closes the toast rendered with render option when clickClosable is true and toast is clicked ', async () => {
    const TOAST_TEXT = generateMessage();
    await act(() =>
      toast(TOAST_TEXT, {
        clickClosable: true,
        render: (message) => <div>{message}</div>,
      }),
    );
    const toastElement = screen.getByText(TOAST_TEXT);
    await act(() => toastElement.click());
    await waitFor(() => delay(EXIT_ANIMATION_DURATION));
    fireEvent.transitionEnd(toastElement);

    expect(toastElement).not.toBeInTheDocument();
  });

  it('renders second toast upper than first toast when isReversedOrder set to true', async () => {
    const FIRST_TEXT = generateMessage();
    const SECOND_TEXT = generateMessage();
    await act(() => toast(FIRST_TEXT));
    await act(() => toast(SECOND_TEXT, { isReversedOrder: true }));
    const toastElements = screen.getAllByText(/message/);
    expect(toastElements[0]).toHaveTextContent(SECOND_TEXT);
  });

  it('applies theme class to toast when theme is specified and does not apply it when theme is not specified', async () => {
    const TOAST_TEXT = generateMessage();
    const toastContentClassName = 'toast__content toast__theme-content';
    await act(() => toast(TOAST_TEXT, { theme: 'dark' }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    expect(toastDOM).toHaveClass(toastContentClassName);

    const TOAST_TEXT2 = generateMessage();
    await act(() => toast(TOAST_TEXT2));
    const toastDOM2 = screen.getByText(TOAST_TEXT2);
    expect(toastDOM2).not.toHaveClass(toastContentClassName);
  });

  it('should display the toast message indefinitely when duration is set to 0 or null', async () => {
    const TOAST_TEXT = generateMessage();

    jest.useFakeTimers(); // Use fake timers

    await act(() => toast(TOAST_TEXT, 0));
    await act(() => {
      jest.runAllTimers(); // Run all pending timers
      return Promise.resolve();
    });

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement).toBeInTheDocument();

    jest.useRealTimers(); // Revert to real timers
  });

  it('should display the toast message indefinitely when duration is set to null', async () => {
    const TOAST_TEXT = generateMessage();

    jest.useFakeTimers(); // Use fake timers

    await act(() => toast(TOAST_TEXT, null));
    await act(() => {
      jest.runAllTimers(); // Run all pending timers
      return Promise.resolve();
    });

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement).toBeInTheDocument();

    jest.useRealTimers(); // Revert to real timers
  });

  it('should renders a toast with the named export', async () => {
    const TOAST_TEXT = generateMessage();
    render(
      <button type="button" onClick={() => toastNamed(TOAST_TEXT)}>
        show
      </button>,
    );

    const button = screen.getByText('show');
    await act(() => button.click());

    screen.getByText(TOAST_TEXT);
  });

  it('should retain the theme when updating the toast with an options object', async () => {
    const TOAST_TEXT = generateMessage();
    const UPDATED_TEXT = generateMessage();
    const toastContentClassName = 'toast__theme-content';

    const toastInstance = await act(() => toast(TOAST_TEXT, { theme: 'dark' }));

    const toastDOM = screen.getByText(TOAST_TEXT);
    expect(toastDOM).toHaveClass(toastContentClassName);

    await act(() => toastInstance.update({ message: UPDATED_TEXT }));

    const updatedToastDOM = screen.getByText(UPDATED_TEXT);
    expect(updatedToastDOM).toHaveClass(toastContentClassName);
  });
});
