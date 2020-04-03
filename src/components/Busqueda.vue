<template>
  <div>
      <md-card-content>
        <md-layout style="margin-top:0px;" md-flex="60" md-align="left">
          
          <md-layout md-flex="20" md-align="center" >
            <md-layout md-flex="100" md-align="center" md-vertical-align="center" v-if="progress" >
            <!-- <md-button class="md-primary" md-align="center" style="top:-2px;" v-on:click="buscarGrupo(grupo)" v-if="false">Buscar</md-button> -->
            <md-progress md-indeterminate></md-progress>
            </md-layout>

            <md-input-container v-if="accessGranted">
              <md-icon>people</md-icon>
              <label><strong style="color: gray;">Contrato</strong></label>
              <md-input v-model="contrato" :maxlength="8"></md-input>
            </md-input-container>
          </md-layout>

          <md-layout v-if="accessGranted" md-flex="30" md-align="left"  style="margin:25px;">
            <b-input-group size="sm">
              <b-form-select :disabled="!pagoDisabled" v-model="selectPago" :options="pagos" class="w-75">
            </b-form-select>
            </b-input-group>
          </md-layout>

      </md-layout>

			</md-card-content>


      <md-card-content>

      <md-layout md-flex="100" class="md-scrollbar" style="height:420px; overflow-y: scroll;" >

      <md-layout v-if="firstPayment != null" md-flex="100" md-align="center">
        
        <md-table>
          <md-table-row style="background: #FEC342; opacity: .8">
            <md-table-cell><h5 style="color: #003399;">No. Pago</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Fecha Limite de Pago</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Abono Principal</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Prima Seguro</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Intereses Ordinarios</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">IVA Intereses Ordinarios</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Intereses Moratorios</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">IVA Intereses Moratorios</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Monto Pago</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Saldo Insoluto Capital</h5></md-table-cell>
          </md-table-row>

          <md-table-row style="background: #c9daf8; opacity: .8">
            <md-table-cell><h4>{{ firstPayment.noPago }}</h4></md-table-cell>
            <md-table-cell><h4>{{ firstPayment.limitePago.substring(0,10) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.principal) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.primaSeguro) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.interesesOrdinarios) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.ivaInteresesOrdinarios) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.interesesMoratorios) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.ivaInteresesMoratorios) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.montoPago) }}</h4></md-table-cell>
            <md-table-cell><h4>${{ formatMoney(firstPayment.saldoCapitalInsoluto) }}</h4></md-table-cell>
          </md-table-row>
        </md-table>
      </md-layout>

      <md-layout v-if="firstPayment != null" md-flex="100" md-align="left" style="margin-top:25px;">
        <md-table>
          <md-table-row style="background: #FEC342; opacity: .8">
            <md-table-cell><h5 style="color: #003399;">Número de Cliente</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Nombre Cliente</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">% de Participación</h5></md-table-cell>
            <md-table-cell><h5 style="color: #003399;">Monto Pago</h5></md-table-cell>
          </md-table-row>

          <template v-for="(integ, index) in firstPayment.desgloseIndividual">
            <md-table-row v-if="index % 2 != 0" style="background: #c9daf8; opacity: .8" :key="integ.numeroCliente">
              <md-table-cell><h5>{{ integ.numeroCliente }}</h5></md-table-cell>
              <md-table-cell><h5>{{ integ.nombre }}</h5></md-table-cell>
              <md-table-cell><h5>{{ integ.porcentajeParticipacion }}</h5></md-table-cell>
              <md-table-cell><h5>${{ formatMoney(integ.montoPago) }}</h5></md-table-cell>
            </md-table-row>
            <md-table-row v-if="index % 2 == 0" style="opacity: .8;" :key="integ.numeroCliente">
              <md-table-cell><h5>{{ integ.numeroCliente }}</h5></md-table-cell>
              <md-table-cell><h5>{{ integ.nombre }}</h5></md-table-cell>
              <md-table-cell><h5>{{ integ.porcentajeParticipacion }}</h5></md-table-cell>
              <md-table-cell><h5>${{ formatMoney(integ.montoPago) }}</h5></md-table-cell>
            </md-table-row>
          </template>
        </md-table>

      </md-layout>

      </md-layout>

			</md-card-content>

              
      <!--<md-card-content>
        <md-layout v-if="selectVisita != 'Selecciona visita'" md-gutter md-flex="100" md-align="center">
          <md-layout md-flex="25" md-align="left">
            <md-button @click="createPDF()" md-icon="home" class="button md-accent" style="background:#0055a0; margin-bottom:15px;">
              <md-icon>picture_as_pdf</md-icon>  Descargar pdf
            </md-button>
          </md-layout>
        </md-layout>
      </md-card-content>-->

  </div>
