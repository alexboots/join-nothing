import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

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

  handleSubmit = (e, data) => {
    const { username, password } = this.state
    this.props.handleSubmit()
  }

  render() {
    console.log('this.state', this.state);
    const { submitBtnText } = this.props
    return(
      <Form onSubmit={ this.handleSubmit }  inverted loading={ false }>
        <Form.Group widths="equal">
          <Form.Input 
            required
            label="Username" 
            type="input"
            onChange={ this.handleEmailChange }
          />
          <Form.Input 
            required
            label="Password" 
            type="password" 
            onChange={ this.handlePasswordChange }
          />
        </Form.Group>
        <Form.Checkbox 
          label="I don't agree to any Terms and Conditions" 
          onChange={ this.handleCheckboxChange }
        />
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