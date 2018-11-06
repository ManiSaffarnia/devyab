import setAuthToken from './setAuthToken';
import jwt from 'jsonwebtoken';

const authentication = () => {
    const token = localStorage.getItem('jwtToken-devyab');
    if (!token) return false;

    //token vojood dare
    try {
        const decodedData = jwt.verify(token, 'mani');

        //check expiration time
        const now = new Date.now() / 1000;

        if (decodedData.exp < now) {
            //token expire shode
            localStorage.removeItem('jwtToken-devyab');
            return false;
        }

        //set header
        setAuthToken(token);

        //return user's data which is inside token
        return decodedData;
    }
    catch (ex) {
        console.log('verify nashod');
        localStorage.removeItem('jwtToken-devyab');
        return false
    }

}//END


export default authentication