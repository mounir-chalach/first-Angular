// app.module.server.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';  // Import AppModule (client-side module)
import { AppComponent } from './app.component';
import {AppModule} from "./app.module";

@NgModule({
  imports: [
    AppModule,  // Import AppModule (client-side)
    ServerModule
  ],
  bootstrap: [AppComponent]  // Bootstrap the app component
})
export class AppServerModule {}
