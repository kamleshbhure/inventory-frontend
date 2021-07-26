import { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { doLogin } from "../state/auth/authActions";
import SocialLogin from "./SocialLogin";

const centerAlign = {
    textAlign: 'center'
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
              email: 'Enter User Name!',
              password: 'Enter Password!'
            },
            loginStatus: '',
            submitted: false
          }
    }
    
    inputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        this.validationErrorMessage(event);
    }

    validationErrorMessage = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
          case 'email': 
            errors.email = value.length < 1 ? 'Enter User Name' : '';
            break;
          case 'password': 
            errors.password = value.length < 1 ? 'Enter Password' : '';
            break;
          default:
            break;
        }
        this.setState({ errors });
    }
    
    validateForm = (errors) => {
        let valid = true;
        Object.entries(errors).forEach(item => {
          item && item[1].length > 0 && (valid = false)
        })
        return valid;
    }
    
    handleSubmit = async (event) => {
        this.setState({ submitted: true });
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {
          if (this.state) {
            this.props.doLogin(this.state);
            this.props.history.push('/admin');
          } else {
            this.setState({ loginStatus: 'Login Failed! Invalid Username and Password'})
          }
        } else {
          console.log('Invalid Form')
        }
    }
    
    render() {
        const { email, password, errors, submitted, loginStatus } = this.state;
        return (
                <form onSubmit={this.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal" >Please sign in</h1>

                    <SocialLogin/>
                    <div style={centerAlign}>
                        <span className="or-text">OR</span>
                    </div>
                    <div className="form-floating">
                        <input type="email" name="email" 
                            className="form-control" id="email" placeholder="name@example.com"
                            value={email} onChange={(e) => { this.inputChange(e)} } required />
                        <label htmlFor="email">Email address</label>
                        { submitted && errors.password.length > 0 &&  <span className='error'>{errors.password}</span>}
                    </div>
                    <div className="form-floating">
                        <input type="password" name="password"
                            className="form-control" id="floatingPassword" placeholder="Password" 
                            value={password} onChange={(e) => { this.inputChange(e)} } required />
                        <label htmlFor="floatingPassword">Password</label>
                        { submitted && errors.password.length > 0 &&  <span className='error'>{errors.password}</span>}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 center mt-1">
                        { submitted && loginStatus.length > 0 &&  <span className='error'>{loginStatus}</span>}
                        </div>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        doLogin: loginRequest => dispatch(doLogin(loginRequest))
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LoginForm))
  