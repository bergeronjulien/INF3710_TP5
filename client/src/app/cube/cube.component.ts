import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import {RenderService} from "./render.service";

@Component({
  selector: "app-cube-component",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.css"],
})

export class CubeComponent implements AfterViewInit {

  public constructor(private renderService: RenderService) {
  }

  private get container(): HTMLDivElement {
    return this.containerRef.nativeElement;
  }

  @ViewChild("container")
  private containerRef: ElementRef;

  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @HostListener("window:resize", ["$event"])
  public onResize(): void {
    this.renderService.onResize();
  }

  public ngAfterViewInit(): void {
    this.renderService.initialize(this.container, this.rotationSpeedX, this.rotationSpeedY);
  }
}
