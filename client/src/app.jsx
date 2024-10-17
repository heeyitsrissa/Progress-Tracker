import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Footer from './components/footer';
import { AuthProvider } from './context/AuthContext';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const AuthLink = setContext((_, { headers }) => {
    const token =localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer${token}` : "",
        },
    };
});

const Client = new ApolloClient({
    link: AuthLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App(){
    const location = useLocation();

    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <div>
                {location.pathname !== '/' && <Navbar />}
                </div>
                <div>
                    <Outlet />
                </div>
                <div>
                    {['/dashboard', '/macros', '/goals', '/workouts', '/todos'].includes(location.pathname) && ( <Footer />)}
                </div>
            </AuthProvider>
        </ApolloProvider>
    );
}

export default App;
