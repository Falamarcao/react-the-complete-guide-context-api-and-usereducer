import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

interface CartModalProps {
  title: string;
  actions: ReactNode;
}

export interface ModalRef {
  open: () => void;
}

const CartModal = forwardRef<ModalRef, CartModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog?.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')! as HTMLDialogElement
  );
});

export default CartModal;
