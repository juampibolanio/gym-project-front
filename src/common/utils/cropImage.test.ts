import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createImage, getCroppedImg, PixelCrop } from './cropImage';

describe('cropImage utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('createImage', () => {
    it('should resolve with an HTMLImageElement on successful load', async () => {
      const mockSrc = 'https://example.com/avatar.jpg';

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        crossOrigin = '';
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};

        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }

        setAttribute(key: string, val: string) {
          if (key === 'crossOrigin') this.crossOrigin = val;
        }

        constructor() {
          setTimeout(() => {
            this.listeners['load']?.forEach((cb) => cb());
          }, 0);
        }
      } as unknown as typeof Image;

      const img = await createImage(mockSrc);
      expect(img).toBeDefined();
      expect(img.crossOrigin).toBe('anonymous');

      global.Image = originalImage;
    });

    it('should reject with an error when image fails to load', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};

        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }

        setAttribute() {}

        constructor() {
          setTimeout(() => {
            this.listeners['error']?.forEach((cb) => cb(new Error('Load error')));
          }, 0);
        }
      } as unknown as typeof Image;

      await expect(createImage('invalid-src')).rejects.toThrow('Failed to load image for cropping');

      global.Image = originalImage;
    });
  });

  describe('getCroppedImg', () => {
    const mockCrop: PixelCrop = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
    };

    it('should return null when image loading fails', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};
        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }
        setAttribute() {}
        constructor() {
          setTimeout(() => {
            this.listeners['error']?.forEach((cb) => cb(new Error('Load error')));
          }, 0);
        }
      } as unknown as typeof Image;

      const result = await getCroppedImg('invalid-url', mockCrop);
      expect(result).toBeNull();

      global.Image = originalImage;
    });

    it('should return null when canvas 2d context cannot be created', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};
        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }
        setAttribute() {}
        constructor() {
          setTimeout(() => {
            this.listeners['load']?.forEach((cb) => cb());
          }, 0);
        }
      } as unknown as typeof Image;

      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        if (tagName === 'canvas') {
          return {
            getContext: () => null,
          } as unknown as HTMLCanvasElement;
        }
        return document.createElement(tagName);
      });

      const result = await getCroppedImg('valid-url', mockCrop);
      expect(result).toBeNull();

      global.Image = originalImage;
    });

    it('should crop image, pass quality 0.85 and return a File on success', async () => {
      const mockBlob = new Blob(['mock-binary'], { type: 'image/jpeg' });
      let capturedQuality: number | undefined;

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};
        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }
        setAttribute() {}
        constructor() {
          setTimeout(() => {
            this.listeners['load']?.forEach((cb) => cb());
          }, 0);
        }
      } as unknown as typeof Image;

      const mockDrawImage = vi.fn();
      const mockToBlob = vi.fn((cb: (blob: Blob | null) => void, _type?: string, quality?: number) => {
        capturedQuality = quality;
        cb(mockBlob);
      });

      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        if (tagName === 'canvas') {
          return {
            width: 0,
            height: 0,
            getContext: () => ({
              drawImage: mockDrawImage,
            }),
            toBlob: mockToBlob,
          } as unknown as HTMLCanvasElement;
        }
        return document.createElement(tagName);
      });

      const file = await getCroppedImg('valid-url', mockCrop, 'avatar.jpeg', 0.85);

      expect(file).toBeInstanceOf(File);
      expect(file?.name).toBe('avatar.jpeg');
      expect(file?.type).toBe('image/jpeg');
      expect(capturedQuality).toBe(0.85);
      expect(mockDrawImage).toHaveBeenCalledWith(
        expect.anything(),
        mockCrop.x,
        mockCrop.y,
        mockCrop.width,
        mockCrop.height,
        0,
        0,
        mockCrop.width,
        mockCrop.height
      );

      global.Image = originalImage;
    });

    it('should return null if canvas.toBlob returns null blob', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const originalImage = global.Image;
      global.Image = class {
        src = '';
        private listeners: Record<string, ((e?: unknown) => void)[]> = {};
        addEventListener(event: string, handler: (e?: unknown) => void) {
          if (!this.listeners[event]) this.listeners[event] = [];
          this.listeners[event].push(handler);
        }
        setAttribute() {}
        constructor() {
          setTimeout(() => {
            this.listeners['load']?.forEach((cb) => cb());
          }, 0);
        }
      } as unknown as typeof Image;

      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        if (tagName === 'canvas') {
          return {
            width: 0,
            height: 0,
            getContext: () => ({
              drawImage: vi.fn(),
            }),
            toBlob: (cb: (blob: Blob | null) => void) => cb(null),
          } as unknown as HTMLCanvasElement;
        }
        return document.createElement(tagName);
      });

      const result = await getCroppedImg('valid-url', mockCrop);
      expect(result).toBeNull();

      global.Image = originalImage;
    });
  });
});
