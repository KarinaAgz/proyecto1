sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
    "use strict";

    return UIComponent.extend("logaligroup.proyecto1.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Llama al método init del UIComponent
            UIComponent.prototype.init.apply(this, arguments);

            // Inicializa el modelo de dispositivo para manejar el diseño adaptable
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // Crear el modelo JSON
            var oLayoutModel = new JSONModel();
            
            // Intentar cargar el archivo JSON
            oLayoutModel.loadData("localService/layoutMP.json").then(function() {
                // Asegúrate de que el archivo se ha cargado correctamente
                console.log("Archivo JSON cargado correctamente");
            }).catch(function(error) {
                console.error("Error al cargar el archivo JSON: ", error);
            });

            // Asignar el modelo a la vista
            this.setModel(oLayoutModel, "layoutModel");
 
            // Inicia el enrutador
            this.getRouter().initialize();
        }
    });
});
