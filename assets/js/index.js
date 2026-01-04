import { RegisterMultiEvents } from "./utils.js";
import todaySpace from "./todayspace.js";
import launches from "./launches.js";
import planets from "./planets.js";

const sideBar = document.getElementById("sidebar");
const navLinks = sideBar.querySelectorAll("nav a");

StartUp();

async function StartUp() {
  // await todaySpace.DisplayTodayInfo();
  //await planets.DisplayPlanets();
  await launches.DisplayLaunches();
  RegisterEvents();
}

function OnSwitchSectionLinkActive(link) {
  navLinks.forEach((existLink) => {
    if (existLink != link) {
      existLink.classList.remove("bg-blue-500/10", "text-blue-400");
      existLink.classList.add("text-slate-300", "hover:bg-slate-800");
    } else {
      existLink.classList.add("bg-blue-500/10", "text-blue-400");
      existLink.classList.remove("text-slate-300", "hover:bg-slate-800");
    }
  });
}

function SwitchSection(link) {
  let section = link.dataset.section;
  OnSwitchSectionLinkActive(link);
  let sections = document.querySelectorAll("section[id]");
  let sectionContent = document.getElementById(section);
  sections.forEach((s) => {
    !s.classList.contains("hidden") ? s.classList.add("hidden") : "";
  });
  sectionContent.classList.toggle("hidden");
}

function RegisterEvents() {
  RegisterMultiEvents(navLinks, "click", (e) => SwitchSection(e.currentTarget));
  todaySpace.RegisterEvents();
  planets.RegisterEvents();
}
