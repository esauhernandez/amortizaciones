import Firebase from 'firebase'

console.log("FIREBASE INITED");

	// PRODUCCION
      var config = {
        apiKey: "AIzaSyA8oAoGOmMBinlNZcA4xjHwamsoAx9Cxnk",
        authDomain: "finsol-mobile-prod.firebaseapp.com",
        databaseURL: "https://finsol-mobile-prod.firebaseio.com",
        projectId: "finsol-mobile-prod",
        storageBucket: "finsol-mobile-prod.appspot.com",
        messagingSenderId: "564001173863",
        appId: "1:564001173863:web:121dcece39e86e6c"
      };
	//DESARROLLO
     /*var config = {
        apiKey: "AIzaSyA1VLHscAFW3_9d4fS95w7wnrMWs4P6EAY",
        authDomain: "finsol-calcula.firebaseapp.com",
        databaseURL: "https://finsol-calcula.firebaseio.com",
        projectId: "finsol-calcula",
        storageBucket: "finsol-calcula.appspot.com",
        messagingSenderId: "764650291788",
        appId: "1:764650291788:web:0d49b47ab5bf3928"
	};*/


let app = Firebase.initializeApp(config)

export const db = app.database();

