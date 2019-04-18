from marshmallow import fields
from app import db, ma
from .base import BaseModel

class Material(db.Model, BaseModel):

    __tablename__ = 'materials'

    name = db.Column(db.String(40), unique=True, nullable=False)

class MaterialSchema(ma.ModelSchema):
    # qrafts = fields.Nested('QraftSchema', many=True, exclude=('materials', 'comments'))
    class Meta:
        model = Material
