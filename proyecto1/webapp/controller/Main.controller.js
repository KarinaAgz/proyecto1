sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.Main", {
        onInit: function () {
            // Asignar un modelo vacío a la vista para ocultar los datos al inicio
            var oEmptyModel = new JSONModel({ facturas: [] });
            this.getView().setModel(oEmptyModel, "facturas");
        
            var oEmptyModelMP = new JSONModel({ productos: [] });
            this.getView().setModel(oEmptyModelMP, "productos");

            var oEmptyModelPT = new JSONModel({ productos_terminados: [] });
            this.getView().setModel(oEmptyModelPT, "productos_terminados");

            console.log(" Modelos vacíos establecidos, datos ocultos al inicio.");
        },

        // Método manual para cargar datos cuando sea necesario
        loadModels: function () {
            var oView = this.getView();
        
            // Cargar modelo para "facturas"
            var oModelFacturas = new JSONModel("localService/layoutIMPO.json");
            oModelFacturas.attachRequestCompleted(function () {
                oView.setModel(oModelFacturas, "facturas");
                console.log(" Datos de facturas cargados.");
            });

            // Cargar modelo para "productos"
            var oModelProductos = new JSONModel("localService/layoutMP.json");
            oModelProductos.attachRequestCompleted(function () {
                oView.setModel(oModelProductos, "productos");
                console.log(" Datos de productos cargados.");
            });

            // Cargar modelo para "productos terminados"
            var oModelProductosTerminados = new JSONModel("localService/layoutPT.json");
            oModelProductosTerminados.attachRequestCompleted(function () {
                oView.setModel(oModelProductosTerminados, "productos_terminados");
                console.log(" Datos de productos terminados cargados.");
            });
        },
        onLiveChangeFilters: function () {
            var oView = this.getView();
            var oModelFacturas = oView.getModel("facturas");

            if (!oModelFacturas || !oModelFacturas.getData()) {
                console.warn(" No hay datos en el modelo aún, no se aplicarán filtros.");
                return;
            }

            var oData = oModelFacturas.getData();
            console.log(" Datos actuales en facturas:", oData);

            var oDateRange = this.byId("DateRange");
            var oStartDate = oDateRange.getDateValue();
            var oEndDate = oDateRange.getSecondDateValue();
            var oInvoiceInput = this.byId("Input_Invoice");
            var oMaterialInput = this.byId("Input_Material");
            var oOrdenCompraInput = this.byId("Input_OrdenCompra");
            var oClienteInput = this.byId("Input_Cliente");
            var oProveedorInput = this.byId("Input_Proveedor");

            var aFilters = [];

            if (oStartDate && oEndDate) {
                var startDateString = this._formatDateForFilter(oStartDate);
                var endDateString = this._formatDateForFilter(oEndDate);

                aFilters.push(
                    new Filter("FDesde", FilterOperator.LE, endDateString),
                    new Filter("FHasta", FilterOperator.GE, startDateString)
                );
            }

            if (oInvoiceInput.getValue()) {
                aFilters.push(new Filter("Factura", FilterOperator.Contains, oInvoiceInput.getValue()));
            }

            if (oMaterialInput.getValue()) {
                aFilters.push(new Filter("Material", FilterOperator.Contains, oMaterialInput.getValue()));
            }

            if (oOrdenCompraInput.getValue()) {
                aFilters.push(new Filter("OrdenDeCompra", FilterOperator.Contains, oOrdenCompraInput.getValue()));
            }

            if (oClienteInput.getValue()) {
                aFilters.push(new Filter("Cliente", FilterOperator.Contains, oClienteInput.getValue()));
            }

            if (oProveedorInput.getValue()) {
                aFilters.push(new Filter("Proveedor", FilterOperator.Contains, oProveedorInput.getValue()));
            }

            // Aplicar los filtros a las tablas
            this.applyFiltersToTable("Table_Virtual", aFilters);
            this.applyFiltersToTable("Table_MP", aFilters);
            this.applyFiltersToTable("Table_PT", aFilters);
        },

        _formatDateForFilter: function (oDate) {
            if (oDate instanceof Date) {
                var day = String(oDate.getDate()).padStart(2, "0");
                var month = String(oDate.getMonth() + 1).padStart(2, "0");
                var year = oDate.getFullYear();
                return `${year}-${month}-${day}`;
            }
            return oDate;
        },

        applyFiltersToTable: function (sTableId, aFilters) {
            var oTable = this.byId(sTableId);
            if (!oTable) {
                console.error(" No se encontró la tabla con el ID: " + sTableId);
                return;
            }

            var oBinding = oTable.getBinding("rows");
            if (!oBinding) {
                console.error(" No se encontró el binding en la tabla " + sTableId);
                return;
            }

            console.log(" Aplicando filtros a la tabla " + sTableId, aFilters);
            oBinding.filter(aFilters);
        },
        onExportAllTables: function () {
            var oFacturas = this.getView().getModel("facturas").getData().facturas ?? [];
            var oProductos = this.getView().getModel("productos").getData().productos ?? [];
            var oProductosTerminados = this.getView().getModel("productos_terminados").getData().productos_terminados ?? [];
        
            if (oFacturas.length === 0 && oProductos.length === 0 && oProductosTerminados.length === 0) {
                sap.m.MessageToast.show("No hay datos para exportar.");
                return;
            }
        
            var wb = XLSX.utils.book_new();
        
            if (oFacturas.length > 0) {
                var wsFacturas = XLSX.utils.json_to_sheet(oFacturas);
                XLSX.utils.book_append_sheet(wb, wsFacturas, "Facturas");
            }
        
            if (oProductos.length > 0) {
                var wsProductos = XLSX.utils.json_to_sheet(oProductos);
                XLSX.utils.book_append_sheet(wb, wsProductos, "Productos");
            }
        
            if (oProductosTerminados.length > 0) {
                var wsProductosTerminados = XLSX.utils.json_to_sheet(oProductosTerminados);
                XLSX.utils.book_append_sheet(wb, wsProductosTerminados, "Productos Terminados");
            }
        
            // Descargar archivo
            XLSX.writeFile(wb, "Reporte.xlsx");
        }
        
        
    });
});
