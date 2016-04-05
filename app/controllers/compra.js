var args = arguments[0] || {};
var nativecontrols = require("learnappcelerator.nativecontrols");

$.proveedortext.addEventListener('click', function(e) {
	Ti.API.info('apareciendo coso');

	$.tablaproveedortemporal.top = "0";
});
var cosovariable=0;
var respuestachecktipo = 1;

$.tablaproveedortemporal.top = "-10000"
$.distribuirtemporalpopup.top = "-10000"
$.distribucionpopup.top = "-10000"

function cancelarpopupdistriburtemp() {
	$.distribuirtemporalpopup.top = "-1000px"

}

function distribuirindipop() {
	$.distribuirtemporalpopup.top = "0"
}

function cerrarproveedorpop() {
	Ti.API.info('Cerrando coso');

	$.tablaproveedortemporal.top = "-10000";

}

var db = Ti.Database.open('ekosoftdos')
var row = db.execute('SELECT count(*) as HowMany from compra_productosedfy');

db.close();

var searchproveedor = Titanium.UI.createSearchBar({

	showCancel : true,
	hintText : 'Buscar proveedor',
	color : "#007400"
});
var tableproveedor = Ti.UI.createTableView({
	objName : 'table',
	search : searchproveedor,
	filterAttribute : 'nombres_proveedor' // FIlter By its Name

});

function comprarproductooffline() {

	/*nombre= e.source.nombre;
	 presentacion=e.source.presentacion;
	 idproducto=e.source.idproducto;
	 idpresentacion=e.source.idpresentacion;
	 compra_completado=e.source.compra_completado;
	 distribucion_completado=e.source.distribucion_completado  ;*/
	$.cantidadcompraoffline.value = cantidad;
	$.titulopopcomprados.text = nombre + " " + presentacion;
	$.titulopopcomprares.text = nombre + " " + presentacion;

	$.popucomprarprodutopop.top = "0";
	$.contenedorcomprafitst.top = "0";
	$.contsecondpopp.top="-1000"

}

function cerrarpopproductoeditar() {
	
	$.contsecondpopp.top = "-10000";

	$.contenedorcomprafitst.top = "-10000";

	$.resultadocomprapopup.top = "0";
	//	removeChildrensdos($.resultadocomprapopup);

	llenarproductcarros();
	$.contadorproductostext.text = "Se han comprado " + (cantidaddistribucionemporal-totalcantidaddistribuida ) + " producto";

}

var tabledistribucion = Ti.UI.createTableView({
	objName : 'table',

});
$.bodydistribucion.add(tabledistribucion);
var almacenestemporales = {};

function ingresarproveedores(respuesta) {
	
		
	
if(!!respuesta){
	var db = Ti.Database.open('ekosoftdos');

	for (var i = 0; i < respuesta.length; i++) {
		db.execute('INSERT INTO tabladistridos (cantidaddistribuir,cantidad_sugerida_pca,idpedidocompra,idpresentacion,id_producto,id_almacen,nombrealmacen,idpedidonormal) VALUES (?,?,?,?,?,?,?,?)', 0, respuesta[i].cantidad_sugerida_pca, respuesta[i].idpedidocompra, idpresentacion, idproducto, respuesta[i].idalmacen, respuesta[i].nombre_almacen, idpedidocompra);
	};
	
	db.close();
}else{
	
	
	
	
	var arrayalmacenes=[];
		//console.log("insetar");
	//arrayalmacenes.push({id: rowsg.fieldByName('idalmacen'),nombre: rowsg.fieldByName('nombre_almacen')});
		var db = Ti.Database.open('ekosoftdos');

		for (var i=0; i < Alloy.Globals.almacenes.length; i++) {
			console.log(JSON.stringify(Alloy.Globals.almacenes[i]));
		  
		  var radominiorogert= Math.random(1,121212);
			db.execute('INSERT INTO tabladistridos (cantidaddistribuir,cantidad_sugerida_pca,idpedidocompra,idpresentacion,id_producto,id_almacen,nombrealmacen,idpedidonormal) VALUES (?,?,?,?,?,?,?,?)', 0, 0, radominiorogert, idpresentacion, idproducto, Alloy.Globals.almacenes[i].id, Alloy.Globals.almacenes[i].nombre_almacen, idpedidocompra);

		  
		};


	db.close();
	
}
	
	
	
	
	
	
		

}

var idpedido = 0;
var cantidad = 0;
var noombrealmacen = "";
var cantidadtemporal = 0;
var cantidaddistribucionemporal = 0;
function distribuirprimero() {
	var db = Ti.Database.open('ekosoftdos')
	var rows = db.execute('SELECT * from compra_productosedfy where id_pedido_compra="' + idpedidocompra + '"');
	cantidaddistribucionemporal = 0;
	var indice = 0;
	while (rows.isValidRow()) {

		cantidaddistribucionemporal = cantidaddistribucionemporal + (parseInt(rows.fieldByName('cantidad_comprada')))

		indice++;
		rows.next();
	}
		rows.close();

	db.close();

	var db = Ti.Database.open('ekosoftdos')

	var row = db.execute('SELECT count(*) as HowMany from tabladistridos where   idpedidonormal = "' + idpedidocompra + '"');

	if (row.fieldByName('HowMany') == 0) {
		ingresarproveedores(almacenestemporales);

	}
		row.close();

	db.close();
	cargardistribucion();
}

var totalfinalizacionprueba = 0;

