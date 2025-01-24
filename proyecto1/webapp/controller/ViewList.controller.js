sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.ViewList", {

        onInit: function () {
            // Cargar datos desde el archivo JSON al inicializar la vista
            this._loadData("localService/layoutMP.json");
        },

        _loadData: function (sPath) {
            var oModel = new JSONModel();
            oModel.loadData(sPath);

            oModel.attachRequestCompleted(function () {
                console.log("Datos cargados correctamente:", oModel.getData());
            });

            oModel.attachRequestFailed(function (oEvent) {
                console.error("Error al cargar los datos:", oEvent.getParameter("statusCode"), oEvent.getParameter("statusText"));
            });

            this.getView().setModel(oModel, "layoutModel");
        },

        // Función para filtrar los productos por NoParte
        onSearchNoParte: function (oEvent) {
            var oTable = this.byId("idTable");
            var sQuery = oEvent.getParameter("newValue"); // Obtiene el valor del campo de búsqueda

            // Crea un filtro para buscar por NoParte
            var oFilterNoParte = new Filter("NoParte", FilterOperator.Contains, sQuery);

            // Aplica el filtro en la tabla
            var oBinding = oTable.getBinding("items");
            oBinding.filter([oFilterNoParte, this._getDescripcionFilter()]); // Mantener el filtro de descripción
        },
        _loadCategories: function(sPath) {
            var oModel = new JSONModel();
            oModel.loadData("localService/categoriasMP.json");
            oModel.loadData(sPath);

            oModel.attachRequestCompleted(function() {
                console.log("Categorías cargadas correctamente:", oModel.getData());
            });

            oModel.attachRequestFailed(function(oEvent) {
                console.error("Error al cargar las categorías:", oEvent.getParameter("statusCode"), oEvent.getParameter("statusText"));
            });

            this.getView().setModel(oModel, "categoriesModel");
        },

        // Función para filtrar los productos por Descripcion
        onSearchDescripcion: function (oEvent) {
            var oTable = this.byId("idTable");
            var sQuery = oEvent.getParameter("newValue"); // Obtiene el valor del campo de búsqueda

            // Aplica el filtro por descripción
            var oFilterDescripcion = new Filter("Descripcion", FilterOperator.Contains, sQuery);

            // Aplica el filtro en la tabla
            var oBinding = oTable.getBinding("items");
            oBinding.filter([this._getNoParteFilter(), oFilterDescripcion]); // Mantener el filtro de NoParte
        },

        // Función que obtiene el filtro actual de NoParte
        _getNoParteFilter: function () {
            var oSearchFieldNoParte = this.byId("searchNoParte");
            var sQuery = oSearchFieldNoParte.getValue();
            return new Filter("NoParte", FilterOperator.Contains, sQuery);
        },

        // Función que obtiene el filtro actual de Descripcion
        _getDescripcionFilter: function () {
            var oSearchFieldDescripcion = this.byId("searchDescripcion");
            var sQuery = oSearchFieldDescripcion.getValue();
            return new Filter("Descripcion", FilterOperator.Contains, sQuery);
        },
        // Filtro por Categoría
        onCategoryChange: function(oEvent) {
            var oTable = this.byId("idTable");
            var sCategory = oEvent.getParameter("selectedItem").getKey(); // Obtiene el ID de la categoría seleccionada
            var oBinding = oTable.getBinding("items");

            var oFilter;
            if (sCategory) {
                oFilter = new sap.ui.model.Filter("Categoria1", sap.ui.model.FilterOperator.Contains, sCategory); // Filtra por categoría
            } else {
                oFilter = null; // Si no hay filtro, muestra todos los productos
            }

            oBinding.filter([oFilter]);
        }

    });

});
