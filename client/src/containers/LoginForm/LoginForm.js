import React, {Component} from "react";
import classes from "./LoginFrom.module.scss";
import {Button, LabeledInput} from "../../components/index";
import FormTypeTitle from "../../components/FormTypeTitle/FormTypeTitle";
import {connect} from "react-redux";
import {loadUSER, loginUSER, logoutUSER, registerUSER} from "../../store/actions/authActions";
import {useHistory, useLocation} from "react-router-dom";

class LoginForm extends Component {
    state = {
        login: '',
        password: '',
        fullName: '',
        username: '',
        email: '',
        formType: 'Login'
    };

    componentDidMount() {
        // this.props.loadUSER();
    }

    // подтвердить отправку формы
    handleLoginSubmit = event => {
        event.preventDefault();
        console.log('Login Submit');
        if (this.state.formType === "Register") {
            this.registerUser();
        } else if (this.state.formType === "Login") {
            this.authorizeUser();
        }

    };

    registerUser = () => {
        const {email, fullName, password, username} = this.state;
        if (email === "" || password === "" || username === "") return;
        const register_data = {
            username: username,
            full_name: fullName,
            email: email,
            password: password
        };
        this.props.registerUSER(register_data);
    };

    authorizeUser = () => {
        const {login, password} = this.state;
        if (login === "" || password === "") return;
        const login_data = {
            login: login,
            password: password
        };
        this.props.loginUSER(login_data);

        // для перенаправления пользователя
        // let history = useHistory();
        // let location = useLocation();
        // let { from } = location.state || { from: { pathname: "/" } };
        // history.replace(from);
    };

    // при нажатии Enter вызвать обработчик отправки формы
    handleKeyDown = (event) => {
        // при нажатии Enter
        if (event.keyCode === 13) {
            this.handleLoginSubmit(event);
        }
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.props.logoutUSER();
    };


    setRegistrationType = () => {
        this.setState({formType: 'Register'});
    };

    setLoginType = () => {
        this.setState({formType: 'Login'});
    };

    isLogin = () => {
        // return this.state.formType === 'Login';
        return this.state.formType;
    };

    isRegistration = () => {
        // return this.state.formType === 'Register';
        return this.state.formType;
    };


    render() {
        const {
            email,
            username,
            fullName,
            login,
            password,
            formType,
        } = this.state;
        // console.log(this.state);

        return (
          <div className={classes.Form}>
              <div className={classes.FormWrapper}>
                  {/*<p>You are now logged as {this.props.Auth.user.username}</p>*/}
                  <div className={classes.ButtonWrapper}>
                      <FormTypeTitle
                        title={'Login'}
                        active={this.isLogin()}
                        onClick={this.setLoginType}
                      />
                      <FormTypeTitle
                        title={'Sign Up'}
                        active={this.isRegistration()}
                        onClick={this.setRegistrationType}
                      />
                  </div>
                  {formType === 'Login' && (
                    <div className={classes.FieldWrapper}>
                        <form
                          onSubmit={this.handleSubmitCard}
                        >
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'login'}
                              value={login}
                              title={'Username or E-mail'}
                            />
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'password'}
                              value={password}
                              title={'Password'}
                            />
                            <Button
                              className="LoginFormTextarea"
                              type="submit"
                              onClick={this.handleLoginSubmit}
                            >
                                {"Log in"}
                            </Button>
                            <Button
                              className="LoginFormTextarea"
                              type="submit"
                              onClick={this.handleLogout}
                            >
                                {"Log out"}
                            </Button>
                        </form>
                    </div>
                  )}
                  {formType === 'Register' && (
                    <div className={classes.FieldWrapper}>
                        <form
                          onSubmit={this.handleSubmitCard}
                        >
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'email'}
                              value={email}
                              title={'E-mail'}
                            />
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'username'}
                              value={username}
                              title={'Username'}
                            />
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'fullName'}
                              value={fullName}
                              title={'Your full name'}
                            />
                            <LabeledInput
                              autoFocus
                              onChange={this.handleChange}
                              onKeyDown={this.handleKeyDown}
                              name={'password'}
                              value={password}
                              title={'Password'}
                            />
                            <Button
                              className={"LoginFormButton"}
                              type="submit"
                              disabled={password === "" || email === "" || username === ""}
                              onClick={this.handleLoginSubmit}
                            >
                                {"Sign Up"}
                            </Button>
                        </form>
                    </div>
                  )}
              </div>
          </div>
        )
    }
}

// const mapDispatchToProps = dispatch => ({
//     loadUser: () => dispatch(loadUser())
// });
const mapStateToProps = state => ({
    // user: state.userInfo,
    Auth: state.Auth,
    isAuthenticated: state.Auth.isAuthenticated,
    error: state.error
});
export default connect(
  mapStateToProps,
  {loadUSER, loginUSER, logoutUSER, registerUSER}
)(LoginForm);