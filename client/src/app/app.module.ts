import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
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
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [IndexService, RenderService],
  bootstrap: [AppComponent],
})
export class AppModule { }
