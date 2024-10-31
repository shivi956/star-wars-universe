import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      data-testid="modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="float-right">
          {onSave && (
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-4 rounded hover:bg-blue-600"
              onClick={() => {
                onSave();
                onClose();
              }}
            >
              Save
            </button>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
