export interface ICustomer {
  cif: string;
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  fechaAlta: Date;
  eliminado?: boolean;
  facturaClientes?: IInvoice[];
  facturaProveedors?: IInvoice[];
}

export interface IInvoice {
  facturaId?: number;
  numeroFactura: number;
  calculosIvas?: CalculosIva[];
  desgloseIva?: DesgloseIva;
  pendientePago: boolean;
  descripcionOperacion: string;
  fechaExpedicion: Date;
  fechaCobro: Date;
  clienteId?: string;
  cliente: ICustomer | null;
  proveedorId?: string;
  proveedor: ICustomer | null;
  articulos: IProduct[] | string;
  importe?: number;
  iva?: number;
  total?: number;
}

export interface IProduct {
  descripcion: string;
  unidades: number;
  pUnitario: number;
  iva: number;
  bImponible: number;
  cuotaIva: number;
  importe: number;
}

export interface CalculosIva {
  bImponible: number;
  cuota: number;
  total: number;
}

export interface DesgloseIva {
  cero: CalculosIva;
  superreducido: CalculosIva;
  especial: CalculosIva;
  reducido: CalculosIva;
  general: CalculosIva;
}
