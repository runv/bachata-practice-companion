import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFloating, autoUpdate, offset } from '@floating-ui/react';
import { useClick, useDismiss, useRole, useInteractions } from '@floating-ui/react';
import { DialogReferenceContext } from './DialogReferenceContext';
import * as style from './themes/Dialog.css';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  title?: string;
};

export function Dialog({ open, onClose, children, ariaLabel, title }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { strategy, context, refs } = useFloating({
    open,
    onOpenChange: (v) => !v && onClose(),
    placement: 'bottom',
    middleware: [offset(0)],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: false });
  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context, { role: 'dialog' });
  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <DialogReferenceContext.Provider value={{ setReference: refs.setReference }}>
      <div
        className={style.overlayStyle}
        ref={overlayRef}
        onClick={e => {
          if (e.target === overlayRef.current) onClose();
        }}
        aria-modal="true"
        role="dialog"
        aria-label={ariaLabel}
      >
        <div
          ref={refs.setFloating}
          className={style.dialogStyle}
          style={{
            position: strategy,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          {...getFloatingProps()}
          onClick={e => e.stopPropagation()}
        >
          {/* Mobile header with close button */}
          <div className={style.mobileHeader}>
            <span>{title || 'Dialog'}</span>
            <button className={style.closeButton} onClick={onClose} aria-label="Close dialog">
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </DialogReferenceContext.Provider>,
    document.body
  );
}