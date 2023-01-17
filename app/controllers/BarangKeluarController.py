from flask_restful import Resource
from flask import render_template, make_response
from app import db
from app.models import *
from flask import request, redirect, flash


class IndexBarangKeluar(Resource):
    def get(self):
        warehouse = Warehouse.query.all()
        supplier = Supplier.query.all()
        barang_keluar = TransaksiPengeluaranBarangHeader.query.with_entities(TransaksiPengeluaranBarangHeader.TrxOutNo, TransaksiPengeluaranBarangHeader.WhsIdf, TransaksiPengeluaranBarangHeader.TrxOutDate, TransaksiPengeluaranBarangHeader.TrxOutNotes).join(Warehouse, TransaksiPengeluaranBarangHeader.WhsIdf==Warehouse.WhsPK).join(Supplier, Supplier.SupplierPK==TransaksiPengeluaranBarangHeader.TrxOutSuppIdf).add_columns(Warehouse.WhsName, Supplier.SupplierName).all()
        view = render_template('barang_keluar.html', warehouse=warehouse, supplier=supplier, barang_keluar=barang_keluar)
        return make_response(view)
    
    def post(self):
        TrxOutNo = request.form['TrxOutNo']
        WhsIdf = request.form['WhsIdf']
        TrxOutDate = request.form['TrxOutDate']
        TrxOutSuppIdf = request.form['TrxOutSuppIdf']
        TrxOutNotes = request.form['TrxOutNotes']
        query = TransaksiPengeluaranBarangHeader(TrxOutNo=TrxOutNo, WhsIdf=WhsIdf, TrxOutDate=TrxOutDate, TrxOutSuppIdf=TrxOutSuppIdf, TrxOutNotes=TrxOutNotes)
        print('query', query)
        try:
            db.session.add(query)
            db.session.commit()
            flash('Produk berhasil diinput!', 'success')
        except Exception as e:
            db.session.rollback()
            db.session.flush()
            flash('Produk gagal diinput!', 'error')

        return redirect('/barang-keluar')