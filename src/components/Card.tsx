import { ReactNode, useRef, useEffect } from 'react';

interface CardProps {
  children: ReactNode;
  dataTestId?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  dataTestId,
  className,
  onClick,
  ariaLabel = 'card',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.key === 'Enter' || event.key === ' ') && onClick) {
        event.preventDefault();
        onClick();
      }
    };

    if (cardElement && onClick) {
      cardElement.tabIndex = 0;
      cardElement.setAttribute('role', 'button');
      cardElement.addEventListener('click', onClick);
      cardElement.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      if (cardElement && onClick) {
        cardElement.removeEventListener('click', onClick);
        cardElement.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [onClick]);

  return (
    <div
      ref={cardRef}
      className={className}
      data-testid={dataTestId}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export default Card;
