import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
  standalone: true,
  imports: [CommonModule]
})
export class CardSettingsComponent implements OnInit {
  public showToken: boolean;

  constructor() {
    this.showToken = false;
  }

  ngOnInit(): void {}
}