</template>

<script>
  import axios from 'axios'
  import {appStrings} from '../values/strings';

  import {db} from '../firebaseref/fb';
    import {getUsuarioLoginPath} from '../firebaseref/FirebasePaths';
    import {getUsuarioLogedPath} from '../firebaseref/FirebasePaths';
    //import Reporte from "../components/Reporte";

	var firebase = require('firebase');


  var jsPDF = require('jspdf');
  require('jspdf-autotable');

  export default {
    components: {
    },
    watch:{
      contrato: function(val){
        var self = this
        console.log(val)
        if(val.trim().length == 8){ 
          this.consultarAmortizaciones(val)
        }else{
          self.responseAmortizacion = null
          self.pagoDisabled = false;
          self.firstPayment = null
          self.selectPago = 'Selecciona pago'
          self.pagos = ['Selecciona pago']
        }
      },
      selectPago: function(val){
        var self = this;
        console.log(val)
        for(var element in self.responseAmortizacion){
          console.log(self.responseAmortizacion[element].noPago)
          if(self.responseAmortizacion[element].noPago == val){
            self.firstPayment = self.responseAmortizacion[element]
          }
        }
        if(val == "Selecciona pago"){
          self.firstPayment = null
        }
      }
    },
    data() {
      return {
        visitasContrato: [],
        numPagoSelected: 'pago_0',
        numVisitaSelected: 0,
        visitaSelected: [],
        integVisitaSelected: [],
        sortDesc: false,
        selectMode: 'single',
        dialogTableVisible: false,
        user: null,
        contrato: null,
        pagos: ['Selecciona pago'],
        selectPago: 'Selecciona pago',
        visitas: ['Selecciona visita'],
        selectVisita: 'Selecciona visita',
        progress: false,
        sucursalesSorted: [],
        sucursalesfb: [],
        suc: null,
        sucursalDisabled: false,
        sucursal: [],
        sucursalNom: '',
        sucursales: [],
        asesores: [],
        pagoDisabled: false,
        visitaDisabled: false,
        center: null,
        markers: [],
        accessGranted: false,
        mapOptions: {
          mapTypeControl: true,
        },
        contratoActual: [],
        todos: [],
        asesorActual: '',
        dataHeader: [],
        dataHeader2: [],
        dataFooter: [],
        nombreAsesor: '',

        responseAmortizacion: null,
        firstPayment: null
      }
    },
    methods: {
      consultarAmortizaciones(contrato){
        console.log('Peticion Amortizaciones')
        var self = this

        axios.post("http://localhost:8080/amortizacionesEdoCta/cloud/GetAmortizacionIndividual", contrato)
          .then(response => {
            var status = response.status
            console.log(status)
            if(status == 200)
            {
              var val = response.data
              console.log(val)
              self.responseAmortizacion = response.data
              //self.firstPayment = self.responseAmortizacion[0]

              self.selectPago = 'Selecciona pago'; 
              for(var element in self.responseAmortizacion){
                self.pagos.push(self.responseAmortizacion[element].noPago);
              }
              self.pagoDisabled = true;
            }else{
              console.log("Respuesta amortizaciones: " + response)
              self.pagoDisabled = false;
              self.firstPayment = null
              self.selectPago = 'Selecciona pago'
              self.pagos = ['Selecciona pago']
            }

          })
          .catch(e => {
            console.log(e)
          })
 
      },
        formatMoney(number, decPlaces, decSep, thouSep){
          decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
          decSep = typeof decSep === "undefined" ? "." : decSep;
          thouSep = typeof thouSep === "undefined" ? "," : thouSep;
          var sign = number < 0 ? "-" : "";
          var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
          var j = (j = i.length) > 3 ? j % 3 : 0;

          return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
        },
        exported(event) {
          console.log(event)
          this.isExported = true
          setTimeout(() => {
            this.isExported = false
          }, 3 * 1000)
      },
      onWatchAsesoresDialog(latitud, longitud){
        const marker = {
          lat: latitud,
          lng: longitud
        };
        this.markers[0] = ({ position: marker });
        this.center = marker;
      },
      createPDF () {
        var self = this;
        var columns = [
          {title: "No Cte", dataKey: "noPersona"},
          {title: "Nombre Cliente", dataKey: "nombre"},
          {title: "Asistió", dataKey: "asistencia"},
          {title: "Parcialidad", dataKey: "parcialidad"},
          {title: "Pago", dataKey: "pago"},
          {title: "Solidario", dataKey: "solidario"},
          {title: "Ahorro", dataKey: "ahorro"},
          {title: 'Rol', dataKey: "rol"},
          {title: 'Participación %', dataKey: "participacion"}
        ];
        var columns2 = [
          {title: 'No. Contrato', dataKey: 'noContrato'},
          {title: 'Sucursal', dataKey: 'sucursal'},
          {title: '¿Quién visitó?', dataKey: 'noPersonaVisita'}
        ];
        var columns3 = [
          {title: "Monto Entregado", dataKey: "montoOtorgado"},
          {title: "Nombre Grupo", dataKey: "nombre"},
          {title: "Fecha Visita", dataKey: "fechaVisita"},
          {title: "Hora Inicio", dataKey: "horaInicioFormated"},
          {title: "Hora Fin", dataKey: "horaFinFormated"},
          {title: "Frecuencia Pago", dataKey: "frecuencia"},
          {title: 'No. Pago', dataKey: 'noPago'},
          {title: 'No. Visita', dataKey: 'noVisita'},
          {title: "Monto Parcialidad", dataKey: "montoPago"}
        ];
        var columns4 = [
          {title: 'Total Recaudado', dataKey: 'montoRecaudado'},
          {title: 'Recaudación Esperada', dataKey: 'totalParcialidad'},
          {title: 'Monto Faltante', dataKey: 'montoFaltante'},
          {title: 'No. Asistentes', dataKey: 'numAsistentes'},
          {title: 'Lat - Lng', dataKey: 'lat-lng'}
        ];
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(8);
        var text = 'Resumen de recaudación';
        var xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2); 
        doc.text(text, xOffset, 64);
        
        doc.addImage(appStrings.imageFinsol, 'JPEG', 40, 25, 80, 40)

        doc.text(appStrings.leyendaDeConfidencialidad, 45, 780);
        doc.text(appStrings.leyendaDeConfidencialidad2, 45, 790);
        doc.autoTable(columns2, self.dataHeader, {
          margin: {top: 85, bottom: 15},
          styles: {overflow: 'linebreak',fontSize: 6}});
        doc.autoTable(columns3, self.dataHeader2, {
          margin: {top: 25, bottom: 15},
          styles: {overflow: 'linebreak',fontSize: 6}});
        doc.autoTable(columns, self.todos, {
          margin: {top: 25, bottom: 15},
          styles: {overflow: 'linebreak',fontSize: 6}});
        doc.autoTable(columns4, self.dataFooter, {
          margin: {top: 25, bottom: 15},
          styles: {overflow: 'linebreak',fontSize: 6}});
        doc.save("Reporte.pdf");
      },

    },
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
                        //self.alertDialog(appStrings.noAuth);
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
                      console.log("Error")
                    }
                }, function(error) {
                    self.alertDialog(appStrings.conexionFail);
                    console.log(error)
                });

    }
  }
</script>