import { render, screen, fireEvent } from '@testing-library/react';
import PaginationBar from '../components/PaginationBar';

describe('PaginationBar', () => {
  const onPageChange = jest.fn();

  const renderPagination = (currentPage: number, totalPages: number) => {
    render(
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />,
    );
  };

  beforeEach(() => {
    onPageChange.mockClear();
  });

  test('renders navigation buttons and page numbers', () => {
    renderPagination(1, 5);

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('disables the previous button on the first page', () => {
    renderPagination(1, 5);

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });

  test('disables the next button on the last page', () => {
    renderPagination(5, 5);

    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
  });

  test('calls onPageChange when a page button is clicked', () => {
    renderPagination(2, 5);

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with previous and next page buttons', () => {
    renderPagination(3, 5);

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('renders ellipsis for large page counts', () => {
    renderPagination(5, 10);

    // Check for the ellipsis markers
    expect(screen.getAllByText('…')).toHaveLength(2);
  });

  test('does not trigger onPageChange when ellipsis is clicked', () => {
    renderPagination(5, 10);

    // Clicking on ellipsis markers should not call onPageChange
    fireEvent.click(screen.getAllByText('…')[0]);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('shows the current page as active', () => {
    renderPagination(3, 5);

    // Verify the current page button is styled as active
    const activePage = screen.getByLabelText('Page 3');
    expect(activePage).toHaveClass('bg-blue-500');
  });

  test('renders PageButton with ellipsis "<" and ">"', () => {
    renderPagination(4, 10);

    // Check if PageButton renders "<" and ">" as spans with ellipsis
    expect(screen.getByText('…')).toBeInTheDocument();

    // Checking individual conditions to ensure both branches "<" and ">" are covered
    const allEllipses = screen.getAllByText('…');
    expect(allEllipses).toHaveLength(1);
    allEllipses.forEach((el) => {
      expect(el.tagName).toBe('SPAN');
    });
  });

  test('renders PageButton with ellipsis "<" and ">"', () => {
    renderPagination(8, 10);

    // Check if PageButton renders "<" and ">" as spans with ellipsis
    expect(screen.getByText('…')).toBeInTheDocument();

    // Checking individual conditions to ensure both branches "<" and ">" are covered
    const allEllipses = screen.getAllByText('…');
    expect(allEllipses).toHaveLength(1);
    allEllipses.forEach((el) => {
      expect(el.tagName).toBe('SPAN');
    });
  });

  test('handles large number of pages correctly', () => {
    renderPagination(10, 20);

    // Check for the ellipsis and correct page numbers
    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('10')).toHaveClass('bg-blue-500');
  });
});
