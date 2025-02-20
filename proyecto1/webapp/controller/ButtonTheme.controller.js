sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ButtonTheme", {
        /**
         * Cambia el tema de la aplicación cuando se presiona un botón.
         * @param {sap.ui.base.Event} oEvent Evento del botón.
         */
        onTheme: function (oEvent) {
            // Obtener el botón presionado
            var oButton = oEvent.getSource();

            // Obtener el CustomData del botón
            var oCustomData = oButton.getCustomData().find(function (data) {
                return data.getKey() === "theme";
            });

            if (oCustomData) {
                // Aplicar el tema
                var sTheme = oCustomData.getValue();
                sap.ui.getCore().applyTheme(sTheme);

                // Mostrar mensaje de confirmación
                MessageToast.show("Tema cambiado a: " + sTheme);
            } else {
                MessageToast.show("No se pudo obtener el tema del botón.");
            }
        }
    });
});
