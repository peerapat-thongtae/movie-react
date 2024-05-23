import { cn } from '@/utils/tailwind.helper'
import React from 'react'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import NotFoundImage from '@/assets/images/image-not-found.png'
import { ImageType } from '@/types/media.type'
import NoImageBackdrop from '@/assets/images/no-image-backdrop.png'

interface ImageProps {
  src: string
  className?: string
  alt: string | undefined
  width?: string | number
  height?: string | number
  effect?: 'zoomIn'
  type?: ImageType
}

const Image: React.FC<ImageProps> = ({
  src,
  className,
  width,
  alt,
  height,
  effect,
  type,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imageType = type || 'poster'
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
      <LazyLoadImage
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={cn(
          'transition-all duration-300 ease-in',
          className,
          !isImageLoaded
            ? `opacity-0 ${effect === 'zoomIn' ? 'scale-50' : ''}`
            : `opacity-100 ${effect === 'zoomIn' ? 'scale-100' : ''}`,
        )}
        onLoad={onLoad}
        onError={onErrorImage}
      />
    )

  )
}

export default Image
