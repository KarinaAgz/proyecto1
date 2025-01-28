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
        onFilterTable: function (oEvent) {
            var sFecha = this.byId("idFecha").getValue();
            var oTable = this.byId("idTablePT");
            var oBinding = oTable.getBinding("items");
        
            // Si no hay fecha, limpiar los filtros directamente
            if (!sFecha) {
                oBinding.filter([]); // Limpia todos los filtros
                return; // Sal del método
            }
        
            // Si hay fecha, aplica el filtro
            var oFilter = new sap.ui.model.Filter("FDesde", sap.ui.model.FilterOperator.EQ, sFecha);
            oBinding.filter([oFilter]);
        },
        
        
        
        
        
    });
});
