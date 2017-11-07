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

  handleEmailChange = (e, data) => {
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
    return this.props.errors.map((error) => {
      return (
        <Message
          error
          header="🔥"
          content={ error }
        />
      )
    })
  }

  render() {
    const { submitBtnText } = this.props

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
            placeholder='username'
            type="input"
            onChange={ this.handleEmailChange }
          />
          <Form.Input 
            required
            placeholder='password'
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