var totalcantidaddistribuida = 0;
function calculartitulo() {

	var totalfinalizacion = (cantidaddistribucionemporal - totalcantidaddistribuida);

	var totalporcentaje = ((cantidaddistribucionemporal - totalcantidaddistribuida) / cantidaddistribucionemporal) * 100
	totalfinalizacionprueba = totalfinalizacion;
	$.nombrepopcoso.text = nombre + "  " + Math.round((100 - totalporcentaje)) + " % distribuido  Cantidad a distribuir " + totalfinalizacion;
cosovariable=Math.round((100 - totalporcentaje));
	$.titulodisgen.text = "Se ha distribuido el  " + Math.round((100 - totalporcentaje)) + " % de las compras";
	
}

function cargardistribucion() {
	
	console.log("aqui mano esta la cosa");
	$.distribucionpopup.top = "0"
	var tableData = [];

	totalcantidaddistribuida = 0;
	var resultado = "";
	var i = 0;
	
	var db = Ti.Database.open('ekosoftdos'); 
		
	var rows = db.execute('SELECT * from tabladistridos where idpedidonormal = "' + idpedidocompra + '"');


	while (rows.isValidRow()) {


		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 60,

		});

		var wrapergeneral = Ti.UI.createView({
			backgroundColor : '#F5F5F5',
			objName : 'enabledWrapperView',
			rowID : i,
			width : Ti.UI.FILL,
			height : '100%'
		});

		var viewlabel = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : "90%",
			height : '80%',

		});
		wrapergeneral.add(viewlabel);

		var nombre_producto = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombrealmacen'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabel.add(nombre_producto);

		var cantidadrequerida = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('cantidad_sugerida_pca'),
			touchEnabled : false,
			left : "30%",
			width : 200
		});
		viewlabel.add(cantidadrequerida);

		var cantidaddistribuida = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('cantidaddistribuir'),
			touchEnabled : false,
			left : "60%",
			width : 200
		});
		viewlabel.add(cantidaddistribuida);

		totalcantidaddistribuida = totalcantidaddistribuida + parseInt(rows.fieldByName('cantidaddistribuir'));

		console.log(" cosiampiro " + rows.fieldByName('idalmacen'));

		var aButton = Ti.UI.createButton({
			title : 'Distribuir',
			right : 10,
			height : "30",
			backgroundColor : "#007400",
			font : {
				fontFamily : 'HelveticaNeue-Bold',
				fontSize : '15',
				fontWeight : 'bold'
			},
			cantidad : rows.fieldByName('cantidad_sugerida_pca'),
			idpedido : rows.fieldByName('id'),
			noombrealmacen : rows.fieldByName('nombrealmacen')
		});

		// Add to the parent view.
		viewlabel.add(aButton);

		var cantitempodistribuir = 0;
		aButton.addEventListener('click', function(e) {

			$.cantidaddistribuir.value = "";
			$.cantidadtemporal.text = "";
			idpedido = e.source.idpedido;
			cantidad = e.source.cantidad;
			noombrealmacen = e.source.noombrealmacen;
			cantitempodistribuir = cantidaddistribucionemporal
			$.cantidadtemporal.text = totalfinalizacionprueba;

			distribuirindipop();
		});

		wrapergeneral.add(viewlabel);

		row.add(wrapergeneral);
		tableData.push(row);

		rows.next();
		i++;
	}
		rows.close();

	db.close();
	tabledistribucion.setData(tableData);
	calculartitulo()

}

function guardarcompratempral() {

	var cantidadtemporal = parseInt($.cantidadtemporal.text)
	var cantidaddistribuir = parseInt($.cantidaddistribuir.value)

	if (cantidaddistribuir <= totalfinalizacionprueba) {
		var db = Ti.Database.open('ekosoftdos');
		
		
		console.log("id del pedido mano"+idpedido);
		if (!!$.cantidaddistribuir.value) {
			db.execute('UPDATE tabladistridos SET cantidaddistribuir=? WHERE id=?', $.cantidaddistribuir.value, idpedido);
			db.close();
			cargardistribucion();

		} else {
			alert("Seleccione cantidad a distribuir")
			return false
		}
		calculartitulo();
	} else {
		alert("La cantidad es superior a la disponible")
	}

	$.distribuirtemporalpopup.top = "-10000";
}

function verificarproveedores() {

	var tableData = [];

	var resultado = "";
	var db = Ti.Database.open('ekosoftdos');

	var rows = db.execute('SELECT * from proveedorestad');

	var i = 0;
	while (rows.isValidRow()) {
		//Alloy.Globals.arraytemporal = ;

		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 60,
			nombres_proveedor : rows.fieldByName('nombres_proveedor'),
			id : rows.fieldByName('idproveedor'),

		});

		var wrapergeneral = Ti.UI.createView({
			backgroundColor : '#F5F5F5',
			objName : 'enabledWrapperView',
			rowID : i,
			width : Ti.UI.FILL,
			height : '100%'
		});

		var viewlabel = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : 200,
			height : '80%',
			left : "5%"
		});
		wrapergeneral.add(viewlabel);

		var nombre_producto = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombres_proveedor'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabel.add(nombre_producto);

		wrapergeneral.add(viewlabel);

		row.add(wrapergeneral);
		tableData.push(row);

		rows.next();
		i++;
	}
			rows.close();

	db.close();

	tableproveedor.setData(tableData);

}

