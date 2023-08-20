import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { UsersComponent } from './users/users.component';
import { GoComponent } from './go/go.component';

@NgModule({
	declarations: [		AppComponent,
      UsersComponent,
      GoComponent
   ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		NoopAnimationsModule,
		MatFormFieldModule,
		MatButtonModule,
		FormsModule,
		NgbModule,
		MatInputModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
