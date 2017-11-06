import React, { Component } from 'react'
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'

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
    // Call mutation
  }

  render() {
    console.log('this.state', this.state);
    return(
      <Segment inverted>
        <Form onSubmit={ this.handleSubmit } inverted loading={ false }>
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
          <Button type="submit">
            Submit
          </Button>
        </Form>
      </Segment>
    )
  }
}

export default AuthForm