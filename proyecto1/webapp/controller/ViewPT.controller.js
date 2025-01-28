sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ViewPT", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            //cargasr json 
            this._loadData("localService/layoutPT.json");
        },

        _loadData:function(sPath){
            var oModel=new JSONModel();
            oModel.loadData(sPath);

            oModel.attachRequestCompleted(function(){
                console.log("datos cargados correctamente",oModel.getData());
            });

            oModel.attachRequestFailed(function(oEvent){
                console.log("Errror al cargar datos: ", oEvent.getParameter("statusCode"),oEvent.getParameter("statusText"));
            }); 

            this.getView().setModel(oModel,"layoutPT");

        },

        onPressBackToMain: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("main");
        },
        onFilterTable: function () {
            var oTable = this.getView().byId("idTablePT");
            var oBinding = oTable.getBinding("items");
        
            // Obtén el valor del DatePicker
            var sFecha = this.getView().byId("idFecha").getValue();
            var aFilters = [];
        
            if (sFecha) {
                // Separar la fecha en partes (día, mes, año)
                var aFechaParts = sFecha.split('/'); // Asume el formato DD/MM/YYYY
                if (aFechaParts.length === 3) {
                    var sDay = aFechaParts[0];
                    var sMonth = aFechaParts[1];
                    var sYear = aFechaParts[2];
        
                    // Convertir al formato YYYY-MM-DD
                    var sFormattedDate = `${sYear}-${sMonth.padStart(2, '0')}-${sDay.padStart(2, '0')}`;
                    console.log("Fecha convertida al formato ISO:", sFormattedDate);
        
                    // Crear el filtro con la fecha formateada
                    aFilters.push(new sap.ui.model.Filter("FDesde", sap.ui.model.FilterOperator.EQ, sFormattedDate));
                } else {
                    console.error("Formato de fecha inválido:", sFecha);
                }
            }
        
            // Aplicar el filtro a la tabla
            oBinding.filter(aFilters);
        }
        
        
    });
});
