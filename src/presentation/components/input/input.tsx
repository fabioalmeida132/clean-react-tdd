import React, { useContext, useRef } from 'react'
import Styles from './input.scss'
import FormContext from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        ref={inputRef}
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => {
        inputRef.current.focus()
      }}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}>
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
