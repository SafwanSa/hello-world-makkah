import { Component, inject, OnInit } from "@angular/core";
import {
	Firestore,
	collectionData,
	collection,
	doc,
	setDoc,
	onSnapshot,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "../models";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
	users: IUser[] = [];

	constructor(private firestore: Firestore) {}

	ngOnInit() {
		const usersCollection = collection(this.firestore, "users");
		const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
			this.users = [];
			querySnapshot.forEach((doc) => {
				this.users.push(doc.data() as IUser);
			});
		});
	}

	ngOnDestroy(): void {}
}
