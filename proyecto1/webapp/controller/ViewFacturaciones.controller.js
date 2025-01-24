sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ViewFacturaciones", {
        onInit: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel);
        },

        onPressBackToMain: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("main");
        }
    });
});