tableproveedor.addEventListener('click', function(e) {
	if (e.source && e.source.objName !== 'table') {
		var row = e.row;
		$.proveedortext.value = row.nombres_proveedor;
		$.proveedortext.idpro = row.id;

		if (row.id == 260) {
			$.contenedornombresegudo.opacity = 1;
			$.datosextrasegundo.opacity = 1;

		} else {

			$.contenedornombresegudo.opacity = 0;
			$.datosextrasegundo.opacity = 0;
		}

		$.tablaproveedortemporal.top = "-10000";
	}
});

$.contenedortabalproveedorestempreaobody.add(tableproveedor);

var nombre_proveedor = Ti.UI.createLabel({
	color : '#007400',
	objName : 'label',
	text : "PROVEEDOR",
	touchEnabled : false,
	left : "5%",
	width : 200
});
$.headertabla.add(nombre_proveedor);

var presentacion = Ti.UI.createLabel({
	color : '#007400',
	objName : 'label',
	text : "PRESENTACION",
	touchEnabled : false,
	left : "38%",
	width : 200
});

$.headertabla.add(presentacion);

var cantidad = Ti.UI.createLabel({
	color : '#007400',
	objName : 'label',
	text : "CANTIDAD",
	touchEnabled : false,
	right : "15%",
	width : 100
});
$.headertabla.add(cantidad);

var tipopagoradio = nativecontrols.createRadioGroup({
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	textColor : "#000000",
	selectedIndex : 0,

	layoutType : "vertical",
	buttons : [
	{
		id : 1,
		text : 'Contado'
	}
	, {
		id : 2,
		text : 'Crédito'
	}, {
		id : 3,
		text : 'Cheque'
	}]
});
tipopagoradio.addEventListener('change', function(e) {
	respuestachecktipo = e.result.id;
console.log("tipopago"+respuestachecktipo);
	if (e.result.id == 3) {
		$.textchelke.opacity = "1";
	} else {
		$.textchelke.opacity = "0";

	}

});

var compraalmacenrespuesta = 1;

$.tipocontoles.add(tipopagoradio);

var compraalmacen = nativecontrols.createRadioGroup({
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	textColor : "#000000",
	selectedIndex : 0,
	layoutType : "vertical",
	buttons : [{
		id : 1,
		text : 'Si'
	}, {
		id : 2,
		text : 'No'
	}]
});

compraalmacen.addEventListener('change', function(e) {
	compraalmacenrespuesta = e.result.id;

});

$.resultacompraalmacen.add(compraalmacen);

var jsontemporal = JSON.parse(Alloy.Globals.arraytemporal);

function terminarsincompra() {
	$.contsecondpopp.top = "-10000";

	$.contenedorcomprafitst.top = "-10000";

	$.resultadocomprapopup.top = "0";
	//	removeChildrensdos($.resultadocomprapopup);
	$.contadorproductostext.text = "Se han comprado " + (cantidaddistribucionemporal-totalcantidaddistribuida ) + " producto";

	llenarproductcarros();

}

var promedioempaque = "";
var cantidadcompraoffline = "";
var costotal = "";
var respuesta = 0;

function guardarproveedor() {

	var db = Ti.Database.open('ekosoftdos');
	db.execute('INSERT INTO proveedorestad (idproveedor,nombres_proveedor,nuevo,cedula,telefono) VALUES (?,?,?,?,?)', 260, $.nombreproveedorcreacion.value, 1, $.cedulaproveedorcreacion.value, $.telefonoproveedorcreacion.value);
	db.close();

}

function guardarcomprapop() {

	if ($.proveedortext.idpro == 260) {
		guardarproveedor();

		$.proveedortext.idpro = 260;
		$.proveedortext.value = $.nombreproveedorcreacion.value;
		$.contenedornombresegudo.opacity = 0;
		$.datosextrasegundo.opacity = 0;
		$.nombreproveedorcreacion.value = 0;
		$.cedulaproveedorcreacion.value = 0;
		$.telefonoproveedorcreacion.value = 0;

	} else {
		idproveedor = $.proveedortext.idpro;

	}

	promedioempaque = $.promedioempaque.value;
	cantidadcompraoffline = $.cantidadcompraoffline.value;
	costotal = $.costotal.value;
	textchelke = $.textchelke.value;
	respuesta = respuesta;
	compraalmacenrespuesta:compraalmacenrespuesta;


	$.contsecondpopp.top = "-10000";
	$.contenedorcomprafitst.top = "-10000";
	$.resultadocomprapopup.top = "0";
	//		removeChildrensdos($.resultadocomprapopup);

	//llenarproductcarros();

	if (!!$.proveedortext.value) {

	}
	updatepedidocompra(true, idpedidocompra);

	createcomprapopup();
	generartabla();
}

function createcomprapopup() {
	
	
		
	
	var costocompratotal = $.costotal.value;
	//vecompraproduco();

	var db = Ti.Database.open('ekosoftdos');
	var costounidatiopresentacion = parseInt(costocompratotal) / cantidadcompraoffline;

	var costounitariokilo = costounidatiopresentacion / parseFloat(promedioempaque);
	db.execute('INSERT INTO compra_productosedfy (chequete,tipopago,nombre_presentacion,nombre_proveedor_compra,id_proveedor_compra,id_producto_compra,id_pedido_compra,factor_conversion,costo_total_presentacion,costo_unitario_presentacion,id_presentacion,costo_unitario_kilo,cantidad_comprada,compra_almacen) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',$.textchelke.value,respuestachecktipo, presentacion, $.proveedortext.value, $.proveedortext.idpro, idproducto, idpedidocompra, promedioempaque, parseInt(costocompratotal), costounidatiopresentacion, idpresentacion, costounitariokilo, cantidadcompraoffline, compraalmacenrespuesta);
	db.close();



	llenarproductcarros();


}

