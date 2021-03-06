import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            warningDisplay: {
                display: 'none'
            }
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        const { signInEmail, signInPassword } = this.state;
        if(!signInEmail || !signInPassword){
            return this.setState({ warningDisplay: {
                display: 'block'
            }})
        }

        fetch('https://serene-castle-90081.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({ warningDisplay: {
                        display: 'block'
                    } })
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        const { onSubmitSignIn, onPasswordChange, onEmailChange } = this;
        return(
            <article className = "br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-4 center" >
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address" 
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" 
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div id='signin-fail' className='warning' style={this.state.warningDisplay}>
                        <p>Error logging in.</p>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</p>
                    </div>
                </div>
            </main>
            </article>
        )
    }
}

export default SignIn;