import { Button as AntButton } from 'antd'
import { ButtonType } from 'antd/es/button'
interface ButtonProps {
  height?: number | string
  className?: string
  label: string
  type?: string
}
const Button = (props: ButtonProps) => {
  const btnType: ButtonType = props.type as ButtonType || 'default'
  return (
    <AntButton
      size="large"
      type={btnType}
      className={`${props.className}`}
    >
      {props.label}
    </AntButton>
  )
}

export default Button
