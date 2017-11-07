import React, { Component } from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'

class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      checked: false
    }
  }

  handleUsernameChange = (e, data) => {
    const { value } = data
    this.setState({ username: value })
  }

  handlePasswordChange = (e, data) => {
    const { value } = data
    this.setState({ password: value })
  }

  handleCheckboxChange = (e, data) => {
    const { checked } = data
    this.setState({ checked })
  }

  handleSubmit = () => {
    const { username, password } = this.state
    this.props.handleSubmit(this.state)
  }

  renderErrors = () => {
    console.log('this.props.errors', this.props.errors);
    console.log('this.props.errors', this.props.errors.length);
    if(this.props.errors.length) {
      return this.props.errors.map((error, i) => {
        return (
          <Message
            error
            key={ i }
            header="🔥"
            content={ error }
          />
        )
      })
    } else {
      return null
    }
  }

  render() {
    const { submitBtnText } = this.props
    console.log('this.props.errors', this.props.errors);
    console.log('this.props.errors.length', this.props.errors.length);
    return(
      <Form 
        error={ this.props.errors.length ? true : false }
        inverted 
        loading={ false }
        onSubmit={ this.handleSubmit }  
      >
        <Form.Group widths="equal">
          <Form.Input 
            required
            placeholder="username"
            type="input"
            onChange={ this.handleUsernameChange }
          />
          <Form.Input 
            required
            placeholder="password"
            type="password" 
            onChange={ this.handlePasswordChange }
          />
        </Form.Group>
        <Form.Checkbox 
          label="I don't agree to any Terms and Conditions" 
          onChange={ this.handleCheckboxChange }
        />
        
        { this.renderErrors() }

        <Button 
          inverted 
          type="submit"
        >
          { submitBtnText }
        </Button>
      </Form>
    )
  }
}

export default AuthForm