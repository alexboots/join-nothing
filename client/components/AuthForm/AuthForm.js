import React, { Component } from 'react'
import { Form, Field } from 'formik';
import { Button, Checkbox, Form as SemanticUiForm, Message } from 'semantic-ui-react'

class AuthForm extends Component {
  renderSubmissionErrors = () => {
    return this.props.submissionErrors.map((error, i) => {
      return (
        <Message
          error
          key={ i }
          header="🔥"
          content={ error }
        />
      )
    })
  }

  renderInput = (props) => {
    const { field, form, type, placeholder } = props
    const { touched, errors } = form

    let fieldError = errors[field.name] ? true : false

    return(
      <SemanticUiForm.Input 
        required
        error={ touched[field.name] && fieldError }
        placeholder={ placeholder }
        type={ type }
        { ...field }
      />
    )
  }

  renderCheckbox = (props) => {
    const { label } = props
    return(
      <SemanticUiForm.Checkbox 
        label={ label }
      />
    )
  }

  renderValidationError = (fieldName) => {
    return(
      <div className="input-error-wrapper">
        <span className="input-error-text">
          { this.props.errors[fieldName] }
        </span>
      </div> 
    )
  }

  render() {
    const { submitBtnText, touched, errors, isSubmitting } = this.props

    // To use isSubmitting, need to set it back to false after
    //  graphql request is complete, see: https://github.com/jaredpalmer/formik#form
    return(
      <Form>
        <SemanticUiForm
          loading={ false }
          as="div"
          error={ this.props.submissionErrors.length ? true : false }
          inverted
        >
          <SemanticUiForm.Group widths="equal">
            <Field
              name="username"
              component={ this.renderInput } 
              type="input"
              placeholder="username"
            />
            { touched.username && 
              errors.username && 
              this.renderValidationError('username') }
  
            <Field 
              name="password"
              component={ this.renderInput } 
              type="password"
              placeholder="password"
            />
            { touched.password && 
              errors.password && 
              this.renderValidationError('password')  }
              
          </SemanticUiForm.Group>

          { this.props.loginForm ? null : 
            <Field 
              name="doNotSignLicense"
              component={ this.renderCheckbox } 
              label="I don't agree to any Terms and Conditions"
            /> 
          }
          { 
            this.props.submissionErrors.length ? 
              this.renderSubmissionErrors() : null 
          }

          <Button 
            inverted 
            type="submit"
          >
            { submitBtnText }
          </Button>
        </SemanticUiForm>
      </Form>
    )
  }
}

export default AuthForm