const fetch = require('node-fetch')

async function fetch_metadata(m, imdb_id) {
 
  console.dir(m)

  // Reject Non IMDB Ids
  if (!m.id.startsWith("tt")) {
    throw new Error("Non IMDB Id");
  } else {
    
    const req = await fetch(`https://v3-cinemeta.strem.io/meta/${m.type}/${imdb_id}.json`)
    const d = await req.json();
    console.dir(d)

    if (d.meta) {
      return d.meta
    } else {
      throw new Error("Invalid JSON Response.")
    }
  }
}

module.exports=fetch_metadata
