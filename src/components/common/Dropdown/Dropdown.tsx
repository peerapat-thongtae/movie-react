import { cn } from '@/utils/tailwind.helper'
import { ComboboxData, ComboboxItem, ComboboxLikeProps, Select } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

interface DropdownProps extends Partial<ComboboxLikeProps> {
  label?: string
  placeholder?: string
  options: ComboboxData
  value: string
  all?: boolean
  labelAll?: string
  onChange?: (_value: string | null, _option: ComboboxItem) => void
}
const Dropdown = (props: DropdownProps) => {
  const isMobile = useMediaQuery('only screen and (max-width : 640px)')
  const options: ComboboxData = props.all ? [{ label: props.labelAll || '', value: '' }].concat(props.options as []) : props.options
  return (
    <Select
      label={props.label}
      placeholder={props.placeholder}
      data={options}
      classNames={{
        root: cn(''),
        input: cn('!bg-main !border-1 !border-yellow-500 !placeholder-white !text-white', ''),
        dropdown: cn('!bg-main !border-1 !border-yellow-500 !text-white '),
        option: cn('hover:!text-black'),
      }}
      onChange={props.onChange}
      value={props.value}
      size={isMobile ? 'xs' : 'sm'}
    />
  )
}

export default Dropdown
