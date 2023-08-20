import { Component, inject, OnInit } from "@angular/core";
import {
	Firestore,
	collectionData,
	collection,
	doc,
	setDoc,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
@Component({
	selector: "app-go",
	templateUrl: "./go.component.html",
	styleUrls: ["./go.component.css"],
})
export class GoComponent implements OnInit {
	name: string;
	constructor(private firestore: Firestore, private router: Router) {}

	ngOnInit() {}

	async onSubmit() {
		const userRef = doc(this.firestore, "users", this.name);
		await setDoc(
			userRef,
			{ name: this.name, counter: 0 },
			{ merge: true }
		).then(() => {
			this.router.navigate(["/users"]);
		});
	}
}
