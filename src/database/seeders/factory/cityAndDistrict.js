import { Models } from "../../models";
import data from "./json/cityAndDistrict.json";

const { City, District } = Models;

export default class SeedingCityAndDistrict {
  static start(transaction) {
    console.log("====== Migrating City and District ==========");
    return SeedingCityAndDistrict.seedingCitiesAndDistricts(transaction);
  }

  static async seedingCitiesAndDistricts(transaction) {
    const cities = Object.keys(data).map((citySlug) => {
      const cityName = data[citySlug]["name"];
      return {
        name: cityName,
        slug: citySlug,
      };
    });
    const citiesRes = await City.bulkCreate(cities, { transaction });
    let i = 0;
    await Promise.all(Object.keys(data).map((citySlug) => {
      const city = citiesRes[i];
      const cityId = city.id;
      const district = data[citySlug]["cities"];
      const pendingDistrict = Object.keys(district)
      .map((slug) => {
        const districtName = district[slug];
        if (slug.endsWith("KHAC")) {
          return null;
        }
        return {
          cityId,
          name: districtName,
          slug,
        };
      })
      .filter((item) => item !== null);
      i += 1;
      return District.bulkCreate(pendingDistrict, { transaction });
    }));
  }
}
