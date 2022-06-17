const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:botadmin@yumobot.amr6a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const connection = client.connect()

async function writeSt(data) {

    connection.then(() => {
        const collection = client.db("userData").collection("characters");
        const result = collection.insertOne(data);
        console.log(result.insertedId);
        return result.insertedId;
    });

}

async function readSt(guildId, userId, skill) {

    connection.then(() => {
        const collection = client.db("userData").collection("characters");
        const characterCursor = collection.find(
            {guild_id: guildId,
             user: userId}
        );

        console.log(guildId);
        console.log(userId);

        if (characterCursor.hasNext()) {
            const character = characterCursor.next();
            console.log(character);
            console.log(character[skill]);
        }
        else {
            console.log("Failed to retrieve data!")
        }
        
        return null;
    });

}

module.exports = {
    writeSt,
    readSt
}
