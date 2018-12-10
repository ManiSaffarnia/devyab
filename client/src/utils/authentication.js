import setAuthToken from './setAuthToken';
import jwt from 'jsonwebtoken';
import config from 'config';

const authentication = () => {
    const token = localStorage.getItem('jwtToken-devyab');
    if (!token) return false;

    //token vojood dare
    try {
        const decodedData = jwt.verify((process.env.NODE_ENV === 'production') ? config.get('JWTsecret') : token, 'mani');

        //check expiration time
        const now = Date.now() / 1000;

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
        console.log(ex);
        console.log('verify nashod');
        localStorage.removeItem('jwtToken-devyab');
        return false
    }

}//END


export default authentication