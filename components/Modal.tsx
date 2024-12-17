import React, { useRef, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    if (isOpen && !dialog.open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      dialog.addEventListener('click', handleBackdropClick);
      window.addEventListener('keydown', handleKeyDown);
    } else if (!isOpen && dialog.open) {
      setIsAnimating(true);
      dialog.close();
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }

    return () => {
      dialog.removeEventListener('click', handleBackdropClick);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleAnimationEnd = () => {
      setIsAnimating(false);
    };

    dialog.addEventListener('animationend', handleAnimationEnd);

    return () => {
      dialog.removeEventListener('animationend', handleAnimationEnd);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className={`c-modal ${isOpen ? 'is-open' : ''} ${isAnimating ? 'is-animating' : ''}`}
      aria-labelledby="modal-title"
    >
      <div className="c-modal__content">
        <h2 id="modal-title" className="c-modal__title">{title}</h2>
        {children}
        <button className="c-modal__close" onClick={onClose} aria-label="Close modal">
          <span>close</span><i>×</i>
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
