import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize";
import { AuthService } from "app/login/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  modalActions;
  sideNavActions;
  mostrarMenu: boolean = false;
  constructor(private authService: AuthService) {
    this.modalActions = new EventEmitter<string | MaterializeAction>();
    this.sideNavActions = new EventEmitter<string | MaterializeAction>();
  }

  ngOnInit() {
    this.authService.mostrarMenuEmmiter.subscribe(
      mostrar => {
        this.mostrarMenu = mostrar
      })
  }

  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  closeSideNav() {
    this.sideNavActions.emit({ action: "sideNav", params: ['show'] });
  }

}
