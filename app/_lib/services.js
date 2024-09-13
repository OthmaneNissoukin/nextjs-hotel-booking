export async function getCountries() {
  let countries = [];
  try {
    const res = await fetch("https://restcountries.com/v2/all?fields=name,flag");
    countries = await res.json();
  } catch {
    console.log("Could not fetch countries");
  }

  return countries;
}
