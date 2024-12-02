import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { PpeKitsService } from '../ppe-kits.service';
import { HttpClientModule } from '@angular/common/http'; // Already imported
import { ImagepopupComponent } from '../imagepopup/imagepopup.component';
let ScenarioComponent = class ScenarioComponent {
    ppeKitService;
    dialog;
    http;
    // @ViewChild('hPaginator') hPaginator!: MatPaginator;
    // @ViewChild('wPaginator') wPaginator!: MatPaginator;
    // @ViewChild('cPaginator') cPaginator!: MatPaginator;
    // ngAfterViewInit() {
    //   this.dataSource.paginator = this.hPaginator;
    //   this.restrictdataSource.paginator = this.wPaginator;
    //   this.dataSource2.paginator = this.cPaginator;
    // }
    displayedColumns = ['timestamp', 'empId', 'eventId', 'eventDuration', 'mediaClip'];
    // displayedColumns1: string[] = [
    //   'timestamp', 
    //   'scenario', 
    //   'location_id', 
    //   'durablition', 
    //   'vacancy_status', 
    //   'vacant_count_duration', 
    //   'employee_id', 
    //   'frame'
    // ];
    // restrictdataSource: any[] = [];
    hazardWarningsData = []; // Fetch your data
    workerSafetyData = []; // Fetch your data
    compliancePoliciesData = []; // Fetch your data
    suspiciousActivityData = []; // Fetch your data
    ppeKits = [];
    dataSource = []; // You can specify a more appropriate type
    // restrictRouteData: any;
    // unauthorizedData: any; // Added this property
    // restrictRouteData1: any;
    selectedImage = null;
    // selectedImage: string = '';
    fireFrames = [];
    selectedFrame = null;
    restrictRouteData = [];
    unauthorizedData = [];
    restrictRouteData1 = [];
    restrictdataSource = [];
    displayedColumns1 = [
        'timestamp',
        'scenario',
        'location_id',
        'duration',
        'vacancy_status',
        'vacant_count_duration',
        'employee_id',
        'frame'
    ];
    constructor(ppeKitService, dialog, http) {
        this.ppeKitService = ppeKitService;
        this.dialog = dialog;
        this.http = http;
    }
    // ngAfterViewInit(): void {
    //   throw new Error('Method not implemented.');
    // }
    async ngOnInit() {
        await this.getData1(); // Fetch the first set of data
        await this.getData2(); // Fetch the second set of data
        this.restrictdataSource = [...this.restrictRouteData1];
        // await this.getData1(); // Fetch Restrict Route Data
        // await this.getData2(); // Fetch Unauthorized Data
        this.fetchEvents(); // Fetch events on initialization
        this.ppeKitService.getAllFireFrames().subscribe((fireFrames) => {
            this.updateDataSource(fireFrames);
        });
    }
    fetchEvents() {
        this.ppeKitService.getAllPPEKits().subscribe((kits) => {
            this.ppeKits = kits.map(kit => {
                console.log('kit.personName:', kit.personName); // Debugging log
                const lastStatusChange = kit.statusChanges.length > 0
                    ? kit.statusChanges[kit.statusChanges.length - 1]
                    : null;
                return {
                    ...kit,
                    lastStatusChange: lastStatusChange || {
                        hardhat: kit.hardhat,
                        mask: kit.mask,
                        safetyVest: kit.safetyVest,
                        missingFrom: kit.missingFrom,
                        missingTo: kit.missingTo,
                        image: kit.image,
                        safetyBoot: kit.safetyBoot,
                        glass: kit.glass,
                        cameraId: kit.cameraId
                    },
                    // Adding employeeId if personName is present
                    personName: kit.personName ? kit.personName : null
                };
            });
        });
    }
    updateDataSource(fireFrames) {
        // Clear the current dataSource
        this.dataSource = [];
        // Process fireFrames to extract only the last 3 frames and update dataSource
        fireFrames.forEach((frame) => {
            // Take only the last 3 frames from the current frame record
            const lastFrames = frame.frames.slice(-3);
            lastFrames.forEach((f) => {
                const eventData = {
                    Timestamp: f.timestamp,
                    label: f.label, // Assuming label represents the event type
                    cameraLocation: frame.cameraLocation,
                    confidence: f.confidence, // Assuming confidence represents the event's confidence score
                    image: f.image, // Assuming 'image' is the frame's image data
                };
                // Add the event data to the table
                this.dataSource.push(eventData);
            });
        });
        // Trigger a change detection to update the view
        this.dataSource = [...this.dataSource];
    }
    openImage(base64Image) {
        if (!base64Image) {
            console.error('No image provided');
            return; // Early return if there's no image
        }
        // If the base64 image is not prefixed with 'data:image/...', prefix it
        const mimeType = base64Image.startsWith('/') ? 'data:image/jpeg;base64,' : 'data:image/png;base64,';
        this.selectedImage = mimeType + base64Image;
        // Open the modal to display the image
        this.dialog.open(ImageModalComponent, {
            data: { image: this.selectedImage }, // Pass the image data to the modal
            width: '80%',
            maxWidth: '600px'
        });
    }
    getImageUrl(image) {
        if (image) {
            // Ensure base64 format or URL is valid
            return image.startsWith('data:image') ? image : `data:image/jpeg;base64,${image}`;
        }
        return 'assets/default-image.jpg'; // Fallback image if none provided
    }
    getDisplayImageFire(fireFrame) {
        if (!fireFrame || !fireFrame.frames || fireFrame.frames.length === 0) {
            return ''; // Return empty string or a default image
        }
        const latestFrame = fireFrame.frames[fireFrame.frames.length - 1];
        return latestFrame?.image || ''; // Fallback to empty string or default image
    }
    getDisplayImage(kit) {
        return kit.lastStatusChange?.image || kit.image;
    }
    getPPEStatus(kit) {
        const lastStatusChange = kit.lastStatusChange;
        return lastStatusChange
            ? `Hardhat: ${lastStatusChange.hardhat ? '✅' : '❌'}, 
      Mask: ${lastStatusChange.mask ? '✅' : '❌'}, 
      Vest: ${lastStatusChange.safetyVest ? '✅' : '❌'},
      safetyBoot: ${lastStatusChange.safetyBoot ? '✅' : '❌'},
      glass  : ${lastStatusChange.glass ? '✅' : '❌'}`
            : `Hardhat: ${kit.hardhat ? '✅' : '❌'},
       Mask: ${kit.mask ? '✅' : '❌'}, 
       Vest: ${kit.safetyVest ? '✅' : '❌'},
       safetyBoot: ${kit.safetyBoot ? '✅' : '❌'},
       glass: ${kit.glass ? '✅' : '❌'}`;
    }
    // async getData1(): Promise<void> {
    //   try {
    //     const response: any | undefined= await this.http.get<any[]>('http://localhost:4000/api/user/restrictroutedata').toPromise();
    //     // this.dataSource = response
    //     console.log("this.dataSource",response)
    //   } catch (error) {
    //     console.log(error)
    //   } 
    // }
    // async getData2(): Promise<void> {
    //   try {
    //     const response: any | undefined= await this.http.get<any[]>('http://localhost:4000/api/user/unauthoriseddata').toPromise();
    //     // this.dataSource = response
    //     console.log("this.dataSource",response)
    //   } catch (error) {
    //     console.log(error)
    //   } 
    // }
    async getData1() {
        try {
            const response = await this.http
                .get('http://localhost:4000/api/user/restrictroutedata')
                .toPromise();
            this.restrictRouteData = response.slice(-10);
            console.log('Restrict Route Data:', this.restrictRouteData);
        }
        catch (error) {
            console.error('Error fetching Restrict Route Data:', error);
        }
    }
    async getData2() {
        try {
            const response = await this.http
                .get('http://localhost:4000/api/user/unauthoriseddata')
                .toPromise();
            this.unauthorizedData = response.slice(-10);
            console.log('Unauthorized Data:', this.unauthorizedData);
            this.restrictRouteData1 = [...this.restrictRouteData, ...this.unauthorizedData].map(item => ({
                timestamp: item.createdAt || item.start_timestamp,
                scenario: item.scenario,
                location_id: item.location_id || item.CameraLocationID,
                duration: item.duration
                    ? `${item.duration.hours}h ${item.duration.minutes}m`
                    : `${item.person_count_duration || 0} minutes`,
                vacant_count_duration: item.vacant_count_duration || '-',
                frame: item.frame,
                vacancy_status: item.vacancy_status || '-',
                employee_id: item.employee_id || '-'
            }));
        }
        catch (error) {
            console.error('Error fetching Unauthorized Data:', error);
        }
    }
    openImage1(frame) {
        if (frame) {
            this.dialog.open(ImagepopupComponent, {
                data: { imageUrl: frame },
                width: '80%',
                height: '80%'
            });
        }
        else {
            console.warn('No image frame available for this record.');
        }
    }
};
ScenarioComponent = __decorate([
    Component({
        selector: 'app-scenario',
        standalone: true,
        imports: [
            MatCardModule,
            MatTabsModule,
            MatToolbarModule,
            MatInputModule,
            MatIconModule,
            FormsModule,
            CommonModule,
            MatTableModule,
            RouterModule,
            MatPaginatorModule,
            HttpClientModule
        ],
        templateUrl: './scenario.component.html',
        providers: [PpeKitsService],
        styleUrls: ['./scenario.component.scss']
    })
], ScenarioComponent);
export { ScenarioComponent };
//# sourceMappingURL=scenario.component.js.map