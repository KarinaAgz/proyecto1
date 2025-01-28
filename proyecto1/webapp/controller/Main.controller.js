sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("logaligroup.proyecto1.controller.Main", {
        onInit: function () {
            
// Configura un modelo JSON vacío y lo establece en la vista
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            // Cargar el archivo layoutPT.json
            var oModelPT = new JSONModel("localService/layoutPT.json");
            this.getView().setModel(oModelPT, "productosTerminados");

            // Cargar el archivo layoutIMPO.json
            var oModelIMPO = new JSONModel("localService/layoutIMPO.json");
            this.getView().setModel(oModelIMPO, "facturas");

            // Cargar el archivo layoutMP.json
            var oModelMP = new JSONModel("localService/layoutMP.json");
            this.getView().setModel(oModelMP, "productos");

            // Cargar otros modelos si es necesario, por ejemplo para clientes y proveedores
            var oClientes = new JSONModel("localService/clientes.json");
            this.getView().setModel(oClientes, "clientes");

            var oProveedores = new JSONModel("localService/proveedores.json");
            this.getView().setModel(oProveedores, "proveedores");
            },

        onPressViewList: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (oRouter) {
                oRouter.navTo("viewList");
                this._loadData("localService/layoutIMPO.json");  // Cargar layoutIMPO.json
            }
        },
        
        onPressViewFacturaciones: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("viewFacturaciones");
            this._loadData("localService/layoutM.json");  // Cargar layoutM.json
        },
        
        onPressViewPT: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("viewPT");
            this._loadData("localService/layoutPT.json");  // Cargar layoutPT.json
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

        // Filtrar los datos por "Cliente"
        onApplyFilters: function () {
            var oFilter = new Filter("Cliente", FilterOperator.EQ, "CLT-001"); // Filtra por Cliente: CLT-001
            var oBinding = this.getView().byId("facturasList").getBinding("items"); // Accede al binding de la tabla de facturas
            if (oBinding) {
                oBinding.filter(oFilter); // Aplica el filtro
            } else {
                console.error("No se encontró el binding de los ítems.");
            }
        }
    });
});
