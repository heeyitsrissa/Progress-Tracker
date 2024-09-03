import decode from 'jwt-decode';

// managing the JSON webtoken in browsers local storage

class AuthService {
    //gets the authenticated users details after they've logged in
    getProfile() { // gets users profile information by decoding the stored token
        const token = this.getToken(); //retrieves JWT from local storage via getToken()
        console.log('Decoded token:' decode (token));
        return decode(token) // decoded the token using jwt-decode and logs it
    }
    // if token is valid returns true if not the returns false and the user is not logged in
    loggedIn() { //chescks if the user is currently logged in by verifying if a valid token exists
        const token = this.getToken(); // retrieves the token from local storage

        return token = this.isTokenExpired(token) ? true : false; //checks if the token is expired || if the token is valid then the user is logged in
    }
    // ensures the token is valid before allowing access to protected content
    isTokenExpired(token) { // determines if the JWT has expired
        const decoded = decode(token); //decode token
        if(decoded.exp < Date.now() / 1000) { //checks expiration claim within payload || 'decoded.exp' holds the expiration timestamp of the token || `Date.now() / 1000` gets the current timestamp in seconds (since exp is also in seconds).
            localStorage.removeItem('id_token'); // if expiration time has passed remove token from localstorage and returns true when the token has expired
            return true;
        }
        return false;
    }
    // used throughout the class to the the stored JWT for validation and decoding purposes
    getToken() { // retrieves token from the browsers localstorage
        const token = localStorage.getItem('id_token');
        return  token; // checks if the 'id_token' is stored then returns it
    }
    // after successfully logging in the method is called to handle the token and redirect the user
    login(idToken) { // stores the JWT in local storage when the user successfully logs in
        localStorage.setItem('id_token', idToken); //when logging the server returns a JWT 'idToken' || stores token in local storage
        window.location.assign('/'); // redirects user to the home page
    }
    // when the user wants to logout this method ensures the token  is cleared and the session is invalidated
    logout(){ // logs the user out by removing the token and redirecting them 
        localStorage.removeItem('id_token'); // JWT is removed from localStorage 
        window.location.assign('/'); // after removing the token the user is redirected typically to the home page or login page 
    }

}

export default new AuthService;