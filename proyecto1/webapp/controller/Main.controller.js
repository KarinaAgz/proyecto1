sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.Main", {
        onInit: function () {
            // Cargar los modelos
            var oModelIMPO = new JSONModel("localService/layoutIMPO.json");
            this.getView().setModel(oModelIMPO, "facturas");

            var oModelMP = new JSONModel("localService/layoutMP.json");
            this.getView().setModel(oModelMP, "productos");

            var oModelPT = new JSONModel("localService/layoutPT.json");
            this.getView().setModel(oModelPT, "productos_terminados");
        },

        onLiveChangeFilters: function (oEvent) {
            // Obtener los valores de los campos de filtro
            var oDateRange = this.byId("DateRange");
            var oInvoiceInput = this.byId("Input_Invoice");
            var oMaterialInput = this.byId("Input_Material");
            var oOrdenCompraInput = this.byId("Input_OrdenCompra");
            var oClienteInput = this.byId("Input_Cliente");
            var oProveedorInput = this.byId("Input_Proveedor");

            // Inicializar filtros
            var aFilters = [];

            // Filtro por fechas
            var oStartDate = oDateRange.getDateValue();
            var oEndDate = oDateRange.getSecondDateValue();
            if (oStartDate && oEndDate) {
                aFilters.push(new Filter("FDesde", FilterOperator.BT, oStartDate, oEndDate));
            }

            // Filtro por factura
            var sInvoice = oInvoiceInput.getValue();
            if (sInvoice) {
                aFilters.push(new Filter("Factura", FilterOperator.Contains, sInvoice));
            }

            // Filtro por material
            var sMaterial = oMaterialInput.getValue();
            if (sMaterial) {
                aFilters.push(new Filter("Material", FilterOperator.Contains, sMaterial));
            }

            // Filtro por orden de compra
            var sOrdenCompra = oOrdenCompraInput.getValue();
            if (sOrdenCompra) {
                aFilters.push(new Filter("OrdenDeCompra", FilterOperator.Contains, sOrdenCompra));
            }

            // Filtro por cliente
            var sCliente = oClienteInput.getValue();
            if (sCliente) {
                aFilters.push(new Filter("Cliente", FilterOperator.Contains, sCliente));
            }

            // Filtro por proveedor
            var sProveedor = oProveedorInput.getValue();
            if (sProveedor) {
                aFilters.push(new Filter("Proveedor", FilterOperator.Contains, sProveedor));
            }

            // Aplicar los filtros a las tablas directamente
            this.applyFiltersToTable("Table_Virtual", aFilters);
            this.applyFiltersToTable("Table_MP", aFilters);
            this.applyFiltersToTable("Table_PT", aFilters);
        },

        applyFiltersToTable: function (sTableId, aFilters) {
            var oTable = this.byId(sTableId);
            if (oTable) {
                var oBinding = oTable.getBinding("rows");  // Asegúrate de usar "rows" y no "items"
                if (oBinding) {
                    oBinding.filter(aFilters);
                    console.log("Filtros aplicados a la tabla " + sTableId);
                } else {
                    console.error("No se encontró el enlace de las filas en la tabla " + sTableId);
                }
            } else {
                console.error("No se encontró la tabla con el ID: " + sTableId);
            }
        }
    });
});
