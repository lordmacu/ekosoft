var args = arguments[0] || {};
var table = Ti.UI.createTableView({
		objName : 'table'
	});
generartabla();

var idproducto=0;
var jsontemporal = JSON.parse(Alloy.Globals.arraytemporal);
llenarpickerpresentacion();
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

	$.pickerempaques.add(data);

}




function generartabla() {
	var tableData = [];
	
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
		objName : 'CANTIDAD',
		text : "CANTIDAD",
		touchEnabled : false,
		left : "35%",
		width : 200
	});

	$.tablapedidohead.add(labecantidad)

	var labeempaque = Ti.UI.createLabel({
		color : '#007400',
		objName : 'NOMBREPRODUTO',
		text : "EMPAQUE",
		touchEnabled : false,
		left : "60%",
		width : 200
	});

	$.tablapedidohead.add(labeempaque)

var db = Ti.Database.open('ekosoftdos');

	var rows = db.execute('SELECT * from productopedidossde order by id_grupo_compra_producto,nombre_producto asc');

	var i = 0;
	while (rows.isValidRow()) {
		var row = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 80
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
			width : 300,
			height : '80%',
			left : "5%"
		});
		wrapergeneral.add(viewlabel);

		var label = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('nombre_producto'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabel.add(label);

		var viewlabelcantidad = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : 300,
			height : '80%',
			left : "35%"
		});
		wrapergeneral.add(viewlabelcantidad);

		var labelcantidad = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text : rows.fieldByName('cantidad'),
			touchEnabled : false,
			left : 0,
			width : 200
		});
		viewlabelcantidad.add(labelcantidad);

		var viewlabelempaque = Ti.UI.createView({
			objName : 'viewlabel',
			touchEnabled : false,
			width : 300,
			height : '80%',
			left : "50%"
		});
		wrapergeneral.add(viewlabelempaque);

		var labelempaque = Ti.UI.createLabel({
			color : '#007400',
			objName : 'label',
			text :rows.fieldByName('nombreepaque'),
			touchEnabled : false,
			right : 0,
			width : 200
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
		var agregarboton = Ti.UI.createButton({
			title : 'AGREGAR',
			width : "150",
			backgroundColor : "#007400",
			font : {
				fontFamily : 'HelveticaNeue-Bold',
				fontSize : '15',
				fontWeight : 'bold'
			},
			nombre : rows.fieldByName('nombre_producto'),
			id : rows.fieldByName('id')
		});

		// Listen for click events.
		agregarboton.addEventListener('click', function(e) {
				idproducto=e.source.id;
				
				Ti.API.info('Row swiped: ' + e.source.id);
				
				$.popupagregarpedidosugerido.top="20%";
		});

		viewbotoncomprar.add(agregarboton);

		row.add(wrapergeneral);
		tableData.push(row);
				rows.next();
	}

	table.setData(tableData);
db.close();

}


	table.addEventListener('swipe', function(e) {
		if (e.source && e.source.objName !== 'table') {
			Ti.API.info('Row swiped: ' + e.source);
			Ti.API.info('Row swiped: ' + e.source.objName);
			Ti.API.info('Row ID : ' + e.source.rowID);
		}
	});

	$.tablapedido.add(table);
	
	function updatepedidocompra(empaque,cantidad, id) {
		
		if(!!!$.inputcantidad.value){
		
			alert("El valor tiene que ser  numerico");
			return false;
		}
		if($.pickerempaques.getSelectedRow(0).id==0){
		
			alert("Selecione una presentacion");
			return false;
		}
		
	var db = Ti.Database.open('ekosoftdos');

	db.execute('UPDATE productopedidossde SET empaque=? WHERE id=?', $.pickerempaques.getSelectedRow(0).idpresentacion , idproducto);
	
	db.execute('UPDATE productopedidossde SET cantidad=? WHERE id=?', $.inputcantidad.value, idproducto);
	db.execute('UPDATE productopedidossde SET nombreepaque=? WHERE id=?', $.pickerempaques.getSelectedRow(0).title , idproducto);



	db.close();
generartabla();
$.inputcantidad.value="";
		$.pickerempaques.setSelectedRow(0, 0, false);

$.popupagregarpedidosugerido.top="-1000"
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
		}else{
			
		
		Ti.API.info('e.cancel: ' + e.cancel);
		Ti.API.info('e.source.cancel: ' + e.source.cancel);
		Ti.API.info('e.index: ' + e.index);
		//var db = Ti.Database.open('ekosoftdos');


var db = Ti.Database.open('ekosoftdos');

				var rows = db.execute('SELECT * from productopedidossde where nombreepaque IS NOT NULL and cantidad IS NOT NULL ');

	var i = 0;
	  var arr = [];
	while (rows.isValidRow()) {
		
		
		
var obj = {
  		idproductopedido:rows.fieldByName('idproductopedido'),
  		codigo_producto:rows.fieldByName('codigo_producto'),
  		nombre_producto:rows.fieldByName('nombre_producto'),
  		id_presentacion_producto:rows.fieldByName('id_presentacion_producto'),
  		producto_activo:rows.fieldByName('producto_activo'),
  		id_categoria_producto:rows.fieldByName('id_categoria_producto'),
  		id_grupo_compra_producto:rows.fieldByName('id_grupo_compra_producto'),
  		codigo_siigo_producto:rows.fieldByName('codigo_siigo_producto'),
  		promedio_producto:rows.fieldByName('promedio_producto'),
  		empaque:rows.fieldByName('empaque'),
  		cantidad:rows.fieldByName('cantidad'),
  		nombreepaque:rows.fieldByName('nombreepaque'),
  	};
  arr.push(obj);
  
  
  console.log(JSON.stringify(obj));
  
 rows.next();
}

	db.close();
	
						

					enviarpedidosugerido(JSON.stringify(arr));
}
	});
	dialog.show();
}


