export interface ITraductor {
  home: Home;
  footer: Footer;
  navbar: Navbar;
}

export interface Footer {
  sections: FooterSection[];
}

export interface FooterSection {
  direccion?: string;
  telefono?: string;
  linkedin?: string;
}

export interface Home {
  eslogan: string;
  sections: HomeSection[];
}

export interface HomeSection {
  titulo: string;
  contenido: string;
}

export interface Navbar {
  sections: NavbarSection[];
}

export interface NavbarSection {
  inicio?: string;
  clientes?: string;
  facturas?: string;
  usuarios?: string;
  conectarse?: string;
}
