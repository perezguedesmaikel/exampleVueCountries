export interface IData{
    name:{common:string}
    capital:string[],
    cca3:string,
    flags:{
        alt:string,
        png:string
    }
    population:number,
    region:string
}
export interface ICountries{
    country:IData[],

}
