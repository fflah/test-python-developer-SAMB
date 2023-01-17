from app import web, api
from app.controllers import BarangMasukController, BarangKeluarController, DataMasterController
from app.controllers.api import product, supplier, warehouse, customer

web.add_resource(BarangMasukController.IndexBarangMasuk, '/')
web.add_resource(BarangKeluarController.IndexBarangKeluar, '/barang-keluar')
web.add_resource(DataMasterController.ProductIndex, '/product')
web.add_resource(DataMasterController.SupplierIndex, '/supplier')
web.add_resource(DataMasterController.WarehouseIndex, '/warehouse')
web.add_resource(DataMasterController.CustomerIndex, '/customer')

api.add_resource(product.ApiProduct, '/get-product', endpoint='get-product')
api.add_resource(supplier.ApiSupplier, '/get-supplier', endpoint='get-supplier')
api.add_resource(warehouse.ApiWarehouse, '/get-warehouse', endpoint='get-warehouse')
api.add_resource(customer.ApiCustomer, '/get-customer', endpoint='get-customer')