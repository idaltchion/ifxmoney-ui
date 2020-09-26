import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieData: any;
  lineData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configurePieChart();
    this.configureLineChart();
  }

  configurePieChart() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  configureLineChart() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();
        const totalReceita = this.totalPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totalDespesa = this.totalPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receita',
              data: totalReceita,
              borderColor: '#3366CC'
            },
            {
              label: 'Despesa',
              data: totalDespesa,
              borderColor: '#D62B00'
            }
          ]
        };
      });
  }

  private totalPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes() {
    const quantidade = moment('2020-06', 'YYYY-MM').daysInMonth();
    console.log(quantidade);
    const dias: number[] = [];
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

}
