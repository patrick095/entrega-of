import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
