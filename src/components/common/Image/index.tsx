import { cn } from '@/utils/tailwind.helper'
import React from 'react'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import NotFoundImage from '@/assets/images/image-not-found.png'
import { ImageType } from '@/types/media.type'
import NoImageBackdrop from '@/assets/images/no-image-backdrop.png'
import { LuLoader } from 'react-icons/lu'

interface ImageProps {
  src: string
  className?: string
  alt: string | undefined
  width?: string | number
  height?: string | number
  effect?: 'zoomIn'
  type?: ImageType
  loadIcon?: boolean
}

const Image: React.FC<ImageProps> = ({
  src,
  className,
  width,
  alt,
  height,
  effect,
  type,
  loadIcon,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imageType = type || 'poster'
  loadIcon = loadIcon || false
  const onLoad = () => {
    setIsImageLoaded(true)
  }

  const onErrorImage = (e: any) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = imageType === 'poster' ? NotFoundImage : NoImageBackdrop
  }

  return (
    src

    && (
      <>
        { !isImageLoaded && loadIcon && (
          <div className=" flex items-center justify-center w-full h-full">
            <LuLoader size={50} className="animate-spin text-yellow-500" />
          </div>
        )}
        <LazyLoadImage
          src={src}
          alt={alt}
          height={height}
          width={width}
          className={cn(
            'transition-all duration-300 ease-in max-w-full',
            className,
            !isImageLoaded
              ? `opacity-0 ${effect === 'zoomIn' ? 'scale-50' : ''}`
              : `opacity-100 ${effect === 'zoomIn' ? 'scale-100' : ''}`,
          )}
          onLoad={onLoad}
          onError={onErrorImage}
        />
      </>
    )

  )
}

export default Image
