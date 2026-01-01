import api from "./api.js";
import { RegisterMultiEvents } from "./utils.js";

const planetsGrid = document.getElementById("planets-grid");
const planetDetailImage = document.getElementById("planet-detail-image");
const planetDetailName = document.getElementById("planet-detail-name");
const planetDetailDesc = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRadius = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbitalPeriod = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");
const planetDiscoverer = document.getElementById("planet-discoverer");
const planetDiscoveryDate = document.getElementById("planet-discovery-date");
const planetBodytype = document.getElementById("planet-body-type");
const planetVolume = document.getElementById("planet-volume");
const planetPerihelion = document.getElementById("planet-perihelion");
const planetAphelion = document.getElementById("planet-aphelion");
const planetEccentricity = document.getElementById("planet-eccentricity");
const planetInclination = document.getElementById("planet-inclination");
const planetAxialTilt = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscape = document.getElementById("planet-escape");
const planetTbody = document.getElementById("planet-comparison-tbody");

let planetsData;

async function DisplayPlanets() {
  planetsData = await api.GetPlanets();
  DisplayPlanetsGrid(planetsData);
  DisplayPlanetInfo(6);
}

function DisplayPlanetsGrid(planets) {
  let planetsHTML = "";

  planets.bodies.forEach((planet) => {
    const AU = CalculateAU(planet);

    planetsHTML += `
                    <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${planet.id}"
              style="--planet-color: #eab308"
              onmouseover="this.style.borderColor='#eab30880'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planet.image}"
                  alt="${planet.englishName}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${AU} AU</p>
            </div>`;
  });
  planetsGrid.innerHTML = planetsHTML;
  console.log(planets);
}
function CalculateAU(planet) {
  const AU_IN_KM = 149_597_870.7;
  const AU = (planet.semimajorAxis / AU_IN_KM).toFixed(2);
  return AU;
}

function DisplayPlanetInfo(clickedPlanetIndex) {
  const planet = planetsData.bodies[clickedPlanetIndex];
  planetDetailImage.setAttribute("src", `${planet.image}`);
  planetDetailName.textContent = planet.englishName;
  planetDetailDesc.textContent = planet.description;
  planetDistance.textContent = `${(planet.semimajorAxis / 1000000).toFixed(
    1
  )}M km`;
  planetRadius.textContent = `${planet.meanRadius} km`;
}

function RegisterEvents() {
  RegisterMultiEvents(planetsGrid.children, "click", (e) => {
    const index = Array.from(planetsGrid.children).indexOf(e.currentTarget);
    DisplayPlanetInfo(index);
  });
}

const planets = {
  RegisterEvents,
  DisplayPlanets,
};

export default planets;
