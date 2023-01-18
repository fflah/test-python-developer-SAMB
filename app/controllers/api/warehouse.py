from app.response import response
from flask_restful import Resource
from app.models import Warehouse
from flask import request
from app import db


class ApiWarehouse(Resource):
    def get(self):
        query = Warehouse.query

        # search filter
        search = request.args.get('search[value]')
        if search:
            query = query.filter(db.or_(
                Warehouse.WhsName.like(f'%{search}%'),
            ))
        total_filtered = query.count()

        # sorting
        order = []
        i = 0
        while True:
            col_index = request.args.get(f'order[{i}][column]')
            if col_index is None:
                break
            col_name = request.args.get(f'columns[{col_index}][data]')
            if col_name not in ['WhsName']:
                col_name = 'WhsName'
            descending = request.args.get(f'order[{i}][dir]') == 'desc'
            col = getattr(Warehouse, col_name)
            if descending:
                col = col.desc()
            order.append(col)
            i += 1
        if order:
            query = query.order_by(*order)

        # pagination
        start = request.args.get('start', type=int)
        length = request.args.get('length', type=int)
        query = query.offset(start).limit(length)
        data = []
        for index, item in enumerate([product.__dict__ for product in query.all()]):
            buff = {
                'no': index+1,
                'id': item['WhsPK'],
                'WhsName': item['WhsName']
            }
            data.append(buff)

        data = sorted(data, key=lambda d: d['id']) 
        # response
        return {
            'data': data,
            'recordsFiltered': total_filtered,
            'recordsTotal': Warehouse.query.count(),
            'draw': request.args.get('draw', type=int),
        }
        