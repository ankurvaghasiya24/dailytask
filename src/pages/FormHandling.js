import React from 'react'
import BasicForm from '../formhandling/BasicForm'
import MultiStepForm from '../formhandling/MultiStepForm'
import DynamicForm from '../formhandling/DynamicForm'
import ComplexForm from '../formhandling/ComplexForm'

function FormHandling() {
  return (
    <div>
      <BasicForm />
      <MultiStepForm />
      <DynamicForm />
      <ComplexForm />
    </div>
  )
}

export default FormHandling
