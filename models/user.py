from datetime import datetime, timedelta
from app import db, ma, bcrypt
from config.environment import secret
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, validate, fields
from .base import BaseModel, BaseSchema

followers = db.Table('followers',
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(28), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    profile_description = db.Column(db.String(200), unique=True)
    profile_picture = db.Column(db.String(200), unique=True)
    password_hash = db.Column(db.String(128))

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token

    followed = db.relationship(
      'User',
      secondary=followers,
      primaryjoin='User.id==followers.c.follower_id',
      secondaryjoin='User.id==followers.c.followed_id',
      backref=db.backref('followers', lazy='dynamic')
    )

class UserSchema(ma.ModelSchema, BaseSchema):

    @validates_schema
    #pylint: disable=R0201
    def check_passwords_match(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
            'Passwords do not match',
            'password_confirmation'
            )

    password = fields.String(
        required=True,
        validate=[validate.Length(min=8, max=50)]
    )

    password_confirmation = fields.String(required=True)

    created_qrafts = fields.Nested('QraftSchema', many=True)

    likes = fields.Nested('QraftSchema', many=True, only=('id', 'name'))

    followed = fields.Nested('UserSchema', many=True, only=('username', 'id'))
    followers = fields.Nested('UserSchema', many=True, only=('username', 'id'))
    created_comments = fields.Nested('UserSchema', many=True, only=('username', 'id'))

    class Meta:
        model = User
        exclude = ('password_hash',)
