import { Component, OnInit } from '@angular/core';
import { orders } from './_orders';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css']
})
export class TableDemoComponent implements OnInit {
  searchValue = '';
  sortName: string | null = null;
  sortValue: string | null = null;
  listOfSearchAddress: string[] = [];
  listOfData: Array<{ createdOn: string; id: string; in: number; out: number; email: string; }> = orders;
  listOfDisplayData = [...this.listOfData];
  mapOfSort: { [key: string]: any } = {
    createdOn: null,
    in: null,
    out: null
  };

  constructor() { }

  ngOnInit() {
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    this.search();
  }

  search(): void {
    const listOfData = this.listOfData
      .filter(item => item.id.indexOf(this.searchValue) !== -1);

    if (this.sortName && this.sortValue) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
            ? 1
            : -1
      );
    } else {
      this.listOfDisplayData = listOfData;
    }
  }
}
