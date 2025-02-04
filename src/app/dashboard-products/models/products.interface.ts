import { FormControl } from "@angular/forms";

export interface Product {
	id: string;
	name: string;
	price: string;
	category: string;
	description?: string | null;
	image?: string | null;
}

export interface productForm {
	id?: FormControl<string | null>;
	name: FormControl<string | null>;
	price: FormControl<string | null>;
	category: FormControl<string | null>;
	description: FormControl<string | null>;
	image: FormControl<string | null>;
}

export interface Vehiculo {
	id: number;
	administrador_dni: number;
	categoria: string;
	imagen: string;
	color: string;
	estado_id: number;
	kilometraje: number;
	marca: string;
	modelo: string;
	numero_asientos: number;
	placa: string;
	soat: string;
	transmision: string;
	price: string;
	ocupantes: string;
}

export interface vehiculoForm {
	id?: FormControl<number | null>;
	administrador_dni?: FormControl<number | null>;
	categoria: FormControl<string | null>;
	imagen?: FormControl<string | null>;
	color: FormControl<string | null>;
	estado_id?: FormControl<number | null>;
	kilometraje?: FormControl<number | null>;
	marca: FormControl<string | null>;
	modelo: FormControl<string | null>;
	numero_asientos: FormControl<number | null>;
	placa: FormControl<string | null>;
	soat: FormControl<string | null>;
	transmision: FormControl<string | null>;
}

export interface Staff {
	id: number;
	celular: number;
	tipo_documento: string;
	documento: number;
	email: string;
	licencia: number;
	nacimiento: string;
	nombre: string;
	preferencia_comunicacion: string;
	administrador_dni?: string;
}

export interface StaffForm {
	id?: FormControl<number | null>;
	celular: FormControl<number | null>;
	tipo_documento: FormControl<string | null>;
	documento: FormControl<number | null>;
	email: FormControl<string | null>;
	licencia: FormControl<number | null>;
	nacimiento: FormControl<string | null>;
	nombre: FormControl<string | null>;
	preferencia_comunicacion: FormControl<string | null>;
	administrador_dni?: FormControl<string | null>;
}

export interface Clients {
	id: number;
	dni: number;
	domicilio: string;
	email: string;
	licencia: number;
	celular: number;
	nombre: string;
	rol: string;
}
export interface ClientsForm {
	id?: FormControl<number | null>;
	dni: FormControl<number | null>;
	domicilio: FormControl<string | null>;
	email: FormControl<string | null>;
	licencia: FormControl<number | null>;
	nombre: FormControl<string | null>;
	celular: FormControl<number | null>;
	rol: FormControl<string | null>;
}
