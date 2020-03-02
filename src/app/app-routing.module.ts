import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AntragComponent } from "./antrag/antrag.component";
import { KuendigungComponent } from "./kuendigung/kuendigung.component";

const routes: Routes = [
  {
    path: "",
    component: AntragComponent
  },
  {
    path: "antrag",
    component: AntragComponent
  },
  {
    path: "kuendigung",
    component: KuendigungComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  exports: [RouterModule]
})
export class AppRoutingModule {}
