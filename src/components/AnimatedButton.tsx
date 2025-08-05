import { ReactNode } from 'react'
import { ArrowRight, Plus, Edit, Trash2, Eye, Download, Share2 } from 'lucide-react'

interface AnimatedButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: 'arrow' | 'plus' | 'edit' | 'delete' | 'view' | 'download' | 'share' | 'none'
  iconPosition?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  icon = 'none',
  iconPosition = 'right',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = ''
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500 hover:scale-105 hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:ring-green-500 hover:scale-105 hover:shadow-lg',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white focus:ring-green-500 hover:scale-105 hover:shadow-lg',
    warning: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white focus:ring-orange-500 hover:scale-105 hover:shadow-lg',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500 hover:scale-105 hover:shadow-lg',
    ghost: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500 hover:scale-105'
  }

  const iconClasses = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const getIcon = () => {
    if (loading) {
      return <div className={`${iconClasses[size]} animate-spin rounded-full border-2 border-current border-t-transparent`} />
    }

    switch (icon) {
      case 'arrow':
        return <ArrowRight className={`${iconClasses[size]} transition-transform duration-200 group-hover:translate-x-1`} />
      case 'plus':
        return <Plus className={iconClasses[size]} />
      case 'edit':
        return <Edit className={iconClasses[size]} />
      case 'delete':
        return <Trash2 className={iconClasses[size]} />
      case 'view':
        return <Eye className={iconClasses[size]} />
      case 'download':
        return <Download className={iconClasses[size]} />
      case 'share':
        return <Share2 className={iconClasses[size]} />
      default:
        return null
    }
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`group ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {icon !== 'none' && iconPosition === 'left' && (
        <span className="mr-2">
          {getIcon()}
        </span>
      )}
      <span>{children}</span>
      {icon !== 'none' && iconPosition === 'right' && (
        <span className="ml-2">
          {getIcon()}
        </span>
      )}
    </button>
  )
}

// Specialized button components for common actions
export function PrimaryButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="primary" {...props}>{children}</AnimatedButton>
}

export function SecondaryButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="secondary" {...props}>{children}</AnimatedButton>
}

export function SuccessButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="success" {...props}>{children}</AnimatedButton>
}

export function WarningButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="warning" {...props}>{children}</AnimatedButton>
}

export function DangerButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="danger" {...props}>{children}</AnimatedButton>
}

export function GhostButton({ children, ...props }: Omit<AnimatedButtonProps, 'variant'>) {
  return <AnimatedButton variant="ghost" {...props}>{children}</AnimatedButton>
}

// Action buttons with predefined icons
export function AddButton({ children = "Add", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="plus" iconPosition="left" {...props}>{children}</AnimatedButton>
}

export function EditButton({ children = "Edit", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="edit" iconPosition="left" variant="warning" {...props}>{children}</AnimatedButton>
}

export function DeleteButton({ children = "Delete", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="delete" iconPosition="left" variant="danger" {...props}>{children}</AnimatedButton>
}

export function ViewButton({ children = "View", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="view" iconPosition="left" variant="ghost" {...props}>{children}</AnimatedButton>
}

export function DownloadButton({ children = "Download", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="download" iconPosition="left" variant="secondary" {...props}>{children}</AnimatedButton>
}

export function ShareButton({ children = "Share", ...props }: Omit<AnimatedButtonProps, 'icon' | 'iconPosition'>) {
  return <AnimatedButton icon="share" iconPosition="left" variant="ghost" {...props}>{children}</AnimatedButton>
} 