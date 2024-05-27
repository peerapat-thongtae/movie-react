import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inputClassNames = (props?: { wrapper?: string, input?: string }) => {
  const wrapper = props?.wrapper || ''
  const input = props?.input || ''
  return {
    wrapper: cn('!bg-main !border-1 !border-yellow-500 !placeholder-white !text-white', wrapper),
    input: cn('!bg-main !border-1 !border-yellow-500 !text-white ', input),
    // option: cn('hover:!text-black'),
  }
}
