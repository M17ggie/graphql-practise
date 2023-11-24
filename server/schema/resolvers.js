import { MoviesList, UserList } from "../data.js"

const resolvers = {
    Query: {
        // USER RESOLVERS 
        users: () => {
            if (!UserList) {
                return { users: UserList }
            }
            return { message: "Users not found!" }
        },
        user: (_parent, { id }) => {
            return UserList.find(user => user.id === id)
        },

        // MOVIE RESOLVERS 
        movies: () => {
            return MoviesList
        },
        movie(_parent, { name }) {
            return MoviesList.find(movie => movie.name === name)
        }
    },

    User: {
        favMovies: (parent) => {
            console.log("PARENT", parent)
            return MoviesList.filter(movie => movie.isInTheatre === false)
        }
    },

    // MUTATION 
    Mutation: {
        createUser: (_parent, args) => {
            const user = args.input;
            console.log("USER=>", user);
            UserList.push({ id: UserList.length + 1, ...user })
            return { id: UserList.length + 1, ...user }
        },
        deleteUser: (_parent, { id }) => {
            const user = UserList.find(user => user.id === +id);
            if (user) {
                UserList.splice(user.id, 1)
            }
            console.log(user, UserList)
            return { ...user, status: "Deleted" }
        }
    },

    UsersResult: {
        __resolveType(obj) {
            if (obj.users) {
                return "UsersSuccessResult"
            }
            if (obj.message) {
                return "UsersErrorResult"
            }

            return null
        }
    }
}

export default resolvers