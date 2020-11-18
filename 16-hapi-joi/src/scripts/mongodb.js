// docker ps
// docker exec -it 52b8093e21de `
// mongo -u brenodoval -p minhasenhasecreta --authenticationDatabase herois

// databases
/* show dbs */

// mudando o contexto para uma database
/* use herois */

// mostrar collections
/* show collections */

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find().pretty()

for(let i = 0; i <= 10000; i++) {
    db.herois.insert({
        nome: `Clone - ${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count();
db.herois.findOne();
db.herois.find().limit(1000).sort({ nome: -1});
db.herois.find({}, { poder: 1, _id: 0 });

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
});

// read
db.herois.find();

//update
db.herois.update({ _id: ObjectId("5fa960464e1effa2597293fc")},{nome: 'Mulher Maravilha'});

db.herois.update({ _id: ObjectId("5fa960d94e1effa25972bb0c") }, { $set: { nome: 'Lanterna Verde' } });

//delete
db.herois.remove({});
