from marshmallow import fields
from app import db, ma
from .base import BaseModel
from models.material import Material, MaterialSchema
from models.user import User, UserSchema

materials_qrafts = db.Table('materials_qrafts',
    db.Column('material_id', db.Integer, db.ForeignKey('materials.id'), primary_key=True),
    db.Column('qraft_id', db.Integer, db.ForeignKey('qrafts.id'), primary_key=True)
)

class Qraft(db.Model, BaseModel):
    __tablename__ = 'qrafts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    photo = db.Column(db.String(400), nullable=False)
    dimensions = db.Column(db.String(100))
    description = db.Column(db.String(600))
    orderable = db.Column(db.String(20), nullable=False)
    instructions_main = db.Column(db.String(500))
    instructions_primary = db.Column(db.String(400))
    photo_additional1 = db.Column(db.String(400))
    photo_additional2 = db.Column(db.String(400))
    materials = db.relationship('Material', secondary=materials_qrafts, backref='qrafts')
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator = db.relationship('User', backref='created_qrafts')

class QraftSchema(ma.ModelSchema):
    comments = fields.Nested('CommentSchema', many=True, only=('content', 'id', 'created_at', 'owner'))
    materials = fields.Nested('MaterialSchema', many=True, exclude=('qrafts', 'created_at', 'updated_at'))
    creator = fields.Nested('UserSchema', only=('id', 'username', 'profile_description', 'profile_picture', 'email'))
    class Meta:
        model = Qraft

class Comment(db.Model, BaseModel):
# do creator and creator id same as craft for comments
    __tablename__ = 'comments'

    content = db.Column(db.Text, nullable=False)
    qraft_id = db.Column(db.Integer, db.ForeignKey('qrafts.id'))
    qraft = db.relationship('Qraft', backref='comments')
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', backref='created_comments')

class CommentSchema(ma.ModelSchema):
# add a creator fielf to this comment schemca
    owner = fields.Nested('UserSchema', only=('username', 'id', 'profile_picture'))
    class Meta:
        model = Comment