function vecompraproduco() {
	Ti.API.info(" seletecion");
	var db = Ti.Database.open('ekosoftdos');

	var row = db.execute('SELECT * from compra_productosedfy');

	while (row.isValidRow()) {
		Ti.API.info(" id_proveedor_compra " + row.fieldByName('id_proveedor_compra') + " id_producto_compra " + row.fieldByName('id_producto_compra') + " id_pedido_compra " + row.fieldByName('id_pedido_compra') + " factor_conversion " + row.fieldByName('factor_conversion') + " id_producto_compra " + row.fieldByName('id_producto_compra') + " costo_total_presentacion " + row.fieldByName('costo_total_presentacion') + " costo_unitario_presentacion " + row.fieldByName('costo_unitario_presentacion') + " completada_transaccion_efectivo " + row.fieldByName('completada_transaccion_efectivo') + " id_presentacion " + row.fieldByName('id_presentacion') + " costo_unitario_kilo " + row.fieldByName('costo_unitario_kilo') + " cantidad_comprada " + row.fieldByName('cantidad_comprada') + " compra_almacen " + row.fieldByName('compra_almacen'));

		row.next();
	}
			row.close();

	db.close();

}

function removeChildrensdos(views) {

	_.each(views.children, function(view) {
		views.remove(view);
	});
}

function volvertablahe() {
	$.contsecondpopp.top = "0";
	$.resultadocomprapopup.top = "-10000", $.popucomprarprodutopop.top = "-10000"
}

var tableproductosgeneral = Ti.UI.createTableView({
	objName : 'table',

});

function llenarproductcarros() {

	var tableData = [];

	var db = Ti.Database.open('ekosoftdos');
	var rows = db.execute('SELECT * from compra_productosedfy where id_pedido_compra="' + idpedidocompra + '"');

	var i = 0;
	while (rows.isValidRow()) {
		Ti.API.info('llenando_ ' + i);

		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 60,
			indice : i
		});

		var wrapergeneral = Ti.UI.createView({
			backgroundColor : '#F5F5F5',
			objName : 'enabledWrapperView',
			rowID : i,
			width : Ti.UI.FILL,
			height : '100%'
		});

		var viewlabel = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : "100%",
			height : '80%',
			left : "5%"
		});
		wrapergeneral.add(viewlabel);

		var nombre_proveedor = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombre_proveedor_compra'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabel.add(nombre_proveedor);

		var presentacion = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombre_presentacion'),
			touchEnabled : false,

			width : 200
		});

		viewlabel.add(presentacion);

		var cantidad = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('cantidad_comprada'),
			touchEnabled : false,
			right : "20%",
			width : 100
		});
		viewlabel.add(cantidad);

		// Create a Button.
		var cerrarbuttonpopcompra = Ti.UI.createButton({
			title : 'X',
			height : 40,
			width : 40,
			id : rows.fieldByName('id'),
			right : "10%",

			backgroundColor : "#007400",
			font : {
				fontFamily : 'HelveticaNeue-Bold',
				fontSize : '15',
				fontWeight : 'bold'
			},
		});

		// Listen for click events.
		cerrarbuttonpopcompra.addEventListener('click', function(e) {

			borrarcarro(e.source.id);
			llenarproductcarros();
		});

		viewlabel.add(cerrarbuttonpopcompra);

		wrapergeneral.add(viewlabel);

		row.add(wrapergeneral);
		tableData.push(row);
		rows.next();
		i++;
	}
			rows.close();

	db.close();
	Ti.API.info('terminado');

	tableproductosgeneral.setData(tableData);

	/*table.addEventListener('click', function(e) {
	 if (e.source && e.source.objName !== 'table') {
	 var row = e.row;
	 $.inputgeneralmod.value=row.nombre_producto;
	 $.inputgeneralmod.idpro=row.id;

	 $.tablaproductotemporal.top="-10000";
	 }
	 });*/

	$.tablaporddd.add(tableproductosgeneral);

}

var datacompra = [];
var id = 0;
var title = '';
verificarregsitroproducto();
verificarproveedores();
llenarpickerpresentacion();

Ti.App.addEventListener('cierrehijo', function() {
	$.ventajacompra.close();
})
function borrarcarro(id) {
	var dbs = Ti.Database.open('ekosoftdos');
	dbs.execute('DELETE FROM compra_productosedfy WHERE id=?', id);
	dbs.close();
}

function cerrarventana() {
	$.ventajacompra.close();
}

function atrassecondpopupd() {
	Ti.API.info('atras');
	$.contenedorcomprafitst.top = "0"
	$.contsecondpopp.top = "-10000";
}

function botonsiguientepop() {

	if (!!!$.cantidadcompraoffline.value) {
		alert("Seleccione cantidad compra");
		return false;
	}
	if (!!!$.costotal.value) {
		alert("Seleccione  costo total");
		return false;
	}
	if (!!!$.promedioempaque.value) {
		alert("Seleccione promedio empaque");
		return false;
	}

	$.contenedorcomprafitst.top = "-10000"
	$.contsecondpopp.top = 0;
}

