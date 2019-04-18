from app import app, db #import app and db

from models.qraft import Qraft, Comment
from models.material import Material
from models.user import UserSchema
user_schema = UserSchema()

with app.app_context():
    db.drop_all()
    db.create_all()

    ru, errors = user_schema.load({
        'username': 'Ru',
        'email': 'ru@email',
        'password': 'password',
        'password_confirmation': 'password',
        'profile_picture': 'https://react.semantic-ui.com/images/avatar/large/molly.png',
        'profile_description': 'London based interior designer, Ru has a wealth of knowledge and expertise, having worked in both the luxury residential and commercial interior design sectors worldwide for over twenty years.'

    })

    if errors:
        raise Exception(errors)

    db.session.add(ru)

    zoe, errors = user_schema.load({
        'username': 'Zoe',
        'email': 'zoe@email',
        'password': 'password',
        'password_confirmation': 'password',
        'profile_picture': 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
        'profile_description': 'Extensive experience in floral design, fabrics, fashion design, interior design, DIY, catering and technical production., '
    })

    if errors:
        raise Exception(errors)

    db.session.add(zoe)

    tim, errors = user_schema.load({
        'username': 'Tim',
        'email': 'tim@email',
        'password': 'password',
        'password_confirmation': 'password',
        'profile_picture': 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
        'profile_description': 'Tim is a product and furniture designer. Currently he is a freelance designer next to developing his personal projects.'
    })

    if errors:
        raise Exception(errors)

    db.session.add(tim)

    wes, errors = user_schema.load({
        'username': 'Wes',
        'email': 'wes@email',
        'password': 'password',
        'password_confirmation': 'password',
        'profile_picture': 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        'profile_description': 'Wes is a Senior Product Designer at DoorDash & Product Design Instructor at Tradecraft.'
    })

    if errors:
        raise Exception(errors)

    db.session.add(wes)

    orjon, errors = user_schema.load({
        'username': 'Orjon',
        'email': 'orjon@email',
        'password': 'password',
        'password_confirmation': 'password',
        'profile_picture': 'https://react.semantic-ui.com/images/avatar/large/christian.jpg',
        'profile_description': 'I trained at the London College of Furniture (now part of London Metropolitan University). Studied the Arts and Crafts movement and made furniture in my spare time.'
    })

    if errors:
        raise Exception(errors)

    db.session.add(orjon)

    wood = Material(name='Wood')
    steel = Material(name='Steel')
    stone = Material(name='Stone')
    plastic = Material(name='Plastic')
    other = Material(name='Other')

    wabisabitable= Qraft(name='Wabi Sabi table', photo='https://lh3.googleusercontent.com/RNTh3F46RdQUt9bNlcpPdq2wgv9MgaDJCvLhp22zYpZM0C-5RTPH1E4oTuX0UuxyVVIR-vW1R7pfxY91ZjYyYnco0PVpr0E5bo4RcXpCrlTdoiYvi1Q0QmI0Qo-BYbqftVnnX-XZ=w2400', dimensions='Small: 30 inches height. Diameter of table top 30cm. Medium: 40 inches. Diameter of table top 40cm.', materials=[wood, steel], description='Wabi Sabi blends a mix of Japanese culture, traditional carpentry, and the beauty of imperfection. The rustic aspects of the wooden pedestal base, shown in its rawest, most pure state, highlight the allure of flaws. Each piece is unique to the person as it’s not complete until the owner takes a hammer to it.', instructions_main='The piece highlights the evolution of a piece of furniture, from bottom to top, from a natural, 30 by 30cm oyamel wood log up to the finished, circular marble tabletop. Topping it all off is the crown – a brass turned wedge.',
    instructions_primary ='When the wedge is driven in, it speeds up the wood cracking process, helping it secure the marble. Once the table is in the hands of its owner, the table becomes complete when the brass wedge is driven in. The final result is dependent on the strength of the person with the hammer, essentially freezing that moment in time and the final result of the piece.',
    photo_additional1 = 'assets/images/wabisabi2.jpg',  photo_additional2 = 'assets/images/wabisabi3.jpg',orderable="Yes", creator=zoe)

    hairpindoor = Qraft(name='Old door with hairpin legs', photo='assets/images/hairpintable.jpeg', dimensions='400 by 400', materials=[wood, steel, plastic], description='This live-edge wood slab has been carefully sanded and oiled for a beautiful finish. It\'s fitted with a set of minimal hairpin legs. They give the wood a floating effect, without distracting from its natural character.', instructions_main='The piece highlights the evolution of a piece of furniture, from bottom to top, from a natural, 30 by 30cm oyamel wood log up to the finished, circular marble tabletop. Topping it all off is the crown – a brass turned wedge.', instructions_primary ='When the wedge is driven in, it speeds up the wood cracking process, helping it secure the marble. Once the table is in the hands of its owner, the table becomes complete when the brass wedge is driven in. The final result is dependent on the strength of the person with the hammer, essentially freezing that moment in time and the final result of the piece.', orderable="Yes", creator=tim)

    catlitterbox = Qraft(name='Cat Litter Box', photo='assets/images/catlitterbox.jpg', dimensions='20 x 16 x 10 inch', materials=[wood, plastic], description='This elegant and stylish piece of furniture is made of spruce wood and stained and it fits into every home decor. It ensures that the ugly plastic litter box is not visible anymore. It can be also used as a side table or a hideaway for your pet.', instructions_main='Buy a cat', orderable="No", creator=ru)

    dicetable = Qraft(name='Dice table', photo='https://lh3.googleusercontent.com/fO69efpoSh3NbWQB6CsKCNb3pvFrbW3zhKcTMwwwJHJgeXy43xr_UooD4UyEAYocb9GNCCbyHraBCWaSXtJvRgAirygnTCRZs1JG9LF1h9Zs9nUs48EdLXwd7VAGoeXUaRwmNqTg=w2400', dimensions='200cm high, 40cm wide', materials=[wood, steel], description='This elegant and stylish piece of furniture is made of spruce wood and stained and it fits into every home decor. It ensures that the ugly plastic litter box is not visible anymore. It can be also used as a side table or a hideaway for your pet.', instructions_main='Whatever', orderable="No", creator=wes)

    drawertable = Qraft(name='Drawer coffee table', photo='assets/images/drawers2.jpg', dimensions='Available on request', materials=[wood, plastic, steel], description='This coffee table has a shelf that gives you space to keep magazines, newspaper, books, etc. It also has two drawers that help in storing books, utility objects and the likes.', instructions_main='Buy it please', orderable="No", creator=orjon)

    branchout = Qraft(name='Branchout', photo='assets/images/branchout1.jpg', dimensions='60 inches high', materials=[wood, plastic, steel], description='If your living quarters tend on the titchy side, this might just be the perfect piece of furniture to complete your pint-sized pad. Yep, it’s a lamp, table and floating flowerpot, all in one elegant, tree-inspired design. Handmade with love', instructions_main='The stand can be reconfigured to your liking, allowing you to switch its limbs back and forth in a layout that suits your needs.', instructions_primary = '100% Recycled PET and FSC-Certified Beech. The natural timber base taken from timber harvested from carefully monitored sources, it has great aesthetic appeal as well.', photo_additional1 = 'assets/images/branchout2.jpg', orderable="No", creator=tim)

    crossstitchchair = Qraft(name='Cross Stitch chair', photo='assets/images/cross-stitch-chair1.jpg', dimensions='Seat width: 32cm,40cm, Seat depth: 29cm,37', materials=[wood], description='If your living quarters tend on the titchy side, this might just be the perfect piece of furniture to complete your pint-sized pad. Yep, it’s a lamp, table and floating flowerpot, all in one elegant, tree-inspired design. Handmade with love', instructions_main='Danish oil is a lovely alternative to varnish as it conditions the wood and gives a lovely silky satin finish, as well as bringing out the woods natural colour.'
    , instructions_primary = 'Using some yarn I marked out the center line of the weave on both the seat and back of the chair to help me center the design.', photo_additional1 = 'assets/images/cross-stitch-chair-2.jpg', orderable="Yes", creator=orjon)

    daybed = Qraft(name='Camp daybed', photo='assets/images/Daybed-01.jpg', dimensions='Seat width: 32cm,40cm, Seat depth: 29cm,37', materials=[steel], description='A sleeping bag crossed with a sofa – the perfect solution for unexpected guests. Great use of color as well', instructions_main='The camp daybed is a sleeping bag with legs, on which we can relax during the day and sleep at night. It has a very deep seat to provide ample space for sleeping.', instructions_primary = 'Tubular Steel, Vinyl Straps, Mesh Fabric, Cotton, Zippers, Elastic bands', photo_additional1 = 'assets/images/Daybed-02.jpg', orderable="Yes", creator=orjon)

    plasticstool = Qraft(name='Recycled Plastic Fantastic', photo='assets/images/plasticstool.jpg', dimensions='Contact for size', materials=[plastic], description='A collection made of 100% recycled plastic is not easy. There a lot of effort in guaranteeing safety and insisting on high quality. This makes it more complicated and difficult than making new design furniture from virgin plastic. All products are made of ecothylene.', instructions_main='90 per cent of kids’ toys continue to be made with plastic, and on average are used for about six months, max.', photo_additional1 = 'assets/images/plasticstool2.jpg', orderable="Yes", creator=zoe)

    comment1 = Comment(content='I love this table', qraft=hairpindoor, owner=ru)
    comment2 = Comment(content='Its pretty', qraft=catlitterbox, owner=tim)
    comment3 = Comment(content='Really cute', qraft=dicetable, owner=zoe)
    comment4 = Comment(content='Definitely my type', qraft=dicetable, owner=wes)
    comment5 = Comment(content='Looks hard to make', qraft=drawertable, owner=orjon)
    comment6 = Comment(content='Could do with a coat of paint', qraft=wabisabitable, owner=tim)
    comment7 = Comment(content='Do you love it? I love it. A LOT!', qraft=crossstitchchair, owner=orjon)
    comment8 = Comment(content='Wish this was commercially available', qraft=daybed, owner=wes)
    comment9 = Comment(content='Are you sure these chairs are biodegradable?', qraft=daybed, owner=ru)

    db.session.add(wood)
    db.session.add(steel)
    db.session.add(stone)
    db.session.add(plastic)
    db.session.add(other)
    db.session.add(hairpindoor)
    db.session.add(catlitterbox)
    db.session.add(dicetable)
    db.session.add(branchout)
    db.session.add(wabisabitable)
    db.session.add(crossstitchchair)
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)

    db.session.commit()
