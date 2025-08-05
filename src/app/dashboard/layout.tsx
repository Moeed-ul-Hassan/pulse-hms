'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Activity,
  FileText,
  Heart,
  Shield,
  Receipt
} from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get user info from cookie or API
    const getUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        }
      } catch (error) {
        console.error('Failed to get user:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      if (response.ok) {
        toast.success('Logged out successfully')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'gradient-blue'
    },
    { 
      name: 'Patients', 
      href: '/dashboard/patients', 
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'gradient-green'
    },
    { 
      name: 'Appointments', 
      href: '/dashboard/appointments', 
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'gradient-purple'
    },
    { 
      name: 'Billing', 
      href: '/dashboard/billing', 
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'gradient-orange'
    },
    { 
      name: 'Printables', 
      href: '/dashboard/printables', 
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      gradient: 'gradient-blue'
    },
    { 
      name: 'New Receipt', 
      href: '/dashboard/new-receipt', 
      icon: Receipt,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'gradient-green'
    },
    { 
      name: 'Reports', 
      href: '/dashboard/reports', 
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      gradient: 'gradient-purple'
    },
    ...(user?.role === 'ADMIN' ? [{ 
      name: 'Settings', 
      href: '/dashboard/settings', 
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      gradient: 'gradient-blue'
    }] : [])
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-pulse-slow">
            <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pulse HMS</h2>
          <p className="text-gray-600">Loading your dashboard...</p>
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)} 
        />
        <div className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-16 items-center justify-between px-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse-slow">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Pulse HMS</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 px-3 py-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md ${item.bgColor} hover:${item.gradient} text-gray-700 hover:text-white`}
                onClick={() => setSidebarOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className={`mr-3 h-5 w-5 transition-colors duration-200 ${item.color} group-hover:text-white`} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {user?.role?.toLowerCase()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white shadow-xl border-r border-gray-200">
          <div className="flex h-16 items-center px-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse-slow">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">Pulse HMS</h1>
            </div>
          </div>
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md ${item.bgColor} hover:${item.gradient} text-gray-700 hover:text-white animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className={`mr-3 h-5 w-5 transition-colors duration-200 ${item.color} group-hover:text-white`} />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <User className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {user?.role?.toLowerCase()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-gray-100 rounded-lg transition-colors duration-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6 animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 