import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  color?: 'default' | 'light';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ href, label, color = 'default', className = '' }) => {
  const buttonClass = `c-button ${color === 'light' ? 'c-button--light' : ''} ${className}`.trim();

  return (
    <div className={buttonClass}>
      <span className="c-button__label">
        <Link href={href} className="c-button__link">
          {label}
        </Link>
      </span>
      <div className="c-button__circle">
        <i className="c-button__icon"></i>
      </div>
    </div>
  );
};
