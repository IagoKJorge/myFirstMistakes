type Planet = {name:string, coordinates: [number, number, number, number], situation: "habitado" | "habitável" | "inabitável" | "inexplorado", satellites: string[]}

function savePlanet(planet:Planet){

  return planet;

}

function updatePlanet(planet:Planet, situation:  "habitado" | "habitável" | "inabitável" | "inexplorado"){
  planet.situation = situation;
}

function updateSatellite(planet:Planet, satellite: "string"){
  planet.satellites.push(satellite);
}

function removeSatellite(planet:Planet, satellite: "string"){
  let idx = planet.satellites.indexOf(satellite);
  planet.satellites.splice(idx, 1);
}