import { Component, OnInit } from "@angular/core";
import { CardSettingsComponent } from "../../core/components/cards/card-settings/card-settings.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  standalone: true,
  imports: [CardSettingsComponent]
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