var idpresentacionpicker = 0;
var nombrepresentacionpicker = "";
function verificarregsitroproducto() {

	var search = Titanium.UI.createSearchBar({

		showCancel : true,
		hintText : 'Buscar producto',
		color : "#007400"
	});
	var tableData = [];
	var table = Ti.UI.createTableView({
		objName : 'table',
		search : search,
		filterAttribute : 'nombre_producto' // FIlter By its Name

	});

	var resultado = "";
	var db = Ti.Database.open('ekosoftdos');

	var rows = db.execute('SELECT * from tabletproducto');

	var i = 0;
	while (rows.isValidRow()) {
		//Alloy.Globals.arraytemporal = ;

		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 60,
			nombre_producto : rows.fieldByName('nombre_producto'),
			id : rows.fieldByName('id'),

		});

		var wrapergeneral = Ti.UI.createView({
			backgroundColor : '#F5F5F5',
			objName : 'enabledWrapperView',
			rowID : i,
			width : Ti.UI.FILL,
			height : '100%'
		});

		var viewlabel = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : 200,
			height : '80%',
			left : "5%"
		});
		wrapergeneral.add(viewlabel);

		var nombre_producto = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombre_producto'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabel.add(nombre_producto);

		wrapergeneral.add(viewlabel);

		row.add(wrapergeneral);
		tableData.push(row);

		rows.next();
		i++;
	}
	db.close();

	table.setData(tableData);

	table.addEventListener('click', function(e) {
		if (e.source && e.source.objName !== 'table') {
			var row = e.row;
			$.inputgeneralmod.value = row.nombre_producto;
			$.inputgeneralmod.idpro = row.id;

			$.tablaproductotemporal.top = "-10000";
		}
	});

	$.contenedortabalproductotempreaobody.add(table);

}

$.presentacionpicker.addEventListener('change', function(e) {


	idpresentacionpicker = e.row.idpresentacion;
	nombrepresentacionpicker = e.row.title;

});
var tableproductosgenerales = Ti.UI.createTableView({
	objName : 'table'
});

function updatepedidocompra(compra, id) {
	var db = Ti.Database.open('ekosoftdos');
	Ti.API.info("este es le bool" + compra + " y este es el id" + id);

	db.execute('UPDATE pedidos_de_comprasddadsde SET compra_completado=? WHERE idpedido=?', compra, id);
	db.close();

}

function updatepedidodistribucion(distribucion, id) {
	var db = Ti.Database.open('ekosoftdos');

	db.execute('UPDATE pedidos_de_comprasddadsde SET distribucion_completado=? WHERE idpedido=?', distribucion, id);
	db.close();

}

var nombre = "";
var presentacion = "";
var idproducto = "";
var idpresentacion = "";
var compra_completado = "";
var distribucion_completado = "";
var cantidad = "";

var idpedidocompra = "";

function agregarpruductotabla() {
	if (!!$.inputgeneralmod.value) {

		if (!!!$.cantidadmod) {
			alert("Seleccionar cantidad");
			return false;
		}

		if (idpresentacionpicker == 0) {
			alert("Seleccionar presentacion");
			return false;
		}

		var db = Ti.Database.open('ekosoftdos');

var randomm= Math.random(1,2589341454);

		db.execute('INSERT INTO pedidos_de_comprasddadsde (id_producto_pc,id_grupo_compra_pc,productonombre,compra_completado,distribucion_completado,presentacion,idpresentacion,cantidad,idpedido) VALUES (?,?,?,?,?,?,?,?,?)', $.inputgeneralmod.idpro, Alloy.Globals.grupodecompra, $.inputgeneralmod.value, false, false, nombrepresentacionpicker, idpresentacionpicker, $.cantidadmod.value,randomm);
		db.close();

		$.inputgeneralmod.value = "";
		$.cantidadmod.value = "";
		$.presentacionpicker.value = 0;
		$.presentacionpicker.setSelectedRow(0, 0, false);

		$.popupcomprapop.top = "-10000";
		generartabla();

	}else{
		alert("Seleccione producto")
	}
	///aqui
}

function parseBool(b) {
	return !(/^(false|0)$/i).test(b) && !!b;
}

