import { ReactNode, useRef, useEffect } from 'react';

interface CardProps {
  children: ReactNode;
  dataTestId?: string;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  dataTestId,
  className,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement && onClick) {
      cardElement.tabIndex = 0;
      cardElement.addEventListener('click', onClick);
    }

    return () => {
      if (cardElement && onClick) {
        cardElement.removeEventListener('click', onClick);
      }
    };
  }, [onClick]);

  return (
    <div ref={cardRef} className={className} data-testid={dataTestId}>
      {children}
    </div>
  );
};

export default Card;
