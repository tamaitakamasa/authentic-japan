import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  color?: 'default' | 'light';
  className?: string;
  target?: '_blank' | '_self';  // targetプロパティを追加
}

export const Button: React.FC<ButtonProps> = ({
  href,
  label,
  color = 'default',
  className = '',
  target  // targetプロパティを受け取る
}) => {
  const buttonClass = `c-button ${color === 'light' ? 'c-button--light' : ''} ${className}`.trim();

  const linkProps = target === '_blank' ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <div className={buttonClass}>
      <span className="c-button__label">
        <Link href={href} className="c-button__link" {...linkProps}>
          {label}
        </Link>
      </span>
      <div className="c-button__circle">
        <i className="c-button__icon"></i>
      </div>
    </div>
  );
};
