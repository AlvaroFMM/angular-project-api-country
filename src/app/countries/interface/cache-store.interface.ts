import { Country } from "./country"
import { region } from "./region.types"

export interface CacheStore{
    byCapital: TermCountries,
    byCountries:  TermCountries,
    byRegion:  RegionCountries

}

export interface TermCountries{
    term: string,
    countries: Country[]
}
export interface RegionCountries {
    region: region,
    countries: Country[]
}