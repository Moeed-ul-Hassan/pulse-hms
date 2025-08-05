'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Activity, Users, Calendar, DollarSign, FileText, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { PrimaryButton } from '@/components'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      router.push('/login')
    }, 5000) // Redirect after 5 seconds

    return () => clearTimeout(timer)
  }, [router])

  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Complete patient registration and medical history tracking',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Smart booking system with conflict detection',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: DollarSign,
      title: 'Billing & Payments',
      description: 'Professional invoicing and payment tracking',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: FileText,
      title: 'Professional Printables',
      description: '8 different document types with QR codes',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const stats = [
    { label: 'Patients Served', value: '10,000+' },
    { label: 'Appointments', value: '50,000+' },
    { label: 'Documents Generated', value: '100,000+' },
    { label: 'Healthcare Providers', value: '500+' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-5 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-20 animate-fade-in">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl mb-8 animate-scale-in">
            <div className="animate-pulse-slow">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Pulse HMS
          </h1>
          
          <p className="text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Modern Hospital Management System
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Designed for small to mid-sized clinics, especially in infrastructure-limited regions. 
            Built with modern technology for better patient care.
          </p>

          <div className="flex items-center justify-center space-x-6 mb-12">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Secure & Reliable</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Fast & Efficient</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-purple-500" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <PrimaryButton 
            size="lg" 
            icon="arrow" 
            onClick={() => router.push('/login')}
            className="animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            Get Started
          </PrimaryButton>
        </header>

        {/* Features */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Healthcare Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your healthcare facility efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${feature.bgColor} mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Healthcare Practice?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of healthcare providers who trust Pulse HMS for their daily operations
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <PrimaryButton 
                size="lg" 
                icon="arrow" 
                onClick={() => router.push('/login')}
              >
                Start Free Trial
              </PrimaryButton>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">Trusted by 500+ clinics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">Pulse HMS</span>
            </div>
            <p className="text-gray-600 mb-4">
              Modern healthcare management for better patient care
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login in a few seconds...
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
