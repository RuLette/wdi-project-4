# show page
# make sure secure

from lib.secure_route import secure_route
from flask import Blueprint, request, jsonify, g
from models.user import User, UserSchema

user_schema = UserSchema()

api = Blueprint('users', __name__)

@api.route('/users', methods=['GET'])
def index():

    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def show(user_id):

    user = User.query.get(user_id)
    return user_schema.jsonify(user), 200

@api.route('/users', methods=['POST'])
@secure_route
def create():
    user = request.get_json()
    user, errors = user_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422
    user.save()
    return user_schema.jsonify(user)

@api.route('/users/<int:user_id>', methods=['PUT'])
@secure_route
def update(user_id):
    user = User.query.get(user_id)
    user, errors = user_schema.load(request.get_json(), instance=user, partial=True)
    if errors:
        return jsonify(errors), 422
    user.save()
    return user_schema.jsonify(user)

@api.route('/users/<int:user_id>', methods=['DELETE'])
@secure_route
def delete(user_id):
    user = User.query.get(user_id)
    for x in user.created_qrafts:
        x.remove()
    user.remove()
    # qraft = Qraft.query.get(qraft_id)
    # qraft.remove()
    return '', 204

@api.route('/users/<int:user_id>/follow', methods=['GET'])
@secure_route
def follow(user_id):
    data = request.get_json()
    current_user = g.current_user
    followed_user = User.query.get(user_id)
    followed_user.followers.append(current_user)
    followed_user.save()
    return jsonify({'message': 'success'}), 200
