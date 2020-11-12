import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
});

function Launches() {
    const {loading, error, data} = useQuery(gql`
        {
            launches(limit: 5) {
                launch_date_utc
                launch_success
                rocket {
                    rocket_name
                }
                links {
                    video_link
                }
                details
            }
        }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.launches.map(({launch_date_utc, launch_success, rocket, details, links}, index) => (
        <div key={index}>
            <p>Date : {launch_date_utc}</p>
            <p>Launch :
                {
                    launch_success ? ' Failed' : ' Success'
                }
            </p>
            <p>{rocket.rocket_name}</p>
            <a href="{links.video_link}">Video link</a>
            <p>{details}</p>
        </div>
    ));
}

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <h2>My first Apollo app 🚀</h2>
                <Launches/>
            </div>
        </ApolloProvider>
    );
}

export default App;
