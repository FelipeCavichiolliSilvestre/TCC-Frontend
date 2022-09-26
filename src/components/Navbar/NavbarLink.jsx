import Link from '@mui/material/Link';

function NavbarLink(linkProps) {
  return <Link underline="hover" variant="h6" mx={2} {...linkProps} />;
}

export default NavbarLink;