function generartabla() {

	var tableData = [];
	var db = Ti.Database.open('ekosoftdos');

	var rows = db.execute('SELECT * from pedidos_de_comprasddadsde order by productonombre asc');
	var i = 0;
	while (rows.isValidRow()) {

		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row' + i,
			touchEnabled : true,
			height : 80,
			nombre : rows.fieldByName('productonombre'),
			title : rows.fieldByName('presentacion'),
			idproducto : rows.fieldByName('id_producto_pc'),
			idpresentacion : rows.fieldByName('idpresentacion')

		});

		var wrapergeneral = Ti.UI.createView({
			backgroundColor : '#F5F5F5',
			objName : 'enabledWrapperView' + i,
			rowID : i,
			width : Ti.UI.FILL,
			height : '100%'
		});

		var viewlabel = Ti.UI.createView({
			objName : 'viewlabel' + i,
			touchEnabled : false,
			width : 300,
			height : '80%',
			left : "5%",
		});
		wrapergeneral.add(viewlabel);

		var label = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('productonombre') + " " + rows.fieldByName('presentacion'),
			touchEnabled : false,
			left : 0,
			width : 300
		});
		viewlabel.add(label);

		var viewlabelcantidad = Ti.UI.createView({
			objName : 'viewlabel' + i,
			touchEnabled : false,
			width : 35,
			height : 25,
			left : "59%",
			backgroundColor : "#b6d7a8"
		});
		wrapergeneral.add(viewlabelcantidad);

		// Create a Label.
		var repuestacomprar = "";
		if (parseBool(rows.fieldByName('compra_completado'))) {
			repuestacomprar = "✔";
		} else {
			repuestacomprar = " ";
		}
		var labelcompra = Ti.UI.createLabel({
			text : repuestacomprar,
			color : '#007400',
			font : {
				fontSize : 20
			},

			textAlign : 'center'
		});

		/*		var checkcompra = Ti.UI.createSwitch({
		 style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		 value:rows.fieldByName('compra_completado'),
		 left:0,
		 width : '100%',
		 idrow:rows.fieldByName('id')

		 });
		 checkcompra.addEventListener('change',function(e){
		 updatepedidodistribucion(e.source.value,e.source.idrow);

		 });*/

		viewlabelcantidad.add(labelcompra);

		var viewlabelempaque = Ti.UI.createView({
			objName : 'viewlabel' + i,
			touchEnabled : false,
			width : 35,
			height : 25,
			backgroundColor : "#b6d7a8",
			left : "69%"
		});
		wrapergeneral.add(viewlabelempaque);

		var respuestadistribuir = "";
		if (parseBool(rows.fieldByName('distribucion_completado'))) {
			respuestadistribuir = "✔";
		} else {
			respuestadistribuir = " ";
		}

		var labeldistribuir = Ti.UI.createLabel({
			text : respuestadistribuir,
			color : '#007400',
			font : {
				fontSize : 20
			},

			textAlign : 'center'
		});

		/*var checkdistribuidor = Ti.UI.createSwitch({
		 style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		 value:rows.fieldByName('distribucion_completado'),
		 left:0,
		 width : '100%',
		 idrow:rows.fieldByName('id')
		 });

		 checkdistribuidor.addEventListener('change',function(e){

		 updatepedidocompra(e.source.value,e.source.idrow);

		 });*/

		viewlabelempaque.add(labeldistribuir);

		var viewbotoncomprar = Ti.UI.createView({
			objName : 'viewlabel' + i,
			touchEnabled : false,
			width : 150,
			height : '80%',
			right : "5%",

		});
		wrapergeneral.add(viewbotoncomprar);

		// Create a Button.
		var modificarboton = Ti.UI.createButton({
			title : 'MODIFICAR',
			width : "150",
			backgroundColor : "#007400",
			font : {
				fontFamily : 'HelveticaNeue-Bold',
				fontSize : '15',
				fontWeight : 'bold'
			},
			nombre : rows.fieldByName('productonombre'),
			presentacion : rows.fieldByName('presentacion'),
			idproducto : rows.fieldByName('id_producto_pc'),
			idpedidocompra : rows.fieldByName('idpedido'),
			idpresentacion : rows.fieldByName('idpresentacion'),
			compra_completado : rows.fieldByName('compra_completado'),
			distribucion_completado : rows.fieldByName('distribucion_completado'),
			cantidad : rows.fieldByName('cantidad'),
			promedioempaque : rows.fieldByName('promedio'),
			almacenes : rows.fieldByName('almacenes')
		});

		// Listen for click events.
		modificarboton.addEventListener('click', function(e) {
			cantidadtemporal = e.source.cantidad
			$.nombrepopcoso.text = e.source.nombre + " 0 % distribuido  Cantidad a distribuir 30";
			almacenestemporales = JSON.parse(e.source.almacenes);
console.log(JSON.stringify(e.source.almacenes));
			$.popupcomprapopmodificar.top = "30%";

			$.inputgeneralmod.value = "";
			$.cantidadmod.value = "";
			$.costotal.value = "";
			$.presentacionpicker.value = 0;
			$.presentacionpicker.setSelectedRow(0, 0, false);
			$.proveedortext.value = "";
						$.promedioempaque.value = promedioempaque;

			nombre = e.source.nombre;
			presentacion = e.source.presentacion;
			idproducto = e.source.idproducto;
			idpresentacion = e.source.idpresentacion;
			compra_completado = e.source.compra_completado;
			distribucion_completado = e.source.distribucion_completado;
			cantidad = e.source.cantidad;
			promedioempaque = e.source.promedioempaque;
			idpedidocompra = e.source.idpedidocompra;

			var db = Ti.Database.open('ekosoftdos')
			var rows = db.execute('SELECT * from compra_productosedfy where id_pedido_compra="' + idpedidocompra + '"');
			cantidaddistribucionemporal = 0;
			var indice = 0;
			while (rows.isValidRow()) {

				cantidaddistribucionemporal = cantidaddistribucionemporal + (parseInt(rows.fieldByName('cantidad_comprada')))

				indice++;
				rows.next();
			}
							rows.close();

	db.close();

			totalcantidaddistribuida = 0;
			var db = Ti.Database.open('ekosoftdos')
			var rows = db.execute('SELECT * from tabladistridos  where idpedidonormal = "' + idpedidocompra + '"');
			var indice = 0;
			while (rows.isValidRow()) {

				totalcantidaddistribuida = totalcantidaddistribuida + parseInt(rows.fieldByName('cantidaddistribuir'));

				indice++;
				rows.next();
			}
							rows.close();

	db.close();

			if (cantidaddistribucionemporal != 0) {
				var totalporcentaje = ((cantidaddistribucionemporal - totalcantidaddistribuida) / cantidaddistribucionemporal) * 100;
				var totalfindelaoperacion = Math.round((100 - totalporcentaje))

			} else {
				totalfindelaoperacion = 0;

			}

			//$.titulodisgen.text="Se ha distribuido el  "+Math.round((100-totalporcentaje))+" % de las compras";

			$.titulodisgen.text = "Se ha distribuido el  " + totalfindelaoperacion + " % de las compras";
		cosovariable=totalfindelaoperacion ;
			$.contadorproductostext.text = "Se han comprado " + (cantidaddistribucionemporal-totalcantidaddistribuida ) + " producto";

		});

		viewbotoncomprar.add(modificarboton);

		row.add(wrapergeneral);
		tableData.push(row);
		rows.next();

		i++;
	}
	db.close();

	tableproductosgenerales.setData(tableData);
	$.tablapedido.add(tableproductosgenerales);

	var labenomreproducto = Ti.UI.createLabel({
		color : '#007400',
		objName : 'NOMBREPRODUTO',
		text : "NOMBRE PRODUCTO",
		touchEnabled : false,
		left : "5%",
		width : 200
	});

	$.tablapedidohead.add(labenomreproducto)

	var labecantidad = Ti.UI.createLabel({
		color : '#007400',
		objName : 'C',
		text : "C",
		touchEnabled : false,
		left : "60%",
		width : 200
	});

	$.tablapedidohead.add(labecantidad)

	var labeempaque = Ti.UI.createLabel({
		color : '#007400',
		objName : 'D',
		text : "D",
		touchEnabled : false,
		left : "70%",
		width : 200
	});

	$.tablapedidohead.add(labeempaque)

	/*if(!!$.inputgeneralmod.value){

	 if(!!!$.cantidadmod){
	 alert("Seleccionar cantidad");
	 return false;
	 }

	 if(id==0){
	 alert("Seleccionar presentacion");
	 return false;
	 }

	 datacompra.push({nombre:$.inputgeneralmod.value,id:$.inputgeneralmod.idpro,idpresentacion:id,title:title});

	 for (var i = 0; i < datacompra.length; i++) {
	 var row = Ti.UI.createTableViewRow({
	 className : 'row',
	 objName : 'row',
	 touchEnabled : true,
	 height : 80,
	 nombre:datacompra[i].nombre,
	 title:datacompra[i].title,
	 idproducto:datacompra[i].id,
	 idpresentacion:datacompra[i].idpresentacion

	 });

	 var wrapergeneral = Ti.UI.createView({
	 backgroundColor : '#F5F5F5',
	 objName : 'enabledWrapperView',
	 rowID : i,
	 width : Ti.UI.FILL,
	 height : '100%'
	 });

	 var viewlabel = Ti.UI.createView({
	 objName : 'viewlabel',
	 touchEnabled : false,
	 width : 200,
	 height : '80%',
	 left : "5%"
	 });
	 wrapergeneral.add(viewlabel);

	 var label = Ti.UI.createLabel({
	 color : '#007400',
	 objName : 'label',
	 text : datacompra[i].nombre+" "+datacompra[i].title,
	 touchEnabled : false,
	 left : 0,
	 width : 200
	 });
	 viewlabel.add(label);

	 var viewlabelcantidad = Ti.UI.createView({
	 objName : 'viewlabel',
	 touchEnabled : false,
	 width : 200,
	 height : '80%',
	 left : "59%"
	 });
	 wrapergeneral.add(viewlabelcantidad);

	 var labelcantidad = Ti.UI.createSwitch({
	 style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	 textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	 value:true,
	 right : 0,
	 width : '100%',

	 });

	 viewlabelcantidad.add(labelcantidad);

	 var viewlabelempaque = Ti.UI.createView({
	 objName : 'viewlabel',
	 touchEnabled : false,
	 width : 300,
	 height : '80%',
	 left : "69%"
	 });
	 wrapergeneral.add(viewlabelempaque);
	 var labelempaque = Ti.UI.createSwitch({
	 right : 0,
	 width : '100%',
	 color : '#007400',
	 style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	 textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	 value:true,

	 });

	 viewlabelempaque.add(labelempaque);

	 var viewbotoncomprar = Ti.UI.createView({
	 objName : 'viewlabel',
	 touchEnabled : false,
	 width : 150,
	 height : '80%',
	 right : "5%",

	 });
	 wrapergeneral.add(viewbotoncomprar);

	 // Create a Button.
	 var modificarboton = Ti.UI.createButton({
	 title : 'MODIFICAR',
	 width : "150",
	 backgroundColor : "#007400",
	 font : {
	 fontFamily : 'HelveticaNeue-Bold',
	 fontSize : '15',
	 fontWeight : 'bold'
	 },
	 nombre : "arbeja"
	 });

	 // Listen for click events.
	 modificarboton.addEventListener('click', function(e) {

	 $.popupcomprapopmodificar.top="30%"

	 });

	 viewbotoncomprar.add(modificarboton);

	 row.add(wrapergeneral);
	 tableData.push(row);
	 }
	 ///aqui
	 }
	 tableproductosgenerales.setData(tableData);

	 tableproductosgenerales.addEventListener('swipe', function(e) {
	 if (e.source && e.source.objName !== 'table') {
	 Ti.API.info('Row swiped: ' + e.source);
	 Ti.API.info('Row swiped: ' + e.source.objName);
	 Ti.API.info('Row ID : ' + e.source.rowID);
	 }
	 });

	 $.tablapedido.add(tableproductosgenerales);
	 $.inputgeneralmod.value="";
	 $.cantidadmod.value="";
	 $.presentacionpicker.value = 0;
	 $.presentacionpicker.setSelectedRow(0, 0, false);

	 $.popupcomprapop.top="-10000"
	 */

}

