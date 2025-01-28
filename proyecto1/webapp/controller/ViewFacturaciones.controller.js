sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ViewFacturaciones", {
        onInit: function () {
            // Cargar el modelo JSON para esta vista
            var oModel = new JSONModel();
            var sPath = "localService/layoutIMPO.json";

            // Cargar los datos desde el archivo JSON
            oModel.loadData(sPath);

            // Manejar la carga exitosa o el error
            oModel.attachRequestCompleted(function () {
                console.log("Datos de layoutIMPO.json cargados correctamente.");
            });

            oModel.attachRequestFailed(function (oEvent) {
                console.error(
                    "Error al cargar layoutIMPO.json: ",
                    oEvent.getParameter("statusCode"),
                    oEvent.getParameter("statusText")
                );
            });

            // Asignar el modelo a la vista
            this.getView().setModel(oModel, "layoutIMPOModel");

            // Configurar la tabla con el modelo cargado
            this._bindTable(oModel);
        },

        _bindTable: function (oModel) {
            var oTable = this.getView().byId("idTableFacturas");
            oTable.bindItems({
                path: "layoutIMPOModel>/facturas", // Ruta al array en el JSON
                template: new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{layoutIMPOModel>Factura}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Fecha}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>OrdenDeCompra}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Cliente}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Cuprum}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>FraccionArancelaria}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Descripcion}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>DescripcionPedimento}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Piezas}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Kilos}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Libras}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Metros}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>Pies}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>UM}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>UnitarioUSD}" }),
                        new sap.m.Text({ text: "{layoutIMPOModel>TotalUSD}" })
                    ]
                })
            });
        },
        onFilterTable: function () {
            var sOrdenCompra = this.getView().byId("idOrdenCompraFilter").getValue();
            var sFecha = this.getView().byId("idFechaFilter").getValue();
        
            var aFilters = [];
        
            // Solo procesamos la fecha si tiene un valor válido
            if (sFecha) {
                // Convertir la fecha en formato 'DD/MM/YY' a 'YYYY-MM-DD'
                var aFechaParts = sFecha.split('/'); // Asumimos que la fecha es en formato 'DD/MM/YY'
                if (aFechaParts.length === 3) {
                    var sFormattedFecha = '20' + aFechaParts[2] + '-' + aFechaParts[1].padStart(2, '0') + '-' + aFechaParts[0].padStart(2, '0');
                    var oFecha = new Date(sFormattedFecha);
        
                    // Verificar si la fecha es válida
                    if (!isNaN(oFecha.getTime())) {
                        sFecha = oFecha.toISOString().split('T')[0]; // Extraemos solo la parte de la fecha
                    } else {
                        console.error("Fecha inválida:", sFecha);
                    }
                } else {
                    console.error("Formato de fecha no válido:", sFecha);
                }
            }
        
            if (sOrdenCompra) {
                aFilters.push(new Filter("OrdenDeCompra", FilterOperator.Contains, sOrdenCompra));
            }
            if (sFecha) {
                // Filtrar la fecha en formato ISO
                aFilters.push(new Filter("Fecha", FilterOperator.EQ, sFecha));
            }
        
            var oTable = this.getView().byId("idTableFacturas");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },

        onPressBackToMain: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("main");
        }
        
        
        
    });
});
