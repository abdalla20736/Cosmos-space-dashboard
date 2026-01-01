const apiKey = "EffNCoeWC0clTrYWBkJAmz4TWSQ6bT9DPhd3iB9i";

async function GetBlogByDate(date) {
  try {
    var res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    );

    return await res.json();
  } catch (error) {
    console.log("Exception by API : " + error.message);
  }
  return null;
}

async function GetPlanets() {
  try {
    var res = await fetch(
      `https://solar-system-opendata-proxy.vercel.app/api/planets`
    );

    return await res.json();
  } catch (error) {
    console.log("Exception by API : " + error.message);
  }
  return null;
}

const api = {
  GetBlogByDate,
  GetPlanets,
};

export default api;
