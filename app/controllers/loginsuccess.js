var args = arguments[0] || {};

function verificarpedidosdecompra() {

	var cantidad = 0;
	var db = Ti.Database.open('ekosoftdos');
	var row = db.execute('SELECT count(*) as HowMany from pedidos_de_comprasddads');
	cantidad = row.fieldByName('HowMany');
	db.close();

	return cantidad;
}

function cargarpedicocompra() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		var json = JSON.parse(this.responseText);
		Ti.API.info(this.responseText);

		if (json.error == 1) {
			alert(json.resp);
			return false;
		}

		if (verificarpedidosdecompra() == 0) {

			var db = Ti.Database.open('ekosoftdos');
			var json = json.resp;
			db.execute('DELETE FROM pedidos_de_comprasddadsde');
			for (var i = 0; i < json.length; i++) {

				db.execute('INSERT INTO pedidos_de_comprasddadsde (almacenes,idpedido,id_producto_pc,lista_compra_pc,id_grupo_compra_pc,productonombre,compra_completado,distribucion_completado,promedio,presentacion,idpresentacion,cantidad) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', JSON.stringify(json[i].almacencompragestino), json[i].id, json[i].id_producto_pc, json[i].lista_compra_pc, json[i].id_grupo_compra_pc, json[i].producto, json[i].compra_completado, json[i].distribucion_completado, json[i].promedio, json[i].presentacion, json[i].idpresentacion, json[i].cantidad);
			}; 
			db.close();

		}
		Ti.API.info("producto");

		//verificacionproveedor();

		var controller = Alloy.createController('compra').getView();
		controller.open();

	};
	// open the client
	xhr.open('GET', Alloy.Globals.url + '/cargarpedicocompraus');

	xhr.send({
		codped : Alloy.Globals.grupodecompra,
		codigo : Alloy.Globals.codigousuario
	});
}

var valalmacen = 0;
function comprar() {

	cargarpedicocompra();

}

function ocultarpanelextra() {
	$.viewextra.bottom = "-100000"
}

$.bienvenida.text = "Bienvenido " + Alloy.Globals.nombreempleado + " usted registrarå información para el día " + Alloy.Globals.fechalista;

function traeralmacenes() {
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		var json = JSON.parse(this.responseText);

		Ti.API.info(JSON.stringify(this.responseText));

	};
	// open the client
	xhr.open('GET', Alloy.Globals.url + '/mostraralmacenes');

	xhr.send();
}

var removeAllPickerRows = function(picker) {
	if (picker.columns[0]) {
		var _col = picker.columns[0];
		var len = _col.rowCount;
		for (var x = len - 1; x >= 0; x--) {
			var _row = _col.rows[x]
			_col.removeRow(_row);
		}
	}
};
llenarpickeralmacen();
function llenarpickeralmacen() {

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Seleccione almacenes',
		idalmacen : 0
	});
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
		var json = JSON.parse(this.responseText);

		for (var i = 0; i < json.length; i++) {

			data.push(Ti.UI.createPickerRow({
				title : json[i].text,
				idalmacen : json[i].id
			}));

		};

		$.pickerempresa.add(data);

	};
	// open the client
	xhr.open('GET', Alloy.Globals.url + '/mostraralmacenes');

	xhr.send();

}

function registrarmovimientoefectivo() {
	var controller = Alloy.createController('movimientoefectivo').getView();
	controller.open();
}

function realizarpedidoventana() {
	$.viewextra.bottom = 0;

	//$.extraloginpicker.add(picker)
}

function verificarregsitroproducto() {

	var resultado = "";
	var db = Ti.Database.open('ekosoftdos');

	var row = db.execute('SELECT * from productopedidossde');

	while (row.isValidRow()) {
		//Alloy.Globals.arraytemporal = ;
		Ti.API.info(row.fieldByName('nombre_producto'));

		row.next();
	}

}

function ingrearproductospedido(respuesta) {

	var db = Ti.Database.open('ekosoftdos');
	db.execute('DELETE FROM productopedidossde');
	for (var i = 0; i < respuesta.length; i++) {
		
		
		db.execute('INSERT INTO productopedidossde (idproductopedido,codigo_producto,nombre_producto,id_presentacion_producto,producto_activo,id_categoria_producto,id_grupo_compra_producto,codigo_siigo_producto,promedio_producto) VALUES (?,?,?,?,?,?,?,?,?)', respuesta[i].id, respuesta[i].codigo_producto, respuesta[i].nombre_producto, respuesta[i].id_presentacion_producto, respuesta[i].producto_activo, respuesta[i].id_categoria_producto, respuesta[i].id_grupo_compra_producto, respuesta[i].codigo_siigo_producto, respuesta[i].promedio_producto);
	};
	db.close();

	Ti.API.info("producto");
	verificarregsitroproducto()
	Ti.API.info(JSON.stringify(respuesta));

}

function validar() {
	Alloy.Globals.idalmacen = $.pickerempresa.getSelectedRow(0).idalmacen;
	if (Alloy.Globals.idalmacen == 0) {
		alert("tiene que seleccionar un almacen");

		return false;
	} else {

		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var json = JSON.parse(this.responseText);

			Ti.API.info(this.responseText);

			if (json.error == 1) {
				alert(json.resp)
			} else {

				ingrearproductospedido(json.resp)
				realizarpedido();
			}

		};
		// open the client
		xhr.open('GET', Alloy.Globals.url + '/insertarpedidoalmacen');

		xhr.send({
			codigo : Alloy.Globals.codigousuario,
			almacen : Alloy.Globals.idalmacen
		});

	}

}

$.pickerempresa.addEventListener('change', function(e) {
	valalmacen = e.row.idalmacen;

});

function realizarpedido() {
	var controller = Alloy.createController('pedidosugerido').getView();
	controller.open();
}
