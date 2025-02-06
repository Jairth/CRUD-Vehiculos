import { AsyncPipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	signal,
	viewChild,
	viewChildren,
} from "@angular/core";
import { forkJoin, tap } from "rxjs";
import type { Rents } from "../../models";
import { RentsService } from "../../services/rents.service";
import { AddRentComponent } from "../add-rent/add-rent.component";
import { DialogsComponent } from "../dialogs/dialogs.component";
import { EditRentComponent } from "../edit-rent/edit-rent.component";

@Component({
	selector: "app-list-rent",
	standalone: true,
	imports: [DialogsComponent, AsyncPipe, AddRentComponent, EditRentComponent],
	templateUrl: "./list-rent.component.html",
	styleUrl: "./list-rent.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListRentComponent {
	mainCheckbox = viewChild<ElementRef<HTMLInputElement>>("mainCheckbox");
	childrenCheckbox =
		viewChildren<ElementRef<HTMLInputElement>>("childrenCheckbox");
	isVisible = signal(false);
	listProductsSelect = signal<any>([]);
	loading = signal(false);

	//Injects
	productService = inject(RentsService);

	//****//

	products$ = this.productService
		.getAllRents()
		.pipe(tap(() => this.loading.set(true)));

	ngOnInit() {
		this.productService.getAllRents().subscribe((resp) => console.log(resp));
	}

	onCheckboxAll() {
		const mainChecked = this.mainCheckbox()?.nativeElement.checked;
		if (!mainChecked) {
			this.childrenCheckbox().forEach((checkbox, index) => {
				checkbox.nativeElement.checked = false;
			});
			this.listProductsSelect.set([]);
			this.isVisible.set(false);
			return;
		}
		const list = this.childrenCheckbox().map((checkbox) => {
			checkbox.nativeElement.checked = true;
			return checkbox.nativeElement.value;
		});

		const uniqueList = [...new Set(list)];
		this.listProductsSelect.set(uniqueList);
		this.isVisible.set(true);
	}

	onCheckbox(product: Rents) {
		console.log(product);
		const productIndex = this.listProductsSelect().indexOf(product.id);

		if (productIndex !== -1) {
			this.listProductsSelect().splice(productIndex, 1);
		} else {
			this.listProductsSelect().push(product.id);
		}

		console.log(this.listProductsSelect());

		const isChecked = this.childrenCheckbox().some(
			(checkbox) => checkbox.nativeElement.checked === true,
		);

		this.isVisible.set(isChecked);
	}

	onDeleteRents() {
		this.loading.set(false);
		const selectProducts = this.listProductsSelect();

		const deleteObservables = selectProducts.map((productId: any) =>
			this.productService.deleteRent(productId),
		);

		forkJoin(deleteObservables).subscribe({
			next: (results) => {
				console.log("Productos eliminados:", results);

				this.listProductsSelect.set([]);
				this.isVisible.set(false);
				this.refresh();
			},
			error: (error) => {
				console.error("Error al eliminar productos:", error);
			},
			complete: () => {
				this.loading.set(true);
			},
		});
	}

	refresh() {
		this.products$ = this.productService.getAllRents();
	}
}
