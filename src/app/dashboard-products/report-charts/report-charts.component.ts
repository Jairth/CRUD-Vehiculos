import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
	Chart,
	registerables,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarController,
	BarElement,
} from "chart.js";
import { ReportsService } from "../services/reports.service";

Chart.register(
	...registerables,
	LineController,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarController,
	BarElement,
);

@Component({
	selector: "app-report-charts",
	standalone: true,
	imports: [],
	templateUrl: "./report-charts.component.html",
	styleUrl: "./report-charts.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportChartsComponent {
	reportsService = inject(ReportsService);

	title = "ng-chart";
	chart: any = [];
	listReports: any = [];
	listReturn: any = [];
	listRents: any = [];

	ngOnInit() {
		this.reportsService.getPayments().subscribe((data) => {
			// console.log(data);
			if (data) {
				this.listReports = data.data;
			}
			// console.log(this.listReports);
			this.viewReports();
		});

		this.reportsService.getReturns().subscribe((data) => {
			if (data) {
				this.listReturn = data.data;
			}
			console.log(this.listReturn);
			this.viewReturns();
		});

		this.reportsService.getRents().subscribe((data) => {
			if (data) {
				this.listRents = data.data;
			}

			// console.log(this.listRents);
			this.viewRents();
		});
	}

	viewReports() {
		const ingresosPorFecha = this.agruparPagosPorFecha();
		const fechasOrdenadas = Object.keys(ingresosPorFecha).sort(
			(a, b) => new Date(a).getTime() - new Date(b).getTime(),
		);
		const valoresOrdenados = fechasOrdenadas.map(
			(fecha) => ingresosPorFecha[fecha],
		);

		const canvas = document.getElementById("incomeChart") as HTMLCanvasElement;
		const ctx = canvas?.getContext("2d");

		if (!ctx) {
			console.error("Error: No se pudo obtener el contexto del canvas.");
			return;
		}

		this.chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: fechasOrdenadas,
				datasets: [
					{
						label: "Ingresos diarios",
						data: valoresOrdenados,
						borderColor: "blue",
						backgroundColor: "rgba(0, 0, 255, 0.2)",
						borderWidth: 2,
						fill: true,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	}

	viewReturns() {
		const data = this.clasificarDevoluciones();

		console.log(data);

		const canvas = document.getElementById("returnChart") as HTMLCanvasElement;
		const ctx = canvas?.getContext("2d");

		if (!ctx) {
			console.error("Error: No se pudo obtener el contexto del canvas.");
			return;
		}

		this.chart = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["A tiempo", "Atrasadas", "Antes de tiempo"],
				datasets: [
					{
						data: data,
						backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"], // Verde, Rojo, Amarillo
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "bottom",
					},
				},
			},
		});
	}

	viewRents() {
		const { labels, data } = this.agruparPorFecha();

		const canvas = document.getElementById("rentalChart") as HTMLCanvasElement;
		const ctx = canvas?.getContext("2d");

		if (!ctx) {
			console.error("Error: No se pudo obtener el contexto del canvas.");
			return;
		}

		this.chart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: labels,
				datasets: [
					{
						label: "Coches alquilados por día",
						data: data,
						backgroundColor: "rgba(54, 162, 235, 0.5)", // Azul transparente
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					x: { title: { display: true, text: "Fecha" } },
					y: {
						title: { display: true, text: "Cantidad de alquileres" },
						beginAtZero: true,
						ticks: {
							stepSize: 1, // 🔹 Evita valores decimales Asegura que el menor valor sea 1
						},
						min: 1,
					},
				},
				plugins: {
					legend: {
						position: "bottom",
					},
				},
			},
		});
	}

	agruparPagosPorFecha(): Record<string, number> {
		return this.listReports.reduce(
			(acc: any, pago: any) => {
				acc[pago.fecha_pago] = (acc[pago.fecha_pago] || 0) + pago.monto_total;
				return acc;
			},
			{} as Record<string, number>,
		);
	}

	clasificarDevoluciones(): number[] {
		let aTiempo = 0;
		let atrasadas = 0;
		let antesDeTiempo = 0;

		this.listReturn.forEach((devolucion: any, index: number) => {
			if (devolucion.devuelto_antes) {
				antesDeTiempo++;
			} else if (devolucion.sancion) {
				atrasadas++;
			} else {
				aTiempo++;
			}
		});

		return [aTiempo, atrasadas, antesDeTiempo];
	}

	agruparPorFecha() {
		const conteo: Record<string, number> = {};

		this.listRents.forEach((alquiler: any, index: number) => {
			conteo[alquiler.fecha_inicio] = (conteo[alquiler.fecha_inicio] || 0) + 1;
		});

		const labels = Object.keys(conteo).sort();
		const data = labels.map((fecha) => conteo[fecha]);

		return { labels, data };
	}
}
