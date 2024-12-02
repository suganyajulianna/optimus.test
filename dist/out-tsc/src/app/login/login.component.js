import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { FirstService } from '../first.service';
import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { io } from 'socket.io-client'; // Import Socket.IO client
let LoginComponent = class LoginComponent {
    fb;
    http;
    socket;
    display = true;
    liveData = []; // Array to hold the live data updates
    signupUsers = []; // Array to hold signed-up users
    // signUpForm!: FormGroup; // Use non-null assertion operator
    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]), // 'username' is required
        password: new FormControl('', [Validators.required]) // 'password' is required
    });
    signUpForm = new FormGroup({
        firstname: new FormControl('', [Validators.required]), // 'username' is required
        lastname: new FormControl('', [Validators.required]), // 'username' is required
        email: new FormControl('', [Validators.required]), // 'password' is required
        password: new FormControl('', [Validators.required]) // 'password' is required
    });
    constructor(fb, http) {
        this.fb = fb;
        this.http = http;
    }
    ngOnInit() {
        throw new Error('Method not implemented.');
    }
    // ngOnInit(): void {
    // Initialize the signup form
    // Load existing users from localStorage if available
    // const localData = localStorage.getItem('signUpUsers');
    // if (localData !== null) {
    //   this.signupUsers = JSON.parse(localData); // Parse users stored in localStorage
    //   console.log('Loaded users from localStorage:', this.signupUsers);
    // } else {
    //   console.log('No users found in localStorage.');
    // }
    // }
    //   ngOnInit(): void {
    //     // Connect to the Socket.IO server
    //     this.socket = io('http://localhost:4000'); // Ensure the URL matches your server
    //     // Log connection status
    //     this.socket.on('connect', () => {
    //         console.log('Socket.IO connected');
    //     });
    //     // Listen for database changes
    //     this.socket.on('dbChange', (change: any) => {
    //         console.log('Change detected:', change);
    //         this.getmethod(); // Fetch updated data when a change is detected
    //     });
    //     // Initial data fetch
    //     this.getmethod();
    // }
    gOnInit() {
        // Establish a connection to the WebSocket server
        this.socket = io('http://localhost:4000'); // Ensure the URL matches your server's
        // Log connection status
        this.socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });
        // Listen for live updates from the server
        this.socket.on('dbChange', (change) => {
            console.log('Database change detected:', change);
            // Update the live data array with the new data
            this.updateLiveData(change);
            console.log(this.liveData);
        });
        // Fetch initial data when the component loads
        this.getmethod();
    }
    async onSignUp() {
        const formData = {
            Name: {
                FirstName: this.signUpForm.value.firstname,
                LastName: this.signUpForm.value.lastname,
            },
            EmailID: this.signUpForm.value.email,
            Password: this.signUpForm.value.password,
        };
        try {
            console.log(formData);
            // Send the correctly structured data to the backend API
            const response = await this.http.post('http://localhost:4000/api/user/Register', formData).toPromise();
            console.log(response);
            this.signUpForm.reset(); // Reset form after successful signup
        }
        catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        }
    }
    async onLogin() {
        const formData = {
            EmailID: this.loginForm.value.username, // Make sure this matches your form's input field name
            Password: this.loginForm.value.password
        };
        try {
            console.log(formData);
            const response = await this.http.post('http://localhost:4000/api/user/LogIn', formData).toPromise();
            console.log('Login response:', response);
            // Store the token in localStorage
            // sessionStorage.setItem('token', response.token); 
            // Reset the form
            this.loginForm.reset();
            // Optionally, call any method to fetch user data or redirect
            this.getmethod();
        }
        catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    }
    async getmethod() {
        try {
            // Make the GET request without the Authorization header
            const response = await this.http.get('http://localhost:4000/api/user/LogInData').toPromise();
            console.log('Got data:', response);
        }
        catch (error) {
            console.error('Request failed:', error);
            alert('Request failed. Please try again.');
        }
    }
    ngOnDestroy() {
        if (this.socket) {
            this.socket.disconnect(); // Clean up the connection on component destroy
        }
    }
    // Method to handle live updates
    updateLiveData(change) {
        // You can manipulate or display the change data as needed
        this.liveData.push(change.fullDocument); // Example: add new document to liveData array
        console.log(this.liveData);
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        standalone: true,
        imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Include HttpClientModule here
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
    })
], LoginComponent);
export { LoginComponent };
// async getmethod() {
//   try {
//     // Get token from localStorage
//     const token = sessionStorage.getItem('token');
//       // const token:any = sessionStorage.removeItem('token');
//     // If token exists, make the GET request with the Authorization header
//     if (token) {
//       const response: any = await this.http.get('http://localhost:4000/api/user/LogInData', {
//         headers: {
//           Authorization: Bearer ${token}
//         }
//       }).toPromise();
//       console.log('Got data:', response);
//     } else {
//       console.error('No token found. Please log in.');
//       alert('No token found. Please log in.');
//     }
//   } catch (error) {
//     console.error('Login failed:', error);
//     alert('Login failed. Please try again.');
//   }
// }
//# sourceMappingURL=login.component.js.map