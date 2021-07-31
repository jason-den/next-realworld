import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  href: string;
  as: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Anchor = styled.a`
  display: block;
  padding-top: 0.425rem;
  padding-bottom: 0.425rem;
  color: rgba(0, 0, 0, 0.3);
  text-decoration: none !important;

  &:hover {
    color: rgba(0, 0, 0, 0.8) !important;
  }

  &.active {
    color: rgba(0, 0, 0, 0.8);
  }
`;

// why: need both `herf` and `as`?
export const NavLink = ({ href, as, onClick, children }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;
  return (
    <Link href={href} as={as} passHref>
      <Anchor onClick={onClick} className={`${encodeURIComponent(asPath) === encodeURIComponent(as) && `active`}`}>
        {children}
      </Anchor>
    </Link>
  );
};
