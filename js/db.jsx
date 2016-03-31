import Dexie from 'dexie'

const DBNAME = "nexttrain-offline-stations"
const VERSION = 1

let db = new Dexie(DBNAME)

db.version(VERSION).stores({ stations: "++id, name, station, fullname, sched_num" })

export default db
