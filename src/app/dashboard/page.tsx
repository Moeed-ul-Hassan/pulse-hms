'use client'

import { useState, useEffect } from 'react'
import { Users, Calendar, DollarSign, TrendingUp, Plus, ArrowRight, Activity, Heart, Clock, CheckCircle } from 'lucide-react'

interface DashboardStats {
  totalPatients: number
  totalAppointments: number
  totalRevenue: number
  pendingAppointments: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    pendingAppointments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      name: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'positive',
      description: 'Registered patients'
    },
    {
      name: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-green-600',
      change: '+8%',
      changeType: 'positive',
      description: 'Scheduled appointments'
    },
    {
      name: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-orange-600',
      change: '+15%',
      changeType: 'positive',
      description: 'This month'
    },
    {
      name: 'Pending Appointments',
      value: stats.pendingAppointments,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-purple-600',
      change: '-3%',
      changeType: 'negative',
      description: 'Awaiting confirmation'
    }
  ]

  const quickActions = [
    {
      name: 'Add Patient',
      icon: Plus,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Register new patient'
    },
    {
      name: 'Schedule Appointment',
      icon: Calendar,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Book appointment'
    },
    {
      name: 'Create Bill',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      description: 'Generate invoice'
    },
    {
      name: 'View Reports',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      description: 'Analytics & insights'
    }
  ]

  const recentActivities = [
    {
      type: 'patient',
      title: 'New patient registered',
      description: 'Ahmed Khan was added to the system',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      type: 'appointment',
      title: 'Appointment scheduled',
      description: 'Follow-up appointment for Fatima Ali',
      time: '4 hours ago',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      type: 'payment',
      title: 'Payment received',
      description: '$2,500 payment for consultation and tests',
      time: '1 day ago',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      type: 'completed',
      title: 'Appointment completed',
      description: 'Regular checkup for Sarah Johnson',
      time: '2 days ago',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-12">
          <div className="animate-pulse-slow">
            <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Fetching your latest data...</p>
        </div>
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="loading-shimmer h-4 w-24 mb-2 rounded"></div>
              <div className="loading-shimmer h-8 w-16 mb-4 rounded"></div>
              <div className="loading-shimmer h-3 w-32 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
          <div className="animate-pulse-slow">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Pulse HMS
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Your healthcare management dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.name}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${card.bgColor} group-hover:bg-gradient-to-r ${card.gradient} transition-all duration-300`}>
                  <card.icon className={`h-6 w-6 ${card.color} group-hover:text-white transition-colors duration-300`} />
                </div>
                <div className={`text-sm font-semibold ${
                  card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{card.name}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-400">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Activity className="h-5 w-5 text-blue-600 mr-2" />
            Quick Actions
          </h3>
          <p className="text-gray-600 mt-1">Common tasks and shortcuts</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <button
                key={action.name}
                className={`group relative overflow-hidden ${action.color} ${action.hoverColor} text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-5 w-5" />
                    <span>{action.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs opacity-80 mt-1 text-left">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            Recent Activity
          </h3>
          <p className="text-gray-600 mt-1">Latest updates and activities</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
                <div className="text-sm text-gray-400">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
              View all activities →
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Services</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Print Services</span>
              <span className="text-sm font-medium text-green-600">Ready</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Health Tips</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Remember to maintain regular patient follow-ups and keep medical records updated for better healthcare outcomes.
          </p>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  )
} 