// import { Injectable } from '@angular/core';
// import jwt_decode from 'jwt-decode';

// @Injectable()
// export class JWTTokenService {

//     jwtToken!: string;
//     decodedToken!: { [key: string]: string };
//     expiryTime: any;

//     constructor() {
//     }

//     setToken(token: string) {
//       if (token) {
//         this.jwtToken = token;
//       }
//     }

//     decodeToken() {
//       if (this.jwtToken) {
//       this.decodedToken = jwt_decode(this.jwtToken);
//       }
//     }

//     getDecodeToken() {
//       return jwt_decode(this.jwtToken);
//     }

//     getUserFirstName() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.firstname : null;
//     }
//     getUserLastName() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.lastname : null;
//     }

//     getEmailId() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.email : null;
//     }

//     getPhone() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.phone : null;
//     }

//     getUserType() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.usertype : null;
//     }

//     getExpiryTime() {
//       this.decodeToken();
//       return this.decodedToken ? this.decodedToken.exp : null;
//     }

//     isTokenExpired(): boolean {

//       this.expiryTime = this.getExpiryTime();
      
//       if (this.expiryTime) {
//         return ((1000 * this.expiryTime) - (new Date()).getTime()) < 5000;
//       } else {
//         return false;
//       }
//     }
// }