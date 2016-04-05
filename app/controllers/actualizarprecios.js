var args = arguments[0] || {};
generartabla();

var costopresentacion=0;

var costopreentacion=0;
	$.actualizarcontactu.top="-10000"
$.contenedorvalidacion.top="-10000"

function actualizarprecios(){
	
	
	var porcentaje=($.textpreciomercaderista.value-costopresentacion)/costopreentacion;
	
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['SI', 'NO'],
		message : 'El margen mercaderista es '+Math.round(porcentaje*100)+' %',
		title : '¿Esta seguro del precio que acaba de asignar?',
	});
	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.cancel) {
			
			
			
			
			return false;
		}else{
			
			$.actualizarcontactu.top="-10000"
			
			
			
		}
		
		})
	dialog.show();

}

function cerrarviewactualizacion(){
	$.ventanaactualizar.close();
   Ti.App.fireEvent('cierrehijo')
}

function guardaractualizacion(){
	$.contenedorvalidacion.top="20%";
}
	var table = Ti.UI.createTableView({
		objName : 'table'
	});
function generartabla() {
	var tableData = [];


	var labenomreproducto = Ti.UI.createLabel({
		color : '#007400',
		objName : 'NOMBREPRODUTO',
		text : "NOMBRE DE PRESENTACION DE VENTA AL PUBLICO",
		touchEnabled : false,
		left : "5%",
		width : 200
	});

	$.tablapedidohead.add(labenomreproducto)

	var labecantidad = Ti.UI.createLabel({
		color : '#007400',
		objName : 'PRECIO ANTERIOR',
		text : "PRECIO ANTERIOR",
		touchEnabled : false,
		left : "35%",
		width : 200
	});

	$.tablapedidohead.add(labecantidad)

	var labeempaque = Ti.UI.createLabel({
		color : '#007400',
		objName : 'NOMBREPRODUTO',
		text : "PRECIO MERCADERISTA",
		touchEnabled : false,
		left : "60%",
		width : 200
	});

	$.tablapedidohead.add(labeempaque)



	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function() {
				var json = JSON.parse(this.responseText);
if(json.error==2){
	alert(json.resp);
	return false;
}
	for (var i = 0; i <json.resp.length; i++) {
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
			text :json.resp[i].nombre_presentacion_pp  ,
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
			text :  json.resp[i].precioanterior ,
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
			text :  json.resp[i].preciosugerido ,
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
			title : 'MODIFICAR',
			width : "150",
			backgroundColor : "#007400",
			font : {
				fontFamily : 'HelveticaNeue-Bold',
				fontSize : '15',
				fontWeight : 'bold'
			},
			presentacion:json.resp[i].presentacion,
			presentacionid:json.resp[i].presentacionid,
			costounitariopp:json.resp[i].costounitariopp,
			factorconversionsugerido:json.resp[i].factorconversionsugerido,
			factorconversion:json.resp[i].factorconversion,
			costopresentacion:json.resp[i].costopresentacion,
			precioanterior:json.resp[i].precioanterior,
			preciomercaderista:json.resp[i].preciomercaderista,
			margenporcentaje:json.resp[i].margenporcentaje,
			margenmonedapp:json.resp[i].margenmonedapp,
			tipo_porcentaje:json.resp[i].tipo_porcentaje,
			nombre_presentacion_pp:json.resp[i].nombre_presentacion_pp ,
			preciosugerido:json.resp[i].preciosugerido,
			precio_especial_pp:json.resp[i].precio_especial_pp

		});

		// Listen for click events.
		agregarboton.addEventListener('click', function(e) {
			
			$.nombrepresentacionactuaolizar.text=e.source.nombre_presentacion_pp+" costo unitario $"+e.source.costounitariopp;
			costopreentacion=e.source.costopresentacion;
			var costopresentacion=e.source.costounitariopp*e.source.factorconversion
			
			costopresentacion=costopresentacion;
			$.costopresentacionlavel.text="Costo presentacion : $"+Math.round(costopresentacion)+"";
			
			if(e.source.tipo_porcentaje==1){
					var preciosugerido	=costopresentacion*(1+e.source.margenporcentaje);	
						$.preciosugerido.text=" Precio sugerido $ "+preciosugerido;
			}
			
			if(e.source.tipo_porcentaje==2){
						var preciosugerido	=costopresentacion+margenmonedapp;	
						$.preciosugerido.text=" Precio sugerido $ "+preciosugerido;
			}
			
			
			if(e.source.tipo_porcentaje==3){
					var preciosugerido	=e.source.precio_especial_pp;	
						$.preciosugerido.text=" Precio sugerido $ "+preciosugerido;
			}
						if(e.source.tipo_porcentaje==3){
							$.pesosugeriditext.enabled=false;

			 var pesosugerido=precio_especial_pp/(e.source.costounitariopp*(e.source.margenporcentaje/100)+1);
			
		$.pesosugeridolabel.text=" Peso sugerido : "+pesosugerido;
		}else{
					$.pesosugeridolabel.text=" Peso sugerido : "+e.source.factorconversion;
							$.pesosugeriditext.enabled=true;

		}
			

$.actualizarcontactu.top="0"
		
		});

		viewbotoncomprar.add(agregarboton);

		row.add(wrapergeneral);
		tableData.push(row);
	}		
	table.setData(tableData);

	};
	xhr.open('GET', Alloy.Globals.url + '/actualizaciones');

	xhr.send({cod:Alloy.Globals.codigousuario});






	

}


$.textpreciomercaderista.addEventListener('return', function(e) {


});
table.addEventListener('swipe', function(e) {
		if (e.source && e.source.objName !== 'table') {
			Ti.API.info('Row swiped: ' + e.source);
			Ti.API.info('Row swiped: ' + e.source.objName);
			Ti.API.info('Row ID : ' + e.source.rowID);
		}
	});

	$.tablapedido.add(table);

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
