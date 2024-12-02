import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
let PagesComponent = class PagesComponent {
    displayedColumns = ['timestamp', 'empId', 'scenario', 'eventId', 'eventDuration', 'action', 'mediaClip'];
    dataSource = new MatTableDataSource([
        { timestamp: '2024-10-12 12:45', empId: 'ADV001', scenario: 'hazard warnings', eventId: 'E1001', eventDuration: '5 mins', action: 'Checked', mediaClip: 'View' },
        { timestamp: '2024-10-12 13:15', empId: 'ADV002', scenario: 'hazard warnings', eventId: 'E1002', eventDuration: '3 mins', action: 'Recorded', mediaClip: 'Play' },
        { timestamp: '2024-10-12 14:00', empId: 'ADV003', scenario: 'normal operation', eventId: 'E1003', eventDuration: '10 mins', action: 'Monitored', mediaClip: 'View' }
    ]);
    paginator;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    applyFilter(event) {
        const filterValue = event.target.value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
    }
    exportToPDF() {
        const doc = new jsPDF();
        const columns = ['Timestamp', 'Employee ID', 'Scenario', 'Event ID', 'Event Duration', 'Action', 'Media Clip'];
        const rows = this.dataSource.data.map(event => [
            event.timestamp, event.empId, event.scenario, event.eventId, event.eventDuration, event.action, event.mediaClip
        ]);
        doc.text('Events Table', 14, 16);
        // Use the autoTable plugin to create the table in the PDF
        doc.autoTable({
            head: [columns],
            body: rows,
        });
        doc.save('events-table.pdf');
    }
    exportToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'events-table');
    }
    saveAsExcelFile(buffer, fileName) {
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
    }
};
__decorate([
    ViewChild(MatPaginator)
], PagesComponent.prototype, "paginator", void 0);
PagesComponent = __decorate([
    Component({
        selector: 'app-pages',
        standalone: true,
        imports: [
            MatTableModule,
            MatToolbarModule,
            MatPaginatorModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            CommonModule,
            FormsModule,
            RouterModule
        ],
        templateUrl: './pages.component.html',
        styleUrls: ['./pages.component.css']
    })
], PagesComponent);
export { PagesComponent };
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//# sourceMappingURL=pages.component.js.map