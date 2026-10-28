import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFloatingDropdown } from './useFloatingDropdown';

describe('useFloatingDropdown', () => {
  it('should initialize with closed state and empty styles', () => {
    const { result } = renderHook(() => useFloatingDropdown());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.dropdownStyle).toEqual({});
  });

  it('should toggle open and calculate positioning styles based on buttonRef', () => {
    const { result } = renderHook(() => useFloatingDropdown(70));

    // Mock button element with getBoundingClientRect
    const button = document.createElement('button');
    button.getBoundingClientRect = () => ({
      top: 100,
      bottom: 140,
      left: 200,
      right: 250,
      width: 50,
      height: 40,
      x: 200,
      y: 100,
      toJSON: () => {},
    });
    document.body.appendChild(button);

    // Attach button to buttonRef
    (result.current.buttonRef as { current: HTMLButtonElement | null }).current = button;

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.dropdownStyle.position).toBe('fixed');
    expect(result.current.dropdownStyle.top).toBe('144px'); // bottom (140) + 4
    expect(result.current.dropdownStyle.zIndex).toBe(9999);

    document.body.removeChild(button);
  });

  it('should close when toggleDropdown is called again', () => {
    const { result } = renderHook(() => useFloatingDropdown());

    const button = document.createElement('button');
    document.body.appendChild(button);
    (result.current.buttonRef as { current: HTMLButtonElement | null }).current = button;

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isOpen).toBe(false);

    document.body.removeChild(button);
  });

  it('should close when a mousedown event occurs outside dropdown and button', () => {
    const { result } = renderHook(() => useFloatingDropdown());

    const button = document.createElement('button');
    const dropdown = document.createElement('div');
    const outsideElement = document.createElement('div');
    document.body.appendChild(button);
    document.body.appendChild(dropdown);
    document.body.appendChild(outsideElement);

    (result.current.buttonRef as { current: HTMLButtonElement | null }).current = button;
    (result.current.dropdownRef as { current: HTMLDivElement | null }).current = dropdown;

    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);

    // Click outside
    act(() => {
      const event = new MouseEvent('mousedown', { bubbles: true });
      outsideElement.dispatchEvent(event);
    });

    expect(result.current.isOpen).toBe(false);

    document.body.removeChild(button);
    document.body.removeChild(dropdown);
    document.body.removeChild(outsideElement);
  });

  it('should close on window scroll and window resize', () => {
    const { result } = renderHook(() => useFloatingDropdown());

    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);

    // Trigger scroll
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.isOpen).toBe(false);

    // Reopen and trigger resize
    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isOpen).toBe(false);
  });
});

