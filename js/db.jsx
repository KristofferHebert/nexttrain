import Dexie from 'dexie'

const DBNAME = "nexttrain-offline-stations"
const VERSION = 1

let db = new Dexie(DBNAME)

db.version(VERSION).stores({ stations: "++id, name, station, fullname, sched_num" })




// db.open()

// db.stations.put({name: "12th", details: {
//     'test': 1,
//     'test': 2,
//     'test': 3
// }})
//     .then(() => {
//         return console.log(db.stations.get('12th'))
//    }).catch((error) => {
//       alert ("BartDB Save Failed: " + error)
//    })

export default db