cerrarselectorproductos();
$.inputgeneralmod.addEventListener('click', function(e) {
	$.tablaproductotemporal.top = 0;
});


function cerrarpopuppecomprados(){
		$.popupcomprapop.top = "-10000";

}

function agregarproductopedido(){
	$.popupcomprapop.top=0;
}
function agregarpruductotabla() {
	if (!!$.inputgeneralmod.value) {

		if (!!!$.cantidadmod) {
			alert("Seleccionar cantidad");
			return false;
		}

		if (idpresentacionpicker == 0) {
			return false;
		}

		var db = Ti.Database.open('ekosoftdos');

var randomm= Math.random(1,2589341454);

		db.execute('INSERT INTO productopedidossde (idproductopedido,codigo_producto,nombre_producto,id_presentacion_producto,producto_activo,id_categoria_producto,id_grupo_compra_producto,codigo_siigo_producto,promedio_producto) VALUES (?,?,?,?,?,?,?,?,?)',  $.inputgeneralmod.idpro,  $.inputgeneralmod.idpro,$.inputgeneralmod.value, idpresentacionpicker, 0 , 0, Alloy.Globals.grupodecompra, 0, 0);



		//db.execute('INSERT INTO pedidos_de_comprasddadsde (id_producto_pc,id_grupo_compra_pc,productonombre,compra_completado,distribucion_completado,presentacion,idpresentacion,cantidad,idpedido) VALUES (?,?,?,?,?,?,?,?,?)', $.inputgeneralmod.idpro, Alloy.Globals.grupodecompra, $.inputgeneralmod.value, false, false, nombrepresentacionpicker, idpresentacionpicker, $.cantidadmod.value,randomm);
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

function cerrarselectorproductos() {
	$.tablaproductotemporal.top = '-100000'
}
llenarpickerpresentaciondd();

function llenarpickerpresentaciondd() {
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


function enviarpedidosugerido(variables){
	
					
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
					

		var json = JSON.parse(this.responseText);


if(json.error==1){
	
		var db = Ti.Database.open('ekosoftdos');
	db.execute('DELETE FROM productopedidossde');
	

	db.close();

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['OK'],
		message : json.resp,
		title : 'Pedido de Compra'
	});
	dialog.addEventListener('click', function(e) {
		
			$.pedidocomprasugerido.close();



	});
	dialog.show();


}else{
	alert(json.resp);
}

	
	
	
	};
	// open the client
	xhr.open('POST', Alloy.Globals.url + '/enviarpedidosugerido');

	xhr.send({data:	variables,almacen:Alloy.Globals.idalmacen,usuario:Alloy.Globals.codigousuario});
}

function cerrarventana(){
				$.pedidocomprasugerido.close();

}


function sqltojson(){
			var db = Ti.Database.open('ekosoftdos');

				var rows = db.execute('SELECT idproductopedido,codigo_producto,nombreepaque,cantidad,promedio_producto from productopedidossde where nombreepaque IS NOT NULL and cantidad IS NOT NULL ');
  var arr = [];
if(rows.rowCount) {
	
  while(rows.isValidRow()) {
  	
  					Ti.API.info(rows.fieldByName('codigo_producto'));

  	var obj = {
  		idproductopedido:rows.fieldByName('idproductopedido'),
  		codigo_producto:rows.fieldByName('codigo_producto')
  	};
  	/*  obj["idproductopedido"] = rows.fieldByName('idproductopedido');
  	  obj["codigo_producto"] = rows.fieldByName('codigo_producto');
  	  obj["nombre_producto"] = rows.fieldByName('nombre_producto');
  	  obj["id_presentacion_producto"] = rows.fieldByName('id_presentacion_producto');
  	  obj["producto_activo"] = rows.fieldByName('producto_activo');
  	  obj["id_categoria_producto"] = rows.fieldByName('id_categoria_producto');
  	  obj["id_grupo_compra_producto"] = rows.fieldByName('id_grupo_compra_producto');
  	  obj["codigo_siigo_producto"] = rows.fieldByName('codigo_siigo_producto');
  	  obj["promedio_producto"] = rows.fieldByName('promedio_producto');
obj["empaque"] = rows.fieldByName('empaque');
obj["cantidad"] = rows.fieldByName('cantidad');
obj["nombreepaque"] = rows.fieldByName('nombreepaque');
  	  */
  	 
  	 
      arr.push(obj);
  }
    					Ti.API.info(JSON.stringify(arr));

  
 }
 
db.close();

/*
if(rows.rowCount) {
  var arr = [];
  while(rows.isValidRow()) {
    var obj = {};
    for(i=0; i<rows.fieldCount; i++) {
      obj[rows.fieldName(i)] = rows.field(i);
      arr.push(obj);
    }
 
    rows.next();
  }
}

	var result = [];
var numRow = 0;
while (rows.isValidRow()){
	
    result[numRow] = {};
    var numField = 0;
      for(i=0; i<rows.fieldCount; i++) {
   // while (rows.field(numField)) {
        result[numRow][rows.fieldName(numField)] = rows.field(numField);
        numField++;
    }
    rows.next();
    numRow++;
}

*/





return arr;
}

function cerrarpopuppedido() {
	$.popupagregarpedidosugerido.top = "-100000"
}
