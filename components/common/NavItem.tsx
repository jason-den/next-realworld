import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  className?: string;
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const NavLink = ({ className, href, onClick, children, style }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;
  const status = encodeURIComponent(asPath) === encodeURIComponent(href) ? 'active' : '';

  return (
    <Link href={href} as={href} passHref>
      <a style={style} onClick={onClick} className={`nav-link ${status} ${className}`}>
        {children}
      </a>
    </Link>
  );
};

type NavItemProps = { href: string; text: string; icon?: React.ReactNode };
export const NavItem: React.FC<NavItemProps> = ({ href, text, icon }) => {
  const router = useRouter();
  const { asPath } = router;
  const statusString = encodeURIComponent(asPath) === encodeURIComponent(href) ? 'active' : '';

  return (
    <li className="nav-item">
      <Link href={href} passHref>
        <a className={`nav-link ${statusString}`}>
          {icon}
          {icon && ' '} {/* if icon exist, provide " " (a space) before the text*/}
          {text}
        </a>
      </Link>
    </li>
  );
};
