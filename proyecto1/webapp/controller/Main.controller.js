sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.Main", {
        onInit: function () {
            var oModelIMPO = new JSONModel("localService/layoutIMPO.json");
            this.getView().setModel(oModelIMPO, "facturas");

            oModelIMPO.attachRequestCompleted(function () {
                console.log("Datos cargados correctamente:", oModelIMPO.getData());
            });
            oModelIMPO.attachRequestFailed(function () {
                console.error("Error al cargar datos desde impo.json");
            });


            var oModelMP = new JSONModel("localService/layoutMP.json");
            this.getView().setModel(oModelMP, "productos");

            oModelMP.attachRequestCompleted(function () {
                console.log("Datos cargados correctamente:", oModelMP.getData());
            });
            oModelMP.attachRequestFailed(function () {
                console.error("Error al cargar datos desde MP.json");
            });

            var oModelPT = new JSONModel("localService/layoutPT.json");
            this.getView().setModel(oModelPT, "productos_terminados");

            oModelPT.attachRequestCompleted(function () {
                console.log("Datos cargados correctamente:", oModelPT.getData());
            });
            oModelPT.attachRequestFailed(function () {
                console.error("Error al cargar datos desde impo.json");
            });
        },

        onSearchFilters: function (oEvent) {
            var oFilterBar = this.getView().byId("filterbar");
            var aFilters = this._collectFilters(oFilterBar);

            var oTable = this.getView().byId("Table_Virtual");
            var oBinding = oTable.getBinding("rows");
            if (oBinding) {
                oBinding.filter(aFilters);
            } else {
                console.error("No se encontró el binding de la tabla.");
            }
        },
        // Recopilar filtros desde la FilterBar
        _collectFilters: function (oFilterBar) {
            var aFilters = [];
            
            var oDateRange = oFilterBar.getFilterItems().find(f => f.getId().includes("DateRange"));
            if (oDateRange) {
                var oDateRangeValue = oDateRange.getControl().getDateValue();
                var oDateRangeSecondValue = oDateRange.getControl().getSecondDateValue();
                if (oDateRangeValue && oDateRangeSecondValue) {
                    aFilters.push(new Filter("Fecha", FilterOperator.BT, oDateRangeValue, oDateRangeSecondValue));
                }
            }

            var oInvoiceInput = oFilterBar.getFilterItems().find(f => f.getId().includes("Input_Invoice"));
            if (oInvoiceInput) {
                var sInvoice = oInvoiceInput.getControl().getValue();
                if (sInvoice) {
                    aFilters.push(new Filter("Factura", FilterOperator.Contains, sInvoice));
                }
            }

            // Agregar filtros para Material, OrdenesCompra, Cliente, Proveedor, etc.
            var aOtherFilters = [
                { id: "Input_Material", property: "Material" },
                { id: "Input_OrdenCompra", property: "OrdenDeCompra" },
                { id: "Input_Cliente", property: "Cliente" },
                { id: "Input_Proveedor", property: "Proveedor" }
            ];
            aOtherFilters.forEach(oFilterConfig => {
                var oInput = oFilterBar.getFilterItems().find(f => f.getId().includes(oFilterConfig.id));
                if (oInput) {
                    var sValue = oInput.getControl().getValue();
                    if (sValue) {
                        aFilters.push(new Filter(oFilterConfig.property, FilterOperator.Contains, sValue));
                    }
                }
            });

            return aFilters;
        }
    });
});
