export type HeaderMenuItem = {
  id: string;
  title: string;
  href: string;
  children: HeaderMenuItem[];
};

export type HeaderLogo = {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type HeaderProps = {
  menu: HeaderMenuItem[];
  logo?: HeaderLogo;
  homeHref: string;
  accountHref: string;
  cartHref: string;
  cartQuantity: number;
  className?: string;
};
