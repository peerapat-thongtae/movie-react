import { listenForOutsideClick } from '@/utils/click-outside'
import { useEffect } from 'react'

interface Prop {
  listening: any
  setListening: any
  targetRef: any
  setIsOpen: any
}
const useOutsideClick = (props: Prop) => {
  useEffect(listenForOutsideClick(
    props.listening,
    props.setListening,
    props.targetRef,
    props.setIsOpen,
  ))
}

export default useOutsideClick
