import { clearToasts, createToast } from '../src';
import { ToastPosition } from '../src/lib/constants';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';

const EXIT_ANIMATION_DURATION = 310;

describe('createToast', () => {
  afterEach(() => {
    clearToasts();
  });

  it('allows creating custom toast instances with specified classNames and overriding className', () => {
    const TOAST_TEXT = 'Hello Message';
    const TOAST_CLASSNAME = 'my-toast';
    const myToast = createToast({
      className: TOAST_CLASSNAME,
    });
    myToast(TOAST_TEXT);

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement.parentElement).toHaveClass(TOAST_CLASSNAME);

    const TOAST_TEXT_2 = 'Hello Message 2';
    const TOAST_CLASSNAME_2 = 'my-toast-2';
    myToast(TOAST_TEXT_2, { className: TOAST_CLASSNAME_2 });

    const overridenClassnameToastElement = screen.getByText(TOAST_TEXT_2);
    expect(overridenClassnameToastElement.parentElement).toHaveClass(
      TOAST_CLASSNAME_2,
    );
  });

  it('allows creating custom toast instances with specified durations and overriding duration', async () => {
    const TOAST_TEXT = 'message for duration';
    const DURATION = 1000;
    const myToast = createToast({
      duration: DURATION,
    });
    myToast(TOAST_TEXT);

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });

    const TOAST_TEXT_2 = 'message for duration 2';
    const DURATION_2 = 500;
    myToast(TOAST_TEXT_2, { duration: DURATION_2 });

    const toastElement2 = screen.getByText(TOAST_TEXT_2);
    await waitForElementToBeRemoved(toastElement2, {
      timeout: DURATION_2 + EXIT_ANIMATION_DURATION,
    });
  });

  it('allows creating custom toast instances with specified positions and overriding position', () => {
    const TOAST_TEXT = 'message for position';
    const POSITION = ToastPosition.TOP_LEFT;
    const myToast = createToast({
      position: POSITION,
    });
    myToast(TOAST_TEXT);

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement.parentElement?.parentElement).toHaveClass(POSITION);

    const TOAST_TEXT_2 = 'message for position 2';
    const POSITION_2 = ToastPosition.BOTTOM_RIGHT;
    myToast(TOAST_TEXT_2, { position: POSITION_2 });

    const overridenPositionToastElement = screen.getByText(TOAST_TEXT_2);
    expect(
      overridenPositionToastElement.parentElement?.parentElement,
    ).toHaveClass(POSITION_2);
  });

  it('allows creating custom toast instances with specified clickClosable and overriding clickClosable', async () => {
    const TOAST_TEXT = 'message for clickClosable';
    const myToast = createToast({
      clickClosable: true,
    });
    const onCloseStart = jest.fn();
    myToast(TOAST_TEXT, { onCloseStart });

    const toastElement = screen.getByText(TOAST_TEXT);
    toastElement.click();
    expect(onCloseStart).toHaveBeenCalled();

    const TOAST_TEXT_2 = 'message for clickClosable 2';
    const onCloseStart2 = jest.fn();
    myToast(TOAST_TEXT_2, { clickClosable: false, onCloseStart: onCloseStart2 });

    const overridenClickClosableToastElement = screen.getByText(TOAST_TEXT_2);
    overridenClickClosableToastElement.click();
    expect(onCloseStart2).not.toHaveBeenCalled();
  });
});
