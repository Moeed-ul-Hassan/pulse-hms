import { Heart, Activity } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'heartbeat' | 'pulse' | 'dots'
  text?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'default', 
  text,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const renderSpinner = () => {
    switch (variant) {
      case 'heartbeat':
        return (
          <div className="flex items-center justify-center">
            <Heart className={`${sizeClasses[size]} text-blue-600 animate-pulse-slow`} />
          </div>
        )
      
      case 'pulse':
        return (
          <div className="flex items-center justify-center">
            <Activity className={`${sizeClasses[size]} text-green-600 animate-pulse-slow`} />
          </div>
        )
      
      case 'dots':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )
      
      default:
        return (
          <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
          </div>
        )
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderSpinner()}
      {text && (
        <p className={`${textSizes[size]} text-gray-600 text-center animate-fade-in`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Specialized loading components for different contexts
export function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="animate-pulse-slow mb-6">
          <Heart className="h-16 w-16 text-blue-600 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pulse HMS</h2>
        <p className="text-gray-600 mb-6">Loading your dashboard...</p>
        <LoadingSpinner size="lg" variant="default" />
      </div>
    </div>
  )
}

export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner size="lg" variant="heartbeat" text={text} />
    </div>
  )
}

export function CardLoading() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="loading-shimmer h-4 w-24 mb-2 rounded"></div>
      <div className="loading-shimmer h-8 w-16 mb-4 rounded"></div>
      <div className="loading-shimmer h-3 w-32 rounded"></div>
    </div>
  )
}

export function TableLoading() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="loading-shimmer h-6 w-32 mb-4 rounded"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="loading-shimmer h-4 w-4 rounded-full"></div>
              <div className="loading-shimmer h-4 flex-1 rounded"></div>
              <div className="loading-shimmer h-4 w-20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 