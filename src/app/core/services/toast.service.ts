import { IToast } from '@/app/models/interfaces/toast';
import { ToastComponent } from '@/app/shared/components/toast/toast.component';
import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastAdded = new Subject<IToast>();

  public add({
    title = 'Información',
    message = 'Esto es un mensaje informativo.',
    type = 'info',
    life = 3000,
  }: IToast) {
    this.toastAdded.next({
      title,
      message,
      type,
      life,
    });
  }

  public show(viewContainerRef: ViewContainerRef) {
    this.toastAdded.subscribe(({ title, message, type, life }) => {
      // Crear una instancia del componente
      const toastRef: ComponentRef<ToastComponent> =
        viewContainerRef.createComponent(ToastComponent);

      // Asignar valores a las propiedades de la instancia del componente
      toastRef.instance.show = true;
      toastRef.instance.props = {
        title,
        message,
        type,
        life,
      };

      // Eliminar el componente del DOM y del árbol de componentes después de un tiempo determinado
      setTimeout(() => {
        toastRef.destroy();
      }, life);
    });
  }
}
