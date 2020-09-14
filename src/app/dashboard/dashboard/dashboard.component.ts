import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieData = {
    labels: ['Mensal', 'Educação', 'Lazer'],
    datasets: [
      {
        data: [2500, 2700, 500],
        backgroundColor: ['#FF9900', '##990099', '#3B3EAC']
      }
    ]
  };

  lineData = {
      labels: ['Janeiro', 'Fevereiro', 'Agosto'],
      datasets: [
        {
          label: ['linha1'],
          data: [35, 28, 19],
          borderColor: '#3366CC'
        },
        {
          label: ['linha2'],
          data: [12, 56, 59],
          borderColor: '#D62B00'
        }
      ]
    };

  constructor() {}

  ngOnInit() {
  }

}
