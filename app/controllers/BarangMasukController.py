from flask_restful import Resource
from flask import render_template, make_response
from app import db
from app.models import *
from flask import request, redirect, flash


class IndexBarangMasuk(Resource):
    def get(self):
        warehouse = Warehouse.query.all()
        supplier = Supplier.query.all()
        barang_masuk = TransaksiPenerimaanBarangHeader.query.with_entities(TransaksiPenerimaanBarangHeader.TrxInNo, TransaksiPenerimaanBarangHeader.WhsIdf, TransaksiPenerimaanBarangHeader.TrxInDate, TransaksiPenerimaanBarangHeader.TrxInNotes).join(Warehouse, TransaksiPenerimaanBarangHeader.WhsIdf==Warehouse.WhsPK).join(Supplier, Supplier.SupplierPK==TransaksiPenerimaanBarangHeader.TrxInSuppIdf).add_columns(Warehouse.WhsName, Supplier.SupplierName).all()
        print(barang_masuk)
        view = render_template('barang_masuk.html', warehouse=warehouse, supplier=supplier, barang_masuk=barang_masuk)
        return make_response(view)
    
    def post(self):
        TrxInNo = request.form['TrxInNo']
        WhsIdf = request.form['WhsIdf']
        TrxInDate = request.form['TrxInDate']
        TrxInSuppIdf = request.form['TrxInSuppIdf']
        TrxInNotes = request.form['TrxInNotes']
        query = TransaksiPenerimaanBarangHeader(TrxInNo=TrxInNo, WhsIdf=WhsIdf, TrxInDate=TrxInDate, TrxInSuppIdf=TrxInSuppIdf, TrxInNotes=TrxInNotes)
        print('query', query)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/')