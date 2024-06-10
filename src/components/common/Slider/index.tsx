import usePreventBodyScroll from '@/hooks/usePreventBodyScroll'
import { ReactNode } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import './style.css'

interface SliderProps {
  label?: string
  children: ReactNode
  header?: ReactNode
}
const Slider = ({ children, header }: SliderProps) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll()
  return (
    <div className="text-base" onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <ScrollMenu
        Header={header}
        // LeftArrow={LeftArrow}
        // RightArrow={RightArrow}
        onWheel={onWheel}
      >
        <div className="pt-4">{children}</div>
      </ScrollMenu>
    </div>
  )
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>
function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isThouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  }
  else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}

export default Slider
