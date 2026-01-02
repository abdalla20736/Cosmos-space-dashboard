import api from "./api.js";

async function DisplayLaunches() {
  const data = await api.GetLaunches();
}

const launches = {};

export default launches;
