function doClick(e) {
	alert($.label.text);
}

///login

var db = Ti.Database.open('ekosoftdos');
db.execute('CREATE TABLE IF NOT EXISTS tabletuserjson (id INTEGER PRIMARY KEY, respuestatablet TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS tabletproducto (id INTEGER PRIMARY KEY, nombre_producto TEXT,id_grupo_compra_producto INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS pedidos_de_comprasddadsde (id INTEGER PRIMARY KEY AUTOINCREMENT,idpedido INTEGER,id_producto_pc INTEGER,lista_compra_pc INTEGER, id_grupo_compra_pc INTEGER,productonombre TEXT, compra_completado INTEGER, distribucion_completado INTEGER, promedio DOUBLE, presentacion TEXT,idpresentacion INTEGER,cantidad INTEGER,almacenes TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS proveedorestad (id INTEGER PRIMARY KEY,idproveedor INTEGER DEFAULT 0,nombres_proveedor TEXT,cedula TEXT, telefono TEXT,nuevo INTEGER DEFAULT 0);');
db.execute('CREATE TABLE IF NOT EXISTS productotablet (id INTEGER PRIMARY KEY AUTOINCREMENT,producto TEXT, title TEXT,idpresentacion INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS compra_productosedfy (id INTEGER PRIMARY KEY AUTOINCREMENT,chequete INTEGER,tipopago INTEGER,nombre_presentacion,nombre_proveedor_compra,id_proveedor_compra INTEGER, id_producto_compra INTEGER,id_pedido_compra INTEGER,factor_conversion DOUBLE, costo_total_presentacion	INTEGER ,costo_unitario_presentacion DOUBLE, completada_transaccion_efectivo INTEGER,id_presentacion INTEGER, costo_unitario_kilo	DOUBLE,cantidad_comprada	INTEGER, compra_almacen	INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS productopedidossde (id INTEGER PRIMARY KEY AUTOINCREMENT, idproductopedido INTEGER,codigo_producto INTEGER,nombre_producto TEXT,id_presentacion_producto	INTEGER, producto_activo BOOLEAN, id_categoria_producto	INTEGER, id_grupo_compra_producto INTEGER, codigo_siigo_producto INTEGER, promedio_producto	FLOAT, empaque	FLOAT, cantidad	FLOAT,nombreepaque TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS almacentablet (id INTEGER PRIMARY KEY AUTOINCREMENT,idalmacen INTEGER, nombre_almacen TEXT);');
db.execute('CREATE TABLE IF NOT EXISTS tabladistridos (id INTEGER PRIMARY KEY AUTOINCREMENT,cantidaddistribuir,cantidad_sugerida_pca INTEGER, idpedidocompra INTEGER, idpresentacion INTEGER, id_producto INTEGER, id_presentacion INTEGER, id_almacen	INTEGER, nombrealmacen TEXT,idpedidonormal INTEGER);');
db.execute('CREATE TABLE IF NOT EXISTS distribucion (id INTEGER PRIMARY KEY AUTOINCREMENT,iddistribucion INTEGER, id_pedido_compra	 INTEGER, cantidad_distribuir INTEGER,id_lista_de_compra INTEGER,id_producto INTEGER, id_presentacion INTEGER, id_almacen INTEGER);');

db.close();


function ingresarproveedores(respuesta){
	
	var db = Ti.Database.open('ekosoftdos');
	db.execute('DELETE FROM proveedorestad');
	for (var i=0; i < respuesta.length; i++) { 
	db.execute('INSERT INTO proveedorestad (idproveedor,nombres_proveedor,telefono,cedula) VALUES (?,?,?,?)', respuesta[i].id,respuesta[i].nombres_proveedor,"","");
	};
	db.close();
	
								Ti.API.info("producto");

							Ti.API.info(JSON.stringify(respuesta));

}



function insertaralmacentablet(respuesta){
	
Alloy.Globals.almacenes=respuesta;

}





function ingresarproductostablert(respuesta){
	
	var db = Ti.Database.open('ekosoftdos');
	db.execute('DELETE FROM tabletproducto');
	for (var i=0; i < respuesta.length; i++) {
	  
	db.execute('INSERT INTO tabletproducto (id,nombre_producto,id_grupo_compra_producto) VALUES (?,?,?)', respuesta[i].Id,respuesta[i].nombre_producto,respuesta[i].id_grupo_compra_producto);

	};
	


	db.close();
	
								Ti.API.info("producto");

							Ti.API.info(JSON.stringify(respuesta));

}


function ingresarusuariotablert(respuesta) {

	var db = Ti.Database.open('ekosoftdos');
	db.execute('DELETE FROM tabletuserjson');

	db.execute('INSERT INTO tabletuserjson (respuestatablet) VALUES (?)', JSON.stringify(respuesta));

	db.close();
	return respuesta;
}


function verificarregsitroproducto() {

	var resultado = "";
	var db = Ti.Database.open('ekosoftdos');

	var row = db.execute('SELECT * from tabletproducto');

	while (row.isValidRow()) {
		//Alloy.Globals.arraytemporal = ;
			  							Ti.API.info(row.fieldByName('nombre_producto'));

		row.next();
	}
		db.close();
}

function verificarregsitro() {

	var resultado = "";
	var db = Ti.Database.open('ekosoftdos');

	var row = db.execute('SELECT * from tabletuserjson');

	while (row.isValidRow()) {
		Alloy.Globals.arraytemporal = row.fieldByName('respuestatablet');
		row.next();
	}
		db.close();
}

function loginaplicacion() {
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		var alertDialog = Titanium.UI.createAlertDialog({
			title : 'Alerta!',
			message : 'Revise su conexión  a internet',
			buttonNames : ['LISTO']
		});
		alertDialog.show();
	} else {
		
		$.cargando.text="Cargando...";
		$.botongeneraliniciar.opacity=0;
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var json = JSON.parse(this.responseText);
			Alloy.Globals.codigousuario=json.cod;
			Alloy.Globals.grupodecompra=json.grupo;
			Alloy.Globals.nombreempleado=json.nombreempleado;
			Alloy.Globals.fechalista=json.fechalista;


						Ti.API.info(JSON.stringify(Alloy.Globals.grupodecompra));
  
			if (json.resp == 1) {
				
				if(json.producto!=0){
									ingresarproductostablert(json.producto);
				//verificarregsitroproducto();

				}
													ingresarproveedores(json.proveedores);

				
				
				insertaralmacentablet(json.almacenes);

				ingresarusuariotablert(json.tablasback);
				verificarregsitro();

				var controller = Alloy.createController('loginsuccess').getView();
				controller.open();
		$.botongeneraliniciar.opacity=1;

			} else {
										$.botongeneraliniciar.opacity=1;

				var controller = Alloy.createController('loginfailed').getView();
				controller.open();

			}
		$.cargando.text="";

		};
		// open the client
		xhr.open('GET', Alloy.Globals.url + '/login');

		xhr.send({
			usuario : $.cedula.value,
			pass : $.pass.value
		});

	}
}

///login

//////loginsuccess
function registrarmovimientoefectivo() {

	$.viewextra.bottom = 0;

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Bananas'
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'Strawberries'
	});
	data[2] = Ti.UI.createPickerRow({
		title : 'Mangos'
	});
	data[3] = Ti.UI.createPickerRow({
		title : 'Grapes'
	});

	$.extraloginpicker.add(data);

	//$.extraloginpicker.add(picker)
}

////loginsuccess



$.index.open();
