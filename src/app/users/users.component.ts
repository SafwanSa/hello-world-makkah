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
	users: IUser[];
	name: string;
	counter = 0;
	title: string;
	subscriptions = [];

	constructor(private firestore: Firestore, private router: Router) {
		this.setName();
		this.getTitle();
		this.getNames();
		// const usersCollection = collection(this.firestore, "users");
		// this.users$ = collectionData(usersCollection, {
		// 	idField: "name",
		// }) as Observable<IUser[]>;
	}
	ngOnInit() {}

	getNames() {
		this.subscriptions.push(
			onSnapshot(
				collection(this.firestore, "users"),
				(snapshot) => {
					this.users = [];
					snapshot.forEach((doc) => {
						this.users.push(doc.data() as IUser);
					});
					this.users = this.users.sort((a, b) =>
						a.counter > b.counter ? -1 : 1
					);
				},
				(error) => {
					// ...
				}
			)
		);
	}

	setName() {
		// const state = this.router.getCurrentNavigation().extras.state as {
		// 	name: string;
		// };
		// if (state.name != null) this.name = state.name;
		this.name = localStorage.getItem("name");
	}

	async getTitle() {
		this.subscriptions.push(
			onSnapshot(
				collection(this.firestore, "meta"),
				(snapshot) => {
					snapshot.forEach((doc) => {
						this.title = doc.data().title;
					});
				},
				(error) => {
					// ...
				}
			)
		);
	}

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
