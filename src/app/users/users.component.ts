import { Component, inject, OnInit } from "@angular/core";
import {
	Firestore,
	collectionData,
	collection,
	doc,
	onSnapshot,
	updateDoc,
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
	users$: Observable<IUser[]>;

	constructor(private firestore: Firestore) {
		const usersCollection = collection(this.firestore, "users");
		this.users$ = collectionData(usersCollection, {
			idField: "name",
		}) as Observable<IUser[]>;
	}

	ngOnInit() {}

	onClickCounter() {}

	ngOnDestroy(): void {}
}
