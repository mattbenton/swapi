export const getPeople = async (page: number) => {
    return await fetch(`http://swapi.dev/api/people/?page=${page}`)
        .then(res => res.json())
        .then(
            (result) => {
                return result
            }
        )
};