$.inputgeneralmod.addEventListener('click', function(e) {
	$.tablaproductotemporal.top = 0;
});

function cerrarpopueditar() {
	$.popupcomprapopmodificar.top = "-10000"
}

function llenarpickerpresentacion() {
	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Seleccione presentacion',
		id : 0
	});
	//$.presentacionpicker.add(data);
	var cont = 1;
	for (var i = 0; i < (jsontemporal[0].presentacion.length); i++) {
		if (!!jsontemporal[0].presentacion[i].nombre_presentacion) {
			data[cont] = Ti.UI.createPickerRow({
				title : jsontemporal[0].presentacion[i].nombre_presentacion,
				idpresentacion : jsontemporal[0].presentacion[i].id
			});
		}

		cont++;

	};

	$.presentacionpicker.add(data);

}

function guardardistribucionpop() {

	var controller = Alloy.createController('actualizarprecios').getView();
	controller.open();
}

function agregarproducto() {

	$.popupcomprapop.top = "20%";

}

function guardarpedidocompra() {


	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['SI', 'NO'],
		message : 'Una ves guarde la lista de compra no podrá ingresar ni modificar productos de ella',
		title : '¿Esta seguro de guardar la lista de compra?'
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			Ti.API.info('The cancel button was clicked');
			
			
			
			
			return false;
		}
		
		
			
	var dbs = Ti.Database.open('ekosoftdos'); 
		
	var rows = dbs.execute('SELECT * from compra_productosedfy');

 var compras = [];
	while (rows.isValidRow()) {
		
		var obj = {
  		tipopago:rows.fieldByName('tipopago'),
  		id_proveedor_compra:rows.fieldByName('id_proveedor_compra'),
  		id_producto_compra:rows.fieldByName('id_producto_compra'),
  		id_pedido_compra:rows.fieldByName('id_pedido_compra'),
  		factor_conversion:rows.fieldByName('factor_conversion'),
  		costo_total_presentacion:rows.fieldByName('costo_total_presentacion'),
  		costo_unitario_presentacion:rows.fieldByName('costo_unitario_presentacion'),
  		completada_transaccion_efectivo:rows.fieldByName('completada_transaccion_efectivo'),
  		id_presentacion:rows.fieldByName('id_presentacion'),
  		costo_unitario_kilo:rows.fieldByName('costo_unitario_kilo'),
  		cantidad_comprada:rows.fieldByName('cantidad_comprada'),
  		compra_almacen:rows.fieldByName('compra_almacen'),
chequete:rows.fieldByName('chequete')

  	};
  		console.log("ddssssss")

  compras.push(obj);
		
		
		rows.next();
		
	}
		
		dbs.close();

			var dbv = Ti.Database.open('ekosoftdos'); 
		
	var rowsd = dbv.execute('SELECT * from tabladistridos');

 var distribucion = [];
	while (rowsd.isValidRow()) {

var obj = {
  		cantidaddistribuir:rowsd.fieldByName('cantidaddistribuir'),
  		cantidad_sugerida_pca:rowsd.fieldByName('cantidad_sugerida_pca'),
  		idpedidocompra:rowsd.fieldByName('idpedidocompra'),
  		idpresentacion:rowsd.fieldByName('idpresentacion'),
  		id_producto:rowsd.fieldByName('id_producto'),
  		id_almacen:rowsd.fieldByName('id_almacen'),
  		nombrealmacen:rowsd.fieldByName('nombrealmacen'),
  		idpedidonormal:rowsd.fieldByName('idpedidonormal'),
  	
  	};
  distribucion.push(obj);
		

		rowsd.next();
	console.log("preubassdf")
	}
			rowsd.close();

		dbv.close();


