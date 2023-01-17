from app import db
from datetime import date

class Supplier(db.Model):
    SupplierPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    SupplierName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Supplier {}>'.format(self.SupplierName)


class Customer(db.Model):
    CustomerPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CustomerName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Customer {}>'.format(self.CustomerName)


class Product(db.Model):
    ProductPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ProductName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Product {}>'.format(self.ProductName)


class Warehouse(db.Model):
    WhsPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    WhsName = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Warehouse {}>'.format(self.WhsName)


class TransaksiPenerimaanBarangHeader(db.Model):
    TrxInPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TrxInNo = db.Column(db.String(255), nullable=False)
    WhsIdf = db.Column(db.Integer, nullable=False)
    TrxInDate =  db.Column(db.Date, default=date.today())
    TrxInSuppIdf = db.Column(db.Integer, nullable=False)
    TrxInNotes = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<TransaksiPenerimaanBarangHeader {}>'.format(self.TrxInNo)


class TransaksiPengeluaranBarangHeader(db.Model):
    TrxOutPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TrxOutNo = db.Column(db.String(255), nullable=False)
    WhsIdf = db.Column(db.Integer, nullable=False)
    TrxOutDate =  db.Column(db.Date, default=date.today())
    TrxOutSuppIdf = db.Column(db.Integer, nullable=False)
    TrxOutNotes = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<TransaksiPengeluaranBarangHeader {}>'.format(self.TrxOutNo)


class TransaksiPengeluaranBarangDetail(db.Model):
    TrxOutDPK = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TrxOutIDF = db.Column(db.Integer, db.ForeignKey(TransaksiPengeluaranBarangHeader.TrxOutPK))
    TrxOutDProductIdf = db.Column(db.Integer, nullable=False)
    TrxOutDQtyDus = db.Column(db.Integer)
    TrxOutDQtyPcs = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<TransaksiPengeluaranBarangDetail {}>'.format(self.TrxOutIDF)