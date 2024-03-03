import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer } from '@/app/models/interfaces/api';
import { ToastComponent } from '@/app/shared/components/toast/toast.component';
import { ModalComponent } from '@/app/shared/components/modal/modal.component';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-customeres',
  standalone: true,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [ApiService],
  imports: [
    RouterLink,
    DatePipe,
    ReactiveFormsModule,
    ToastComponent,
    ModalComponent,
  ],
})
export class ClientesComponent implements OnInit {
  private readonly toastSvc = inject(ToastService);
  private readonly api = inject(ApiService);

  public customers!: ICustomer[];
  public selectedCustomers!: ICustomer[] | null;
  public customerDialog: boolean = false;
  public submitted: boolean = false;
  public newCustomer: boolean = true;
  public form = new FormGroup({
    cif: new FormControl(
      {
        value: '',
        disabled: !this.newCustomer,
      },
      [Validators.required]
    ),
    nombre: new FormControl(
      {
        value: '',
        disabled: false,
      },
      [Validators.required]
    ),
    direccion: new FormControl(
      {
        value: '',
        disabled: false,
      },
      [Validators.required]
    ),
    telefono: new FormControl(
      {
        value: 0,
        disabled: false,
      },
      [Validators.required]
    ),
    email: new FormControl(
      {
        value: '',
        disabled: false,
      },
      [Validators.required, Validators.email]
    ),
  });

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.getCustomers();
  }

  public openNew() {
    this.form.reset({
      cif: '',
      direccion: '',
      email: '',
      nombre: '',
      telefono: 0,
    });
    this.submitted = false;
    this.customerDialog = true;
    this.newCustomer = true;
  }
  /**
   * Abre el diálogo para editar un cliente.
   * @param customer - Cliente a editar.
   */
  public editCustomer(customer: ICustomer) {
    this.newCustomer = false;
    this.form.reset({ ...customer });
    this.customerDialog = true;
    this.submitted = false;
  }
  /**
   * Oculta el diálogo de cliente.
   */
  public hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
    this.newCustomer = false;
    this.form.reset({
      cif: '',
      direccion: '',
      email: '',
      nombre: '',
      telefono: 0,
    });
  }

  public saveCustomer(ev: Event) {
    ev.preventDefault();
    this.submitted = true;

    if (this.newCustomer) {
      this.create();
    } else {
      this.update(this.form.value.cif!);
    }

    this.hideDialog();
  }

  public confirmDelete(customer: ICustomer) {
    const confirmDelete = confirm(
      `¿Eliminar cliente ${customer.nombre}? Esta acción no se puede deshacer`
    );
    if (confirmDelete) {
      this.delete(customer.cif);
    } else {
      this.toastSvc.add({
        type: 'error',
        title: 'Rechazado',
        message: 'Se ha cancelado la operación',
        life: 3000,
      });
    }
    // this.confirmationService.confirm({
    //   message: `¿Eliminar cliente ${customer.nombre}?`,
    //   header: '¿Está seguro? Esta acción no se puede deshacer',
    //   icon: 'pi pi-exclamation-triangle',
    //   acceptLabel: 'Sí',
    //   rejectLabel: 'No',
    //   acceptButtonStyleClass: 'btn btn-danger mx-1 p-button-text',
    //   rejectButtonStyleClass: 'btn btn-primary mx-1 p-button-text',
    //   acceptIcon: 'none',
    //   rejectIcon: 'none',
    //   accept: () => this.delete(customer.cif),
    //   reject: () => {
    //     this.toastSvc.add({
    //       type: 'error',
    //       title: 'Rechazado',
    //       message: 'Se ha cancelado la operación',
    //       life: 3000,
    //     });
    //   },
    // });
  }

  private delete(cif: string) {
    this.api.delete(cif).subscribe({
      next: (res) => {
        console.log(res);
        this.toastSvc.add({
          type: 'info',
          title: 'Aceptado',
          message: 'Registro eliminado',
          life: 3000,
        });
        this.getCustomers();
      },
      error: (err) => {
        console.error(err);
        this.toastSvc.add({
          type: 'error',
          title: 'Error',
          message: 'Algo salió mal',
          life: 3000,
        });
      },
    });
  }

  private update(id: string) {
    const customer = this.customers.find((x) => x.cif === id);
    this.api
      .update({ ...this.form.value, fechaAlta: customer?.fechaAlta })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastSvc.add({
            type: 'success',
            title: 'Aceptado',
            message: 'Registro Actualizado',
            life: 3000,
          });
          this.getCustomers();
        },
        error: (err) => {
          console.error(err);
          this.toastSvc.add({
            type: 'error',
            title: 'Error',
            message: 'Algo salió mal',
            life: 3000,
          });
        },
      });
  }

  private create() {
    this.api
      .create({ ...this.form.value, fechaAlta: this.parseDate(new Date()) })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastSvc.add({
            type: 'success',
            title: 'Aceptado',
            message: 'Registro Creado',
            life: 3000,
          });
          this.getCustomers();
        },
        error: (err) => {
          console.error(err);
          this.toastSvc.add({
            type: 'error',
            title: 'Error',
            message: 'Algo salió mal',
            life: 3000,
          });
        },
      });
  }

  private getCustomers() {
    this.api
      .read<Pick<ICustomer, 'cif'>, ICustomer[]>()
      .subscribe((res) => (this.customers = res));
  }

  private parseDate(date: Date) {
    return new DatePipe('es-ES').transform(date, 'yyyy-MM-dd');
  }
}
