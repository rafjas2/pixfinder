import { X, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  image: string;
  userImg: string | undefined | null;
  user: string;
  onClose: () => void;
}

export function Modal({ isOpen, image, userImg, user, onClose }: ModalProps) {
  const [imgError, setImgError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Close on Escape Key & Manage Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          // Shift + Tab: if on the first element, wrap to the last
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab: if on the last element, wrap to the first
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Scroll Locking and Focus Restorations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the close button for instant access
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const hasImage = userImg && !imgError;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-200"
    >
      <div className="border-border bg-surface shadow-card relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-xl border md:h-[75vh] md:max-h-none md:flex-row md:overflow-hidden">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="group text-text hover:text-text focus-visible:ring-brand absolute top-4 right-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/5 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Close modal"
        >
          <X className="size-6 transition-transform duration-200 group-hover:rotate-90" />
        </button>

        <div className="flex max-h-[50vh] w-full overflow-hidden bg-black/5 md:max-h-none md:w-3/5">
          <img
            className="h-full w-full object-contain"
            src={image}
            alt={`Image by ${user}`}
            decoding="async"
          />
        </div>

        <div className="bg-surface md:border-border flex w-full flex-col justify-between p-6 md:w-2/5 md:border-l">
          <div className="flex flex-1 flex-col items-center justify-center py-4">
            <div className="group relative">
              {hasImage ? (
                <img
                  key={userImg}
                  className="border-brand size-24 rounded-full border-4 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105 md:size-32"
                  src={userImg}
                  alt={user}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="border-brand bg-brand/10 text-brand flex size-24 items-center justify-center rounded-full border-4 shadow-lg md:size-32">
                  <User className="size-12 md:size-16" strokeWidth={1.5} />
                </div>
              )}
              <div
                className="bg-brand absolute -right-2 -bottom-2 flex size-10 items-center justify-center rounded-full text-white shadow-md"
                aria-hidden="true"
              >
                <User className="size-5" />
              </div>
            </div>

            <h4
              id="modal-title"
              className="text-text mt-6 text-center font-sans text-2xl leading-tight font-bold text-balance md:text-3xl"
            >
              {user}
            </h4>
            <p className="text-muted mt-1 text-sm font-medium tracking-widest uppercase">
              Artist
            </p>

            <div className="bg-border mt-8 h-px w-12" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
