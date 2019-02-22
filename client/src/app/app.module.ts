import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { CubeComponent } from "./cube/cube.component";
import { RenderService } from "./cube/render.service";
import { IndexService } from "./index.service";

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [IndexService, RenderService],
  bootstrap: [AppComponent],
})
export class AppModule { }
