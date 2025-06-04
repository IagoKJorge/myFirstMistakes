const listSpace: object[] = [];

function createSpaceship() {
  let name: string = prompt("Qual é o nome da nave?");
  let pilot: string = prompt("Qual é o nome do piloto?");
  let crewLimit: number = Number(
    prompt("Qual é o tamanho máximo da tripulação?")
  );
  let crew: string[] = [];
  let inMission: boolean = false;
  listSpace.push({ name, pilot, crewLimit, crew, inMission })
  return true;
};

function addCrew (spaceship: {crew:  string[], crewLimit: number }, member: string){
  if(spaceship.crew.length > spaceship.crewLimit) return "Exceeded crew members";
  spaceship.crew.push(member);
  return `Member ${member} has been added to the crew`; 
};

function sendMission(spaceship: {crew:  string[], crewLimit: number, inMission:boolean }){
  if(Math.floor(spaceship.crewLimit / 3) <= spaceship.crew.length && !spaceship.inMission){
    spaceship.inMission = true;
    return true;
  }

  return "Number of crew members is insufficient";
}


function consoleShips(listSpace: object[]){
  listSpace.forEach((space) => console.log(space));
}