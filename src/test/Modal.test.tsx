import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onSave: jest.fn(),
    title: 'Test Modal',
    children: <p>Modal Content</p>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('calls onClose when Close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Close'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('calls onSave and onClose when Save button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Save'));
    expect(defaultProps.onSave).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('does not render Save button if onSave is not provided', () => {
    render(<Modal {...defaultProps} onSave={undefined} />);
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });
});
