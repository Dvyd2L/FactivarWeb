import { ToastComponent } from '@/app/shared/components/toast/toast.component';
import { ViewContainerRef, ComponentRef } from '@angular/core';

export const toastHelper = (container: ViewContainerRef) => {
  const viewContainerRef = container;
  return ({
    title = 'Información',
    message = 'Esto es un mensaje informativo.',
    type = 'info',
    life = 3000,
  }: {
    title: string;
    message: string;
    type: string;
    life: number;
  }) => {
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
  };
};
