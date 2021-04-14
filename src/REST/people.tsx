export const getPeople = async () => {
    return await fetch("http://swapi.dev/api/people/")
        .then(res => res.json())
        .then(
            (result) => {
                return result
            }
        )
};

export const getFilms = async ( params: number ) => {
    return await fetch(`http://swapi.dev/api/films/${params}`)
        .then(res => res.json())
        .then(
            (result) => {
                return result
            }
        )
};
