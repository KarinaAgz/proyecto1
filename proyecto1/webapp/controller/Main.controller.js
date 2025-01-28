sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.Main", {
        onInit: function () {
            // Configura un modelo JSON vacío y lo establece en la vista
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
        },

        onPressViewList: function () {
            // Obtén el enrutador desde el componente propietario
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Usa este método para obtener el router
            if (oRouter) {
                oRouter.navTo("viewList"); // Asegúrate de usar el nombre correcto configurado en el manifest.json
            } else {
                console.error("El enrutador no se pudo obtener.");
            }
        },
        
        onPressViewFacturaciones: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("viewFacturaciones");
        },
        onPressViewPT: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("viewPT");
        },


        _loadData: function (sPath) {
            // Carga datos desde un archivo JSON y los establece en el modelo
            var oModel = this.getView().getModel();
            if (oModel) {
                oModel.loadData(sPath, null, true)
                    .then(function () {
                        console.log("Datos cargados correctamente desde:", sPath);
                    })
                    .catch(function (oError) {
                        console.error("Error al cargar datos desde:", sPath, oError);
                    });
            } else {
                console.error("El modelo JSON no está configurado.");
            }
        },
        
    });
});
