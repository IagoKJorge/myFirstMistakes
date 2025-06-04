var listSpace = [];
function createSpaceship() {
    var name = prompt("Qual é o nome da nave?");
    var pilot = prompt("Qual é o nome do piloto?");
    var crewLimit = Number(prompt("Qual é o tamanho máximo da tripulação?"));
    var crew = [];
    var inMission = false;
    listSpace.push({ name: name, pilot: pilot, crewLimit: crewLimit, crew: crew, inMission: inMission });
    return true;
}
;
function addCrew(spaceship, member) {
    if (spaceship.crew.length > spaceship.crewLimit)
        return "Exceeded crew members";
    spaceship.crew.push(member);
    return "Member ".concat(member, " has been added to the crew");
}
;
function sendMission(spaceship) {
    if (Math.floor(spaceship.crewLimit / 3) <= spaceship.crew.length && !spaceship.inMission) {
        spaceship.inMission = true;
        return true;
    }
    return "Number of crew members is insufficient";
}
function consoleShips(listSpace) {
    listSpace.forEach(function (space) { return console.log(space); });
}
