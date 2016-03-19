import Dexie from 'dexie'

let db = new Dexie("BartDB")

db.version(1).stores({ stations: "++id, name, details" })

db.open()

db.stations.put({name: "12th", details: {
    'test': 1,
    'test': 2,
    'test': 3
}})
    .then(() => {
        return console.log(db.stations.get('12th'))
   }).catch((error) => {
      alert ("BartDB Save Failed: " + error)
   })

export default db
