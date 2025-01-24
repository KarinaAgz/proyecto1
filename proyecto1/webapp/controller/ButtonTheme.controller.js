sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/CustomData"
], function (Controller) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ButtonTheme", {

        onInit: function () {
            this._initTheme();
        },

        _initTheme: function () {
            // Recupera el tema guardado en localStorage
            var sSavedTheme = localStorage.getItem("tipoTema");
            if (sSavedTheme) {
                console.log("Aplicando tema guardado:", sSavedTheme);
                sap.ui.getCore().applyTheme(sSavedTheme);
            } else {
                console.log("Aplicando tema por defecto (sap_horizon).");
                sap.ui.getCore().applyTheme("sap_horizon");
            }
        },

        onTheme: function (oEvent) {
            // Obtén el valor del tema desde los datos personalizados del botón
            var oCustomData = oEvent.getSource().getCustomData();
            if (oCustomData.length > 0) {
                var sTheme = oCustomData[0].getValue();
                console.log("Cambiando tema a:", sTheme);

                // Aplica el tema seleccionado
                sap.ui.getCore().applyTheme(sTheme);

                // Guarda el tema en localStorage
                localStorage.setItem("tipoTema", sTheme);
            } else {
                console.error("No se encontró tema en el botón.");
            }
        }
    });
});
