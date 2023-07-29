import { createToast } from '../src';
import { ToastPosition } from '../src/lib/constants';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';

const EXIT_ANIMATION_DURATION = 310;

describe('createToast', () => {
  it('allows creating custom toast instances with specified classNames and overriding className', async () => {
    const TOAST_TEXT = 'Hello Message';
    const TOAST_CLASSNAME = 'my-toast';
    const myToast = createToast({
      className: TOAST_CLASSNAME,
    });
    await act(() => myToast(TOAST_TEXT));

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement).toHaveClass(TOAST_CLASSNAME);

    const TOAST_TEXT_2 = 'Hello Message 2';
    const TOAST_CLASSNAME_2 = 'my-toast-2';
    await act(() => myToast(TOAST_TEXT_2, { className: TOAST_CLASSNAME_2 }));

    const overridenClassnameToastElement = screen.getByText(TOAST_TEXT_2);
    expect(overridenClassnameToastElement).toHaveClass(TOAST_CLASSNAME_2);
  });

  it('allows creating custom toast instances with specified durations and overriding duration', async () => {
    const TOAST_TEXT = 'message for duration';
    const DURATION = 1000;
    const myToast = createToast({
      duration: DURATION,
    });
    await act(() => myToast(TOAST_TEXT));

    const toastElement = screen.getByText(TOAST_TEXT);
    await waitForElementToBeRemoved(toastElement, {
      timeout: DURATION + EXIT_ANIMATION_DURATION,
    });

    const TOAST_TEXT_2 = 'message for duration 2';
    const DURATION_2 = 500;
    await act(() => myToast(TOAST_TEXT_2, { duration: DURATION_2 }));

    const toastElement2 = screen.getByText(TOAST_TEXT_2);
    await waitForElementToBeRemoved(toastElement2, {
      timeout: DURATION_2 + EXIT_ANIMATION_DURATION,
    });
  });

  it('allows creating custom toast instances with specified positions and overriding position', async () => {
    const TOAST_TEXT = 'message for position';
    const POSITION = ToastPosition.TOP_LEFT;
    const myToast = createToast({
      position: POSITION,
    });
    await act(() => myToast(TOAST_TEXT));

    const toastElement = screen.getByText(TOAST_TEXT);
    expect(toastElement.parentElement).toHaveClass(POSITION);

    const TOAST_TEXT_2 = 'message for position 2';
    const POSITION_2 = ToastPosition.BOTTOM_RIGHT;
    await act(() => myToast(TOAST_TEXT_2, { position: POSITION_2 }));

    const overridenPositionToastElement = screen.getByText(TOAST_TEXT_2);
    expect(overridenPositionToastElement.parentElement).toHaveClass(POSITION_2);
  });

  it('allows creating custom toast instances with specified clickClosable and overriding clickClosable', async () => {
    const TOAST_TEXT = 'message for clickClosable';
    const myToast = createToast({
      clickClosable: true,
    });
    const onCloseStart = jest.fn();
    await act(() => myToast(TOAST_TEXT, { onCloseStart }));

    const toastElement = screen.getByText(TOAST_TEXT);
    await act(() => toastElement.click());
    expect(onCloseStart).toHaveBeenCalled();

    const TOAST_TEXT_2 = 'message for clickClosable 2';
    const onCloseStart2 = jest.fn();
    await act(() =>
      myToast(TOAST_TEXT_2, {
        clickClosable: false,
        onCloseStart: onCloseStart2,
      }),
    );

    const overridenClickClosableToastElement = screen.getByText(TOAST_TEXT_2);
    overridenClickClosableToastElement.click();
    expect(onCloseStart2).not.toHaveBeenCalled();
  });

  it('...', async () => {
    const OFFSET = 50;
    const myToast = createToast({
      offsetX: OFFSET,
      offsetY: OFFSET,
    });

    const positions = Object.values(ToastPosition);
    for (const position of positions) {
      const TOAST_TEXT = `message for position ${position}`;
      await act(() => myToast(TOAST_TEXT, { position }));
      const toastElement = screen.getByText(TOAST_TEXT);
      const hasTop = position.includes('top');
      const hasBottom = position.includes('bottom');
      const hasLeft = position.includes('left');
      const hasRight = position.includes('right');

      if (position === ToastPosition.CENTER) {
        expect(toastElement.parentElement).not.toHaveStyle({
          top: expect.anything(),
          bottom: expect.anything(),
        });
      } else {
        expect(toastElement.parentElement).toHaveStyle({
          ...(hasTop && { top: `${OFFSET}px` }),
          ...(hasBottom && { bottom: `${OFFSET}px` }),
          ...(hasLeft && { left: `${OFFSET}px` }),
          ...(hasRight && { right: `${OFFSET}px` }),
        });
      }
    }
  });
});
