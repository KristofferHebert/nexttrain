const xml2json = require('xml-to-js')

function toJSON(xml){

    return xml2json.toJson(xml)
}

export default toJSON
