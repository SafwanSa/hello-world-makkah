import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { GoComponent } from "./go/go.component";

const routes: Routes = [
	{ path: "", component: GoComponent },
	{ path: "users", component: UsersComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
