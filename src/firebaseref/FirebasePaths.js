var sha1 = require('sha1');


export const integrantesPath = "asesores_cartera/{{numAsesor}}/contratos/{{numContrato}}/integrantes";
export const usuarioLoginPath = "usuarios_login/{{usuarioID}}";
export const usuarioLogedPath = "usuarios/{{usuarioID}}";
export const sucursales = "sucursales";
export const oneSucursal = "sucursales/{{numSucursal}}";
export const asesoresCarteraContrato = "asesores_cartera/{{numAsesor}}/contratos/{{numContrato}}";
export const redOperativa = 'red_operativa';
export const asesorNombre = 'asesores_cartera/{{numAsesor}}/nombre';
export const asesorCartera = 'asesores_cartera/{{numAsesor}}';



export const numAsesorRegex = "{{numAsesor}}";
export const numContratoRegex = "{{numContrato}}";
export const fechaExportRegex = "{{fechaExport}}";
export const usuarioIdRegex = "{{usuarioID}}";
export const numSucursalRegex = "{{numSucursal}}";




Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

export const getIntegrantesPath = function(numAsesor, numContrato){
	return integrantesPath.replace(numAsesorRegex, numAsesor).replace(numContratoRegex, numContrato);
}

export const getUsuarioLoginPath = function(usuarioEmail){
	const usuarioId = sha1(usuarioEmail)
	return usuarioLoginPath.replace(usuarioIdRegex, usuarioId);
}

export const getUsuarioLogedPath = function(usuarioEmail){
	const usuarioId = sha1(usuarioEmail)
	return usuarioLogedPath.replace(usuarioIdRegex, usuarioId);
}

export const getSucursalesPath = function(){
	return sucursales;
}

export const getOneSucursalPath = function(numSucursal){
	return oneSucursal.replace(numSucursalRegex, numSucursal);
}

export const getAsesoresCarteraContratoPath = function(numAsesor, numContrato){
	return asesoresCarteraContrato.replace(numAsesorRegex, numAsesor).replace(numContratoRegex, numContrato);
}

export const getRedOperativaPath = function(){
	return redOperativa;
}

export const getAsesorCarteraPath = function(numAsesor){
	return asesorCartera.replace(numAsesorRegex, numAsesor);
}

export const getAsesorNombre = function(numAsesor){
	return asesorNombre.replace(numAsesorRegex, numAsesor);
}