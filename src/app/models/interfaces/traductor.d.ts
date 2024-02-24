export interface ITraductor {
  home: Home;
  footer: Footer;
  navbar: Navbar;
}

export interface Footer {
  sections: FooterSection;
}

export interface FooterSection {
  direccion: { titulo: string; contenido: string };
  telefono: { titulo: string };
  social: { titulo: string };
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
  sections: NavbarSection;
}

export interface NavbarSection {
  inicio: { titulo: string };
  clientes: { titulo: string };
  facturas: { titulo: string };
  usuarios: { titulo: string };
  conectarse: { titulo: string };
}
