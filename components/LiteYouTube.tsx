'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'

interface LiteYouTubeProps {
  videoId: string
  title: string
  className?: string
}

/**
 * Lightweight YouTube embed component
 * Loads YouTube iframe only when user clicks play
 * Saves ~1MB of JavaScript on initial page load
 */
export function LiteYouTube({ videoId, title, className = '' }: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (isLoaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    )
  }

  return (
    <div
      className={`relative cursor-pointer group ${className}`}
      onClick={() => setIsLoaded(true)}
    >
      {/* Optimized thumbnail image */}
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-cover"
        priority={false}
        quality={85}
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  )
}