console.log(JSON.stringify(distribucion))
console.log(JSON.stringify(compras))

				
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
					
	//	var json = JSON.parse(this.responseText);
console.log(this.responseText);
	
	
	var db = Ti.Database.open('ekosoftdos');

	db.execute('DELETE FROM pedidos_de_comprasddadsde');
	db.execute('DELETE FROM tabladistridos');
	db.execute('DELETE FROM compra_productosedfy');



	db.close();
	
	$.ventajacompra.close();
	
	var controller = Alloy.createController('actualizarprecios').getView();
	controller.open();
	
	};
	xhr.open('POST', Alloy.Globals.url + '/enviarcompras');

	xhr.send({distribucion:JSON.stringify(distribucion),compras:JSON.stringify(compras)});



	});
	dialog.show();
}

$.tablaproductotemporal.top = "-100000";


function cerrarselectorproductos() {
	$.tablaproductotemporal.top = '-100000'
}

function cerrarpopuppecomprados(){
		$.popupcomprapop.top = "-10000";

}


function cerrarpopuppecompra() {
					var totalporcentaje = ((cantidaddistribucionemporal - totalcantidaddistribuida) / cantidaddistribucionemporal) * 100;
console.log("finalterminar "+cosovariable+" "+idpedidocompra)
	$.popupcomprapopmodificar.top = "-100000"
		if(cosovariable==100){
		updatepedidodistribucion(true, idpedidocompra) ;
	}else{
		updatepedidodistribucion(false, idpedidocompra) ;

	}
	generartabla();
	
}

function cerrarporpupcomprass() {
	$.distribucionpopup.top = "-100000"

}

generartabla();
