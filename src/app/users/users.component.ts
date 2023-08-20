import { Component, inject, OnInit } from "@angular/core";
import {
	Firestore,
	collectionData,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	setDoc,
} from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "../models";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
	users$: Observable<IUser[]>;
	name: string;
	counter = 0;

	constructor(private firestore: Firestore, private router: Router) {
		this.setName();
		const usersCollection = collection(this.firestore, "users");
		this.users$ = collectionData(usersCollection, {
			idField: "name",
		}) as Observable<IUser[]>;
	}

	setName() {
		const state = this.router.getCurrentNavigation().extras.state as {
			name: string;
		};
		if (state.name != null) this.name = state.name;
	}
	ngOnInit() {}

	async onCounterClicked() {
		const userRef = doc(this.firestore, "users", this.name);
		await setDoc(
			userRef,
			{ name: this.name, counter: this.counter },
			{ merge: true }
		).then(() => {
			this.counter += 1;
		});
	}

	ngOnDestroy(): void {}
}
