'use client'

import { ReactNode } from 'react'
import { UserRole } from '@prisma/client'
import { hasPermission, hasFeature, PermissionChecks } from '@/lib/permissions'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  requiredPermission?: {
    resource: string
    action: string
  }
  requiredFeature?: string
  fallback?: ReactNode
  userRole?: UserRole
}

export default function RoleGuard({
  children,
  allowedRoles,
  requiredPermission,
  requiredFeature,
  fallback = null,
  userRole
}: RoleGuardProps) {
  if (!userRole) {
    return <>{fallback}</>
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <>{fallback}</>
  }

  // Check if user has required permission
  if (requiredPermission && !hasPermission(userRole, requiredPermission.resource, requiredPermission.action)) {
    return <>{fallback}</>
  }

  // Check if user has required feature
  if (requiredFeature && !hasFeature(userRole, requiredFeature)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Specific role guards for common use cases
export function AdminOnly({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['ADMIN']} userRole={userRole} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function DoctorOnly({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['DOCTOR']} userRole={userRole} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function NurseOnly({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['NURSE']} userRole={userRole} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function AdminOrDoctor({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['ADMIN', 'DOCTOR']} userRole={userRole} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function AdminOrNurse({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['ADMIN', 'NURSE']} userRole={userRole} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

// Permission-based guards
export function CanManageUsers({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'users', action: 'create' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanCreatePatients({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'patients', action: 'create' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanDeletePatients({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'patients', action: 'delete' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanCreateAppointments({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'appointments', action: 'create' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanDeleteAppointments({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'appointments', action: 'delete' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanManageBills({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'bills', action: 'create' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanExportReports({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'reports', action: 'export' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
}

export function CanAccessSettings({ children, userRole, fallback }: { children: ReactNode, userRole?: UserRole, fallback?: ReactNode }) {
  return (
    <RoleGuard 
      requiredPermission={{ resource: 'settings', action: 'read' }} 
      userRole={userRole} 
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  )
} 