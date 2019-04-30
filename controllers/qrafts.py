from lib.secure_route import secure_route
from flask import Blueprint, request, jsonify, g
from models.qraft import Qraft, QraftSchema, Comment, CommentSchema, Material, MaterialSchema

from models.material import Material

qraft_schema = QraftSchema()
comment_schema = CommentSchema()

api = Blueprint('qrafts', __name__)


@api.route('/qrafts', methods=['GET'])
def index():

    qrafts = Qraft.query.all()

    return qraft_schema.jsonify(qrafts, many=True), 200

@api.route('/qrafts/<int:qraft_id>', methods=['GET'])
def show(qraft_id):

    qraft = Qraft.query.get(qraft_id)

    return qraft_schema.jsonify(qraft), 200

@api.route('/qrafts', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    qraft, errors = qraft_schema.load(request.get_json())
    qraft.creator = g.current_user
    if errors:
        return jsonify(errors), 422
    material = Material.query.get(data['material_id'])
    qraft.materials.append(material)
    qraft.save()
    return qraft_schema.jsonify(qraft)

@api.route('/qrafts/<int:qraft_id>', methods=['PUT'])
@secure_route
def update(qraft_id):
    qraft = Qraft.query.get(qraft_id)
    qraft, errors = qraft_schema.load(request.get_json(), instance=qraft, partial=True)
    if errors:
        return jsonify(errors), 422

    if qraft.creator != g.current_user:
        print(qraft.creator)
        print(g.current_user)
        return jsonify({'message': 'Unauthorized'}), 401

    qraft.save()
    return qraft_schema.jsonify(qraft)

@api.route('/qrafts/<int:qraft_id>', methods=['DELETE'])
@secure_route
def delete(qraft_id):
    qraft = Qraft.query.get(qraft_id)
    if qraft.creator != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    qraft.remove()
    return '', 204

@api.route('/qrafts/<int:qraft_id>/comments', methods=['POST'])
@secure_route

def comment_create(qraft_id):
    data = request.get_json()
    qraft = Qraft.query.get(qraft_id)
    user = g.current_user
    comment, errors = comment_schema.load(data)
    if errors:
        return jsonify(errors), 422
    comment.qraft = qraft
    comment.owner = user
    comment.save()
    return comment_schema.jsonify(comment)

@api.route('/qrafts/<int:qraft_id>/comments/<int:comment_id>', methods=['DELETE'])
@secure_route
def comment_delete(**kwargs):
    comment = Comment.query.get(kwargs['comment_id'])
    comment.remove()
    return '', 204
