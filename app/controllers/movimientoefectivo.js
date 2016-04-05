var args = arguments[0] || {};
generartabla()
$.popupagregarpedidosugerido.top = "-1000";
function cerrarventanamovimiento() {
	$.movimientowindow.close();
}

llenarconcepto();
llenarpickeralmacen();

function realizarprestamo() {
	popupconcepto(1)
}

function agregargasto() {
	popupconcepto(2)
}

function popupconcepto(valor) {
	$.popupagregarpedidosugerido.top = "20%"

	if (valor == 1) {
		$.pickermercaderista.opacity = 1
	} else {
		$.pickermercaderista.opacity = 0
	}
}

function llenarpickeralmacen() {

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Seleccione mercaderista',
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

		$.pickermercaderista.add(data);

	};
	// open the client
	xhr.open('GET', Alloy.Globals.url + '/mostrarempleados');

	xhr.send();

}

function cerrarpopusugerdi() {
	$.pickermercaderista.opacity = 0;
	$.popupagregarpedidosugerido.top = "-10000";
}

function llenarconcepto() {
	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Seleccione concepto',
		idalmacen : 0
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'Contado',
		idalmacen : 2
	});
	data[2] = Ti.UI.createPickerRow({
		title : 'Numerario (lazos - Ayudante)',
		idalmacen : 3
	});
	data[3] = Ti.UI.createPickerRow({
		title : 'Numerario (Fletes)',
		idalmacen : 4
	});

	data[4] = Ti.UI.createPickerRow({
		title : 'Empaque',
		idalmacen : 5
	});
	$.pickerconcepto.add(data);

}

function generartabla() {
	var tableData = [];
	var table = Ti.UI.createTableView({
		objName : 'table'
	});

	var labenomreproducto = Ti.UI.createLabel({
		color : '#007400',
		objName : 'CONCEPTO',
		text : "CONCEPTO",
		touchEnabled : false,
		left : "5%",
		width : 200
	});

	$.tablapedidohead.add(labenomreproducto)

	var labecantidad = Ti.UI.createLabel({
		color : '#007400',
		objName : 'VALOR',
		text : "VALOR",
		touchEnabled : false,
		left : "30%",
		width : 200
	});

	$.tablapedidohead.add(labecantidad)

	var labeempaque = Ti.UI.createLabel({
		color : '#007400',
		objName : 'TIPODEMOVIMIENTO',
		text : "TIPO DE MOVIMIENTO",
		touchEnabled : false,
		left : "55%",
		width : 200
	});

	$.tablapedidohead.add(labeempaque)

	for (var i = 0; i <= 20; i++) {
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
			text : "Arveja",
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
			text : "$500",
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
			text : "BULTO",
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
			title : 'BORRAR',
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
		agregarboton.addEventListener('click', function(e) {

			var data = [];
			data[0] = Ti.UI.createPickerRow({
				title : 'Seleccione presentacion'
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

			$.pickerempaques.add(data);

			$.popupagregarpedidosugerido.top = "20%";
			Ti.API.info(JSON.stringify(e.source));

			$.nombreproductopopup.text = e.source.nombre;
		});

		viewbotoncomprar.add(agregarboton);

		row.add(wrapergeneral);
		tableData.push(row);
	}

	table.setData(tableData);

	table.addEventListener('swipe', function(e) {
		if (e.source && e.source.objName !== 'table') {
			Ti.API.info('Row swiped: ' + e.source);
			Ti.API.info('Row swiped: ' + e.source.objName);
			Ti.API.info('Row ID : ' + e.source.rowID);
		}
	});

	$.tablapedido.add(table);
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
		}
		Ti.API.info('e.cancel: ' + e.cancel);
		Ti.API.info('e.source.cancel: ' + e.source.cancel);
		Ti.API.info('e.index: ' + e.index);
	});
	dialog.show();
}

function cerrarpopuppedido() {
	$.popupagregarpedidosugerido.top = "-100000"
}
