import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "../../core/components/sidebar/sidebar.component";
import { HeaderStatsComponent } from "../../core/components/header-stats/header-stats.component";
import { NavbarComponent } from "../../core/components/navbar/navbar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderStatsComponent, NavbarComponent]
})
export class BaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
