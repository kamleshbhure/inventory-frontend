import React from 'react'
import { GOOGLE_AUTH_URL } from '..';

const centerAlign = {
    textAlign: 'center'
}
function SocialLogin () {
    
        return (
            <div style={centerAlign}>
                <a className="btn btn-block btn-social btn-google" href={GOOGLE_AUTH_URL}>
                    <span className="fa fa-google"></span> Sign in with Google
                </a>
                <hr />
            </div>
        );
}

export default SocialLogin