from lib.secure_route import secure_route
from flask import Blueprint, request, jsonify, g
from models.material import Material, MaterialSchema

api = Blueprint('materials', __name__)
materials_schema = MaterialSchema()

@api.route('/materials', methods=['GET'])

def index():
    materials = Material.query.all()
    return materials_schema.jsonify(materials, many=True), 200

@api.route('/materials/<int:material_id>', methods=['GET'])
def show(material_id):

    material = Material.query.get(material_id)
    return materials_schema.jsonify(material), 200

@api.route('/materials', methods=['POST'])
@secure_route
def create():
    material, errors = materials_schema.load(request.get_json())
    if errors:
        return jsonify(errors, 422)
    material.save()
    return materials_schema.jsonify(material)

@api.route('/materials/<int:material_id>', methods=['PUT'])
@secure_route
def update(material_id):
    material = Material.query.get(material_id)
    material, errors = materials_schema.load(request.get_json(), instance=material, partial=True)
    if errors:
        return jsonify(errors), 422
    material.save()
    return materials_schema.jsonify(material)


@api.route('/materials/<int:material_id>', methods=['DELETE'])
@secure_route
def delete(material_id):
    material = Material.query.get(material_id)
    material.remove()
    return '', 204
