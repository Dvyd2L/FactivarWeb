export interface ITraductor {
  home: Home;
  footer: Footer;
  navbar: Navbar;
  auth: Auth;
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

export interface Auth {
  "boton-inicio": string,
  sections: AuthSections;
}

export interface AuthSections {
  login:             LoginSection;
  registro:          ChangePassword;
  "change-password": ChangePassword;
  "forgot-password": ChangePassword;
}

export interface ChangePassword {
  titulo: string;
}

export interface LoginSection {
  titulo:            string;
  boton:             string;
  "olvido-password": string;
  register:          Register;
  "social-login":    string;
  form:              LoginForm;
}

export interface LoginForm {
  email:    LoginInput;
  password: LoginInput;
}

export interface LoginInput {
  label:       string;
  placeholder: string;
}

export interface Register {
  title: string;
  link:  string;
}