import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupempimageComponent } from '../popupempimage/popupempimage.component';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
let SettingsComponent = class SettingsComponent {
    fb;
    http;
    dialog;
    snackBar;
    cameradata;
    isEditMode = false;
    isEditMode1 = false;
    EmployeeId;
    cameraupdateid;
    constructor(fb, http, dialog, snackBar) {
        this.fb = fb;
        this.http = http;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.form = this.fb.group({
            department: [''],
            username: [''],
            password: [''],
        });
    }
    ngOnInit() {
        this.getData();
        this.getData1();
        this.form.get('department')?.valueChanges.subscribe((value) => {
            this.showSafetyFields = value === 'safety';
        });
    }
    EmployeeResgistration = new FormGroup({
        empId: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        designation: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        emailid: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        empImage: new FormControl(''), // Image as binary data will be handled separately
    });
    dataSource = new MatTableDataSource([]);
    department = ''; // Track selected department
    //   displayedColumns: string[] = [
    //     'EmployeeID', 'Name', 'Department', 'Designation', 'Location', 'EmailID', 'Password', 'EmployeeImage', 'edit', 'delete'
    // ];
    displayedColumns = [
        'EmployeeID', 'Name', 'Department', 'Designation', 'Location', 'EmailID', 'EmployeeImage', 'edit', 'delete'
    ];
    // dataSource:any | undefined;
    imageUrl = null;
    // dataSource = new MatTableDataSource<Employee>([
    //   { empId: 'ADV100001', name: 'Parthiban', department: 'Production', designation: 'Manager', location: 'East block' },
    //   { empId: 'ADV100002', name: 'bharathiraja', department: 'Testing', designation: 'Plant Head', location: 'Main block' }
    // ]);
    CAMERA_DATA = [
        { username: 'C001', password: 'Model A', cameradetials: 'Lobby', cameralocationname: 'Active', cameralocationid: 'C001', description: 'Model A', ipaddress: 'Lobby', port: 'Active', rtmp: 'Active', cameravisibility: 'Yes' },
        { username: 'C002', password: 'Model B', cameradetials: 'Hallway', cameralocationname: 'Inactive', cameralocationid: 'C002', description: 'Model B', ipaddress: 'Hallway', port: 'Inactive', rtmp: 'Inactive', cameravisibility: 'No' },
    ];
    cameraDataSource = new MatTableDataSource([]);
    cameraDisplayedColumns = [
        'CameraDetails',
        'CameraLocationID',
        'CameraLocationName',
        'IPAddress',
        'LocationDescription',
        'Password',
        'Port',
        'RTSPandRTMP',
        'UserName',
        'CameraVisibility',
        'edit',
        'delete'
    ];
    cameradetails = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        cameradetials: new FormControl('', [Validators.required]),
        cameralocationname: new FormControl('', [Validators.required]),
        cameralocationid: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        ipaddress: new FormControl('', [Validators.required]),
        port: new FormControl('', [Validators.required]),
        rtmp: new FormControl('', [Validators.required]),
        cameravisibility: new FormControl(false, [Validators.required]),
    });
    hPaginator;
    wPaginator;
    ngAfterViewInit() {
        this.dataSource.paginator = this.hPaginator;
        this.cameradata.paginator = this.wPaginator;
    }
    // Function to handle file selection and convert to binary
    selectedFile = null;
    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }
    async onSubmit() {
        if (this.EmployeeResgistration.value) {
            const formData1 = await new FormData();
            formData1.append('EmployeeID', this.EmployeeResgistration.value.empId);
            formData1.append('Name', this.EmployeeResgistration.value.name);
            formData1.append('Department', this.EmployeeResgistration.value.department);
            formData1.append('Designation', this.EmployeeResgistration.value.designation);
            formData1.append('EmailID', this.EmployeeResgistration.value.emailid);
            formData1.append('Password', this.EmployeeResgistration.value.password);
            formData1.append('Location', this.EmployeeResgistration.value.location);
            // Only append the image if one is selected
            if (this.selectedFile) {
                formData1.append('EmployeeImage', this.selectedFile, this.selectedFile.name);
            }
            // Call the method to send the data to the backend
            await this.uploadEmployeeData(formData1);
            await this.getData();
            await this.EmployeeResgistration.reset();
            this.selectedFile = null;
            this.snackBar.open('Registerd successfully!', 'Close', {
                duration: 3000, // Display for 3 seconds
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
        else {
            this.snackBar.open('Failed to Register.', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
    }
    // Method to send form data to the backend API
    uploadEmployeeData(formData) {
        console.log(formData);
        const apiUrl = 'http://localhost:4000/api/user/Register'; // Your backend API URL
        this.http.post(apiUrl, formData).subscribe((response) => {
            console.log('Employee Registered Successfully:', response);
        }, (error) => {
            console.error('Error Registering Employee:', error);
        });
    }
    // Cancel button logic to reset the form
    onCancel() {
        this.EmployeeResgistration.reset();
    }
    // UserName,
    // Password,
    // CameraDetails,
    // CameraLocationName,
    // CameraLocationID,
    // LocationDescription,
    // IPAddress,
    // Port,
    // RTSPandRTMP,
    // CamereVisibility
    onSubmit1() {
        console.log(this.cameradetails.value);
        // Construct the data to send
        const cameraData = {
            UserName: this.cameradetails.value.username,
            Password: this.cameradetails.value.password,
            CameraDetails: this.cameradetails.value.cameradetials, // Fixed typo here
            CameraLocationName: this.cameradetails.value.cameralocationname,
            CameraLocationID: this.cameradetails.value.cameralocationid,
            LocationDescription: this.cameradetails.value.description,
            IPAddress: this.cameradetails.value.ipaddress,
            Port: this.cameradetails.value.port,
            RTSPandRTMP: this.cameradetails.value.rtmp,
            CameraVisibility: this.cameradetails.value.cameravisibility
        };
        // Set headers explicitly for JSON content
        const headers = { 'Content-Type': 'application/json' };
        console.log(cameraData);
        // Send the data as JSON with the correct header
        this.http.post('http://localhost:4000/api/user/CameraRegister', cameraData, { headers })
            .subscribe((response) => {
            console.log('Response:', response);
        }, (error) => {
            console.error('Error:', error);
        });
    }
    // UserName:UserName,
    // Password:Password,
    // CameraDetails:CameraDetails,
    // CameraLocationName:CameraLocationName,
    // CameraLocationID:CameraLocationID,
    // LocationDescription:LocationDescription,
    // IPAddress:IPAddress,
    // Port:Port,
    // RTSPandRTMP:RTSPandRTMP,
    // CamereVisibility:CamereVisibility
    // async loginform(formData: any) {
    //   try {
    //     // const response: any = await this.http.post('https://cstimesheet.onrender.com/api/user/Login', formData).toPromise();
    //     const response: any = await this.http.post('https://cstimesheet-unsk.onrender.com/api/user/4391', formData).toPromise();
    //     // const response: any = await this.http.post('http://localhost:10000/api/user/Login', formData).toPromise();
    //     this.username = response.user.Name;
    //     this.EmployeeId=response.user.EmployeeId;
    //     this.Designation=response.user.Designation;
    //     this.Emailaddress=response.user.Emailaddress;
    //     this.Department = response.user.Department;
    //     sessionStorage.setItem(btoa('username'), btoa(this.username));
    //     sessionStorage.setItem(btoa('EmployeeId'), btoa(this.EmployeeId));
    //     sessionStorage.setItem(btoa('UserEmail'), btoa(this.Emailaddress));
    //     sessionStorage.setItem(btoa('Department'), btoa(this.Department));
    //     sessionStorage.setItem(btoa('username1'), btoa('User'));
    //     const imageUrl = response.user.profilePicture
    //       // ? https://cstimesheet.onrender.com/${response.user.profilePicture.replace(/\\/g, '/')}
    //       ? https://cstimesheet-unsk.onrender.com/${response.user.profilePicture.replace(/\\/g, '/')}
    //       // ? http://localhost:10000/${response.user.profilePicture.replace(/\\/g, '/')}
    //       : null;
    //     const image: any = new Image();
    //     image.src = imageUrl;
    //     this.userimageurl= imageUrl
    //     sessionStorage.setItem(btoa('userimage'), btoa(${this.userimageurl}));
    //     sessionStorage.setItem(btoa('Designation'), btoa(this.Designation));
    //     image.onload = () => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: ` Welcome, ${this.username}!`,
    //         html: <img class="img-fluid rounded-circle center-img" src="${imageUrl}" alt="Profile Picture" style="max-width: 50%; max-height:50%; margin-top: 10%; margin-bottom: -0%; " >,
    //         customClass: {
    //           popup: 'custom-popup-class',
    //         },
    //       });
    //       // if (this.Designation === 'Admin') {
    //       //   this.rout.navigateByUrl('/main');
    //       // } else {
    //       //   if (this.Designation === 'User') {
    //       //     this.rout.navigateByUrl('/User');
    //       //   } else {
    //       //     if (this.Designation === 'Sales') {
    //       //       this.rout.navigateByUrl('/salesmain');
    //       //     }
    //       //   }
    //       // } 
    //       if (this.Designation === 'Admin') {
    //         this.rout.navigateByUrl('/main');
    //       } else if (this.Designation === 'User') {
    //         this.rout.navigateByUrl('/User');
    //       } else if (this.Designation === 'Sales') {
    //         this.rout.navigateByUrl('/salesmain');
    //       } else if (this.Designation === 'Manager') {
    //         this.rout.navigateByUrl('/Manager');
    //       }
    //     };
    //     image.onerror = () => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: ` Welcome, ${this.username}!`,
    //       });
    //       // if (this.Designation === 'Admin') {
    //       //   this.rout.navigateByUrl('/main');
    //       // } else {
    //       //   if (this.Designation === 'User') {
    //       //     this.rout.navigateByUrl('/User');
    //       //   } else {
    //       //     if (this.Designation === 'Sales') {
    //       //       this.rout.navigateByUrl('/salesmain');
    //       //     }
    //       //   }
    //       // }
    //       if (this.Designation === 'Admin') {
    //         this.rout.navigateByUrl('/main');
    //       } else if (this.Designation === 'User') {
    //         this.rout.navigateByUrl('/User');
    //       } else if (this.Designation === 'Sales') {
    //         this.rout.navigateByUrl('/salesmain');
    //       } else if (this.Designation === 'Manager') {
    //         this.rout.navigateByUrl('/Manager');
    //       }
    //     };
    //   } catch (error) {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Try again',
    //     });
    //   }
    // }
    // onCancel() {
    //   this.EmployeeResgistration.reset();
    // }
    onEdit(employee) {
        this.isEditMode = true;
        this.EmployeeId = employee._id;
        // Use patchValue to populate form fields
        this.EmployeeResgistration.patchValue({
            empId: employee.EmployeeID,
            name: employee.Name,
            department: employee.Department,
            designation: employee.Designation,
            emailid: employee.EmailID,
            // password: employee.Password,
            location: employee.Location,
            EmployeeImage: employee.element?.EmployeeImage?.data || null // Use null if EmployeeImage is undefined
        });
        this.isEditMode = true;
    }
    async editemployeedetails() {
        try {
            // Create a FormData object
            const formData = new FormData();
            // Append the form data (non-file fields)
            formData.append('EmployeeID', this.EmployeeResgistration.value.empId);
            formData.append('Name', this.EmployeeResgistration.value.name);
            formData.append('Department', this.EmployeeResgistration.value.department);
            // formData.append('Password', this.EmployeeResgistration.value.password);
            formData.append('EmailID', this.EmployeeResgistration.value.emailid);
            formData.append('Designation', this.EmployeeResgistration.value.designation);
            formData.append('Location', this.EmployeeResgistration.value.location);
            // If the image is selected, append it to formData
            if (this.selectedFile) {
                formData.append('EmployeeImage', this.selectedFile, this.selectedFile.name);
            }
            const id = this.EmployeeId;
            const url = `http://localhost:4000/api/user/RegisterUpdate/${id}`;
            // Use PUT for updating data
            const response = await this.http.put(url, formData).toPromise();
            // Optionally, reset the form or handle further actions here
            this.isEditMode = false;
            this.snackBar.open('Updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
            this.getData();
            // Optional: Clear form after success
            this.EmployeeResgistration.reset();
        }
        catch (error) {
            this.snackBar.open('Error updating employee details.', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
    }
    async deleteRow(data) {
        try {
            const datas = data._id;
            const url = `http://localhost:4000/api/user/RegisterDelete/${datas}`;
            const response = await this.http.delete(url).toPromise();
            this.getData(); // Refresh the data
            this.snackBar.open('Deleted successfully!', 'Close', {
                duration: 3000, // Display for 3 seconds
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
        catch (error) {
            this.snackBar.open('Failed to delete Employee Details.', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
    }
    // Helper function to convert file to ArrayBuffer (for browser compatibility)
    fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result); // Directly resolve as ArrayBuffer
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
        });
    }
    //   async updatewuserdetails1(id: any, formData: any) {
    //     // const url = https://prou.onrender.com/api/user/UserProjectupdate/${id};
    //     const url = https://proutimesheet.onrender.com/api/user/UserProjectupdate/${id};
    //     // const url = http://localhost:10000/api/user/UserProjectupdate/${id};
    //     try {
    //       const response: any = await this.http.put(url, formData).toPromise();
    //       if (response && response.message === 'User details updated successfully') {
    //         await Swal.fire({
    //           icon: 'success',
    //           title: 'User details updated successfully',
    //         });
    //       } else {}
    //     } catch (error) {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Internal server error',
    //       });
    //     }
    //   }
    //   async editform() {
    //             let formdata ={
    //               "Name":this.Name,
    //               "userid":this.userid,
    //               "TodayDate":this.TodayDate,
    //               "billingType":this.billingType,
    //               "projectid":this.projectid,
    //               "taskid":this.taskid,
    //               "projectfromtime":this.projectfromtime,
    //               "projecttotime":this.projecttotime,
    //               "description":this.description,
    //               "totaytotaltime":this.totaytotaltime,
    //               "status":this.status
    //              }
    //         try {
    //            await this.service.updatewuserdetails1(this.currentStudentID1, formdata);
    //            this.clearFormData()
    //            this.getData1()
    //           this.isEditMode = false;
    //         } catch (error) {}
    // }
    // editRow(rowData: any) {
    //   this.currentStudentID1=rowData._id;
    //   this.Name=rowData.Name
    //   this.userid=rowData.userid
    //   this.TodayDate=rowData.TodayDate
    //   this.billingType=rowData.billingType
    //   this.projectid=rowData.projectid
    //   this.taskid=rowData.taskid
    //   this.projectfromtime=rowData.projectfromtime
    //   this.projecttotime=rowData.projecttotime
    //   this.description=rowData.description
    //   this.totaytotaltime=rowData.totaytotaltime
    //   this.isEditMode = true;
    // }
    onDelete(employee) {
        const index = this.dataSource.data.findIndex((e) => e.empId === employee.empId);
        if (index >= 0) {
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = [...this.dataSource.data]; // Trigger data update
            console.log('Deleted employee:', employee);
        }
    }
    onEditCamera(camera) {
        this.cameradetails.patchValue(camera);
        console.log('Editing camera:', camera);
    }
    onDeleteCamera(camera) {
        const index = this.cameraDataSource.data.findIndex(c => c.username === camera.username);
        if (index >= 0) {
            this.cameraDataSource.data.splice(index, 1);
            this.cameraDataSource.data = [...this.cameraDataSource.data]; // Trigger data update
            console.log('Deleted camera:', camera);
        }
    }
    form;
    showSafetyFields = false;
    async getData() {
        try {
            const response = await this.http.get('http://localhost:4000/api/user/LogInData').toPromise();
            this.dataSource = response;
            console.log("this.dataSource", this.dataSource);
        }
        catch (error) {
        }
    }
    // showImage(bufferData: any): void {
    //   const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
    //   const imageUrl = URL.createObjectURL(blob);
    //   window.open(imageUrl, '_blank');
    // }
    showImage(bufferData) {
        const blob = new Blob([new Uint8Array(bufferData)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        this.dialog.open(PopupempimageComponent, {
            data: { imageUrl },
            width: '400px', // Adjust the width as needed
        });
    }
    publicEmployeeResgistration; // Assume this is defined and initialized elsewhere
    downloadTemplate() {
        // Define the template structure
        const templateData = [
            {
                'Employee ID': '',
                'Name': '',
                'Department': '',
                'Email ID (if Safety)': '',
                'Password (if Safety)': '',
                'Designation': '',
                'Location': '',
                'Employee Image': '',
            }
        ];
        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(templateData);
        // Create a workbook and append the worksheet
        const workbook = {
            Sheets: { 'Template': worksheet },
            SheetNames: ['Template']
        };
        // Convert the workbook to a binary blob
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        // Create a Blob and trigger the download
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Employee_Registration_Template.xlsx';
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
    }
    async getData1() {
        try {
            const response = await this.http.get('http://localhost:4000/api/user/CameraData').toPromise();
            let data = response.data;
            console.log("data", data);
            this.cameradata = data;
        }
        catch (error) {
        }
    }
    onEdit1(camera) {
        this.isEditMode1 = true;
        this.cameraupdateid = camera._id;
        this.cameradetails.patchValue({
            username: camera.UserName,
            password: camera.Password,
            cameradetials: camera.CameraDetails,
            cameralocationname: camera.CameraLocationName,
            cameralocationid: camera.CameraLocationID,
            description: camera.LocationDescription,
            ipaddress: camera.IPAddress,
            port: camera.Port,
            rtmp: camera.RTSPandRTMP,
            cameravisibility: camera.CameraVisibility,
        });
        this.isEditMode1 = true;
    }
    async editemployeedetails1() {
        try {
            const formData1 = new FormData();
            formData1.append('CameraDetails', this.cameradetails.value.cameradetials);
            formData1.append('CameraLocationID', this.cameradetails.value.cameralocationid);
            formData1.append('CameraLocationName', this.cameradetails.value.cameralocationname);
            formData1.append('IPAddress', this.EmployeeResgistration.value.ipaddress);
            formData1.append('LocationDescription', this.cameradetails.value.description);
            formData1.append('Password', this.cameradetails.value.password);
            formData1.append('Port', this.cameradetails.value.port);
            formData1.append('RTSPandRTMP', this.cameradetails.value.rtmp);
            formData1.append('UserName', this.cameradetails.value.username);
            formData1.append('CameraVisibility', this.cameradetails.value.cameravisibility);
            console.log(formData1);
            const id = this.cameraupdateid;
            console.log(id);
            const url = `http://localhost:4000/api/user/CamereUpdate/${id}`;
            // Use PUT for updating data
            const response = await this.http.put(url, formData1).toPromise();
            // Optionally, reset the form or handle further actions here
            this.isEditMode1 = false;
            this.snackBar.open('Updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
            this.getData1();
            // Optional: Clear form after success
            this.cameradetails.reset();
        }
        catch (error) {
            this.snackBar.open('Error updating employee details.', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
    }
    async deleteRow1(data) {
        try {
            const datas = data._id;
            const url = `http://localhost:4000/api/user/CamereDelete/${datas}`;
            const response = await this.http.delete(url).toPromise();
            this.getData1(); // Refresh the data
            this.snackBar.open('Deleted successfully!', 'Close', {
                duration: 3000, // Display for 3 seconds
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
        catch (error) {
            this.snackBar.open('Failed to delete Employee Details.', 'Close', {
                duration: 3000,
                verticalPosition: 'top', // Can be removed for custom centering
                horizontalPosition: 'center', // Can be removed for custom centering
                panelClass: ['center-snackbar'], // Add custom class
            });
        }
    }
};
__decorate([
    ViewChild('hPaginator')
], SettingsComponent.prototype, "hPaginator", void 0);
__decorate([
    ViewChild('wPaginator')
], SettingsComponent.prototype, "wPaginator", void 0);
SettingsComponent = __decorate([
    Component({
        selector: 'app-settings',
        standalone: true,
        imports: [MatTabsModule, ReactiveFormsModule, MatPaginatorModule, MatTableModule, CommonModule, CommonModule,
            HttpClientModule, MatDialogModule, RouterModule, MatSnackBarModule],
        templateUrl: './settings.component.html',
        styleUrls: ['./settings.component.css']
    })
    // Emailaddress:new FormControl('',[Validators.required,Validators.email]),
    //     Password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map