export interface Character {
    name: string;
    hair_color: string;
    eye_color: string;
    gender: string;
    homeworld: string;
    films: string[];
    starships: string[];
    url: string;
    height: string;
}

export interface CharacterListResponse {
    characters: Character[];
    count: number;
}