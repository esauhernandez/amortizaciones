<template>
  <md-layout md-align="center" style="height: 100%;" md-gutter md-vertical-align="center" >
	<md-layout md-flex="195" style=" height:95% !important;">
        <md-layout md-flex="100" style="background:white; border-radius: 5px; height:100%;" >
            <md-layout md-flex="100" class="md-scrollbar" style="height:100%;" >
                <md-card md-flex="100" style="width:100%; margin:10px;">
                    <md-card-content>
                        <md-layout style="margin-top:0px;" md-gutter md-flex="100" md-align="left">
                            <md-layout md-flex="10" md-align="center" v-if="user">
                                <md-image :md-src="user.photoURL" style="height: 60px;"></md-image>
                            </md-layout>

                            <md-layout md-flex="15"  style="text-align: left; margin-top: 10px;" md-vertical-align="top" v-if="user">
                                <div style="fontSize: 15px">{{user.displayName}}</div>
                                <div style="fontSize: 12px"><strong>{{user.email}}</strong></div>
                            </md-layout>

                            <md-layout md-flex="10" md-align="center" v-if="user">
                                <md-button class="md-mini md-fab md-primary" md-align="center" style="top:-2px;" v-on:click="signout()">
                                    <svg fill="#0055a0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                                    </svg>
                                    <md-tooltip md-direction="right">Salir</md-tooltip>
                                </md-button>
                            </md-layout>

                            <md-layout md-gutter md-flex="50" md-align="center">
                                <h1>Amortizaciones</h1>
                            </md-layout>
                            <md-layout md-gutter md-flex="15" md-align="right">
                                <img style="height:50px; width:160px;" src="../assets/watermark.png"/>
                            </md-layout>
                            
                        </md-layout>
                    </md-card-content>

                    <md-card-content>                        
                        <Busqueda/>
                    </md-card-content>


				</md-card>
                
            </md-layout>

            <md-dialog md-open-from="#signin" md-close-to="#signin" ref="signinDialog" md-is-locked-open='true' :md-click-outside-to-close="false">
                <md-dialog-content id="firebaseui-auth-container">
                    <div align='center'>
                        <md-spinner :md-size="100" md-indeterminate class="md-warn" v-if="!onLogin"/>
                    </div>
                </md-dialog-content>
            </md-dialog>


			<md-dialog-alert
				:md-content="alert.contentHtml"
				:md-ok-text="alert.ok"
				ref="alert"/>
			</md-layout>

		</md-layout>
	</md-layout>

</template>
<script>
    import {db} from '../firebaseref/fb';
    import {getUsuarioLoginPath} from '../firebaseref/FirebasePaths';
    import {getUsuarioLogedPath} from '../firebaseref/FirebasePaths';
    import {appStrings} from '../values/strings';
    import Busqueda from "../components/Busqueda";
    //import Reporte from "../components/Reporte";

	var firebase = require('firebase');
	var firebaseui = require('firebaseui');



	export default {
        mounted: function () {
            var self = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) { 
                    // User is signed in.
                    self.user = user;
                    self.displayName = user.displayName;
                    self.email = user.email;
                    self.photoURL = user.photoURL;

                    //Inicia sesión con correo de gmail
                    var path = getUsuarioLoginPath(user.email);
                    var ref = db.ref(path);
                    console.log("Referencia:" + ref);
                    ref.on("value", function(snapshot) {
                        self.accessGranted = snapshot.val();

                        if(!snapshot.val()){
                        self.alertDialog(appStrings.noAuth);
                        }

                    }, function (errorObject) {
                        if(self.user != undefined){
                            self.alertDialog(appStrings.conexionFail);
                            console.log(errorObject)
                        }
                    });

                    //Setea los dtos del usuario en userFirebase
                    var pathLoged = getUsuarioLogedPath(user.email);
                    var refLoged = db.ref(pathLoged);
                    refLoged.on("value", function(snapshotLoged){

                        if(snapshotLoged.val() == null){
                        //self.alertDialog(appStrings.noAuth);
                        }else{
                            self.userFirebase = snapshotLoged.val();
                            console.log(snapshotLoged.val());
                        }

                    }, function(errorObject){
                        if(self.user != undefined){
                            self.alertDialog(appStrings.conexionFail);
                            console.log(errorObject)
                        }
                    });

                    var dialog = self.$refs["signinDialog"];
                        dialog.close();
                    } else {
                        self.onLogin = true;
                        self.signinDialog();
                    }
                }, function(error) {
                    self.alertDialog(appStrings.conexionFail);
                    console.log(error)
                });
	},
    components: {
        Busqueda,
        //Reporte,
        //Escalera
    },
        data () {
            return {
                user: null,
                onLogin: false,
                alert: {
                    contentHtml: 'Ocurrió un error, pongase en contacto con su proveedor',
                    ok: 'Aceptar',
                },
                versionActual: appStrings.version,
                viewAnalitica: false,
                userFirebase: []
            }
        },
        methods:{
            alertDialog(msg){
            var infoAlert = this.$refs["alert"];
            this.alert.contentHtml = msg;
            infoAlert.open();
        },
        signinDialog(){
            this.user = undefined;
            var dialog = this.$refs["signinDialog"];
            dialog.open();

            var uiConfig = {
            signInSuccessUrl: '',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
                // firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
            };



            var ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);

            if(this.interval == null){
                var self = this;
                this.interval = setInterval(function(){

                    var a = document.getElementsByClassName('firebaseui-idp-button').length;
                    self.onLogin = !(a==0);

                }, 250)
            }
        },
        signout(){
            firebase.auth().signOut();
            location.reload();
        },
        selectSucursalFromPunteo(suc){
            console.log("Sucursal: " + suc);
            this.$refs.fooSuc.setSucursalGeneral(suc);
        }
    }
}
</script>
<style>
    .indicador{
        font-size: 30px;
    }
    .vencido{
        color:red;
    }
    .vigente{
        color:green;
    }
    /*.firebaseui-idp-icon-wrapper{
        display: none;
    }*/
    .firebaseui-idp-list{
        padding: 0px;
        margin: 0px;
        list-style-type: none;
    }
    .firebaseui-idp-icon{
        content:url("../assets/finsol.png");
        align-content: center;
    }
    .firebaseui-idp-text-long{
        display: none;
    }
    .firebaseui-idp-text-short{
        display: none;
    }
    .firebaseui-idp-button{
        background: #0055a0;
    }
    #firebaseui-auth-container{
        background: #0055a0;
    }
    .watermark{
        background:#ffffff url("../assets/watermark.png") no-repeat right top;
        background-size: 20% 10%;
    }
    #acuerdoList .md-list-item-container{
        padding: 0px !important;
    }
    #acuerdoList .md-card{
        margin-right: 0px !important;
        margin-left: 0px !important;
    }
    .md-content {
        max-width: 400px;
        max-height: 200px;
        overflow: auto;
    }
</style>
