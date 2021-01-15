import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            registerFailWarningDisplay: {
                display: 'none'
            },
            formsUnfilledWarningDisplay: {
                display: 'none'
            }
        }
    }

    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }
    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }

    onSubmitSignIn = () => {
        const { email, name, password } = this.state;
        if(!email || !name || !password){
            return this.setState({ formsUnfilledWarningDisplay: { display: 'block' } })
        };

        fetch('https://serene-castle-90081.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({ registerFailWarningDisplay: { display: 'block' } })
                }
            })
    }

    render() {
        const { onNameChange, onEmailChange, onPasswordChange, onSubmitSignIn } = this;

        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-4 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={onNameChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            id="email-address"
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={onPasswordChange}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        onClick={onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"
                    />
                </div>
                <div id='register-fail' className='warning' style={this.state.registerFailWarningDisplay}>
                    <p>Error registering user.</p>
                </div>
                <div id='register-fail' className='warning' style={this.state.formsUnfilledWarningDisplay}>
                    <p>Please fill all inputs.</p>
                </div>
            </div>
            </main>
            </article>
        )
    }
}

export default Register;