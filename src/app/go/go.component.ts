import { Component, OnInit } from "@angular/core";
import { Firestore, doc, setDoc } from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Component({
	selector: "app-go",
	templateUrl: "./go.component.html",
	styleUrls: ["./go.component.css"],
})
export class GoComponent implements OnInit {
	name: string;
	constructor(private firestore: Firestore, private router: Router) {}

	ngOnInit() {}

	getRandom() {
		const chars =
			"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const length = 5;
		var result = "";
		for (var i = length; i > 0; --i)
			result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}

	async onSubmit() {
		const userRef = doc(this.firestore, "users", this.name);
		await setDoc(
			userRef,
			{ name: this.name, counter: 0 },
			{ merge: true }
		).then(() => {
			this.router.navigate(["/users"], { state: { name: this.name } });
			localStorage.setItem("name", this.name);
		});
	}
}
