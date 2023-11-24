import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useState } from "react";

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            first_name
            last_name
            email
        }
    }
`

const QUERY_MOVIES = gql`
    query GetAllMovies {
        movies {
            id
            name
        }
    }
`

const QUERY_FETCH_MOVIE = gql`
query GetMovieByName($name: String!) {
        movie(name: $name) {
            id
            name
            year
        }
     }
     `

const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input){
            id
            first_name
            last_name
        }
    }
`

const List = () => {
    const [movieSearch, setMovieSearch] = useState("");
    const [user, setUser] = useState("");
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData, loading: isMovieLoading } = useQuery(QUERY_MOVIES);

    const [fetchMovie, { data: movieSearchData }] = useLazyQuery(QUERY_FETCH_MOVIE)

    const [createUser, { data: userData }] = useMutation(CREATE_USER)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <input type="text" placeholder="First Name" name="first_name" onChange={handleChange} />
            <input type="text" placeholder="Last Name" name="last_name" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="text" placeholder="Country" name="nationality" onChange={handleChange} />
            <button onClick={() => { createUser({ variables: { input: user } }); refetch() }}>Create User</button>

            {loading ? <p>Loading...</p> :
                <div>
                    <ul>
                        {
                            data?.users?.map((user, index) => <li key={user?.id}>{JSON.stringify(user)}</li>)
                        }
                    </ul>
                </div>}
            {isMovieLoading ? <p>Loading...</p> :
                <div>
                    <ul>
                        {
                            movieData?.movies?.map((movie) => <li key={movie?.id}>{JSON.stringify(movie.name)}</li>)
                        }
                    </ul>
                </div>}

            <input type="text" placeholder="Hush..." onChange={(e) => setMovieSearch(e.target.value)} />
            <button onClick={() => fetchMovie({ variables: { name: movieSearch } })}>Fetch Movie</button>
            <div>
                Searched Movie:
                {JSON.stringify(movieSearchData?.movie)}
            </div>
        </>
    )
}

export default List