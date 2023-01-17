from flask_restful import Resource
from flask import render_template, make_response
from app.models import *
from app import db
from flask import request, redirect, flash

class ProductIndex(Resource):
    def get(self):
        view = render_template('product.html')
        return make_response(view)
    
    def post(self):
        ProductName = request.form['ProductName']
        query = Product(ProductName=ProductName)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/product')

    def delete(self):
        id = request.form['id']
        Product.query.filter_by(ProductPK=id).delete()
        db.session.commit()


class SupplierIndex(Resource):
    def get(self):
        view = render_template('supplier.html')
        return make_response(view)
    
    def post(self):
        SupplierName = request.form['SupplierName']
        query = Supplier(SupplierName=SupplierName)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/supplier')

    def delete(self):
        id = request.form['id']
        Supplier.query.filter_by(SupplierPK=id).delete()
        db.session.commit()
    
    
class WarehouseIndex(Resource):
    def get(self):
        view = render_template('warehouse.html')
        return make_response(view)
    
    def post(self):
        WarehouseName = request.form['WhsName']
        query = Warehouse(WhsName=WarehouseName)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/warehouse')

    def delete(self):
        id = request.form['id']
        Warehouse.query.filter_by(WhsPK=id).delete()
        db.session.commit()
    
    
class CustomerIndex(Resource):
    def get(self):
        view = render_template('customer.html')
        return make_response(view)
    
    def post(self):
        CustomerName = request.form['CustomerName']
        query = Customer(CustomerName=CustomerName)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/customer')

    def delete(self):
        id = request.form['id']
        Customer.query.filter_by(CustomerPK=id).delete()
        db.session.commit()
    
    