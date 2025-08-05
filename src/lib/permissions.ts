import { UserRole } from '@prisma/client'

export interface Permission {
  resource: string
  actions: string[]
}

export interface RolePermissions {
  role: UserRole
  permissions: Permission[]
  features: string[]
  navigation: string[]
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  ADMIN: {
    role: 'ADMIN',
    permissions: [
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'patients', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'appointments', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'bills', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'reports', actions: ['create', 'read', 'export'] },
      { resource: 'settings', actions: ['read', 'update'] },
      { resource: 'audit', actions: ['read'] },
      { resource: 'printables', actions: ['create', 'read', 'print'] },
      { resource: 'receipts', actions: ['create', 'read', 'print'] },
    ],
    features: [
      'user-management',
      'patient-management',
      'appointment-management',
      'billing-management',
      'reporting',
      'system-settings',
      'audit-logs',
      'printables',
      'receipts',
      'dashboard-analytics'
    ],
    navigation: [
      'dashboard',
      'patients',
      'appointments',
      'billing',
      'printables',
      'new-receipt',
      'reports',
      'settings'
    ]
  },
  DOCTOR: {
    role: 'DOCTOR',
    permissions: [
      { resource: 'patients', actions: ['read', 'update'] },
      { resource: 'appointments', actions: ['create', 'read', 'update'] },
      { resource: 'bills', actions: ['read', 'update'] },
      { resource: 'reports', actions: ['read'] },
      { resource: 'printables', actions: ['read', 'print'] },
      { resource: 'receipts', actions: ['create', 'read', 'print'] },
    ],
    features: [
      'patient-view',
      'appointment-management',
      'billing-view',
      'report-viewing',
      'printables',
      'receipts',
      'dashboard-analytics'
    ],
    navigation: [
      'dashboard',
      'patients',
      'appointments',
      'billing',
      'printables',
      'new-receipt',
      'reports'
    ]
  },
  NURSE: {
    role: 'NURSE',
    permissions: [
      { resource: 'patients', actions: ['create', 'read', 'update'] },
      { resource: 'appointments', actions: ['read', 'update'] },
      { resource: 'bills', actions: ['read'] },
      { resource: 'printables', actions: ['read', 'print'] },
      { resource: 'receipts', actions: ['read', 'print'] },
    ],
    features: [
      'patient-management',
      'appointment-viewing',
      'billing-view',
      'printables',
      'receipts',
      'dashboard-basic'
    ],
    navigation: [
      'dashboard',
      'patients',
      'appointments',
      'billing',
      'printables',
      'new-receipt'
    ]
  }
}

export function hasPermission(userRole: UserRole, resource: string, action: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  if (!rolePermissions) return false

  const permission = rolePermissions.permissions.find(p => p.resource === resource)
  return permission?.actions.includes(action) || false
}

export function hasFeature(userRole: UserRole, feature: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  if (!rolePermissions) return false

  return rolePermissions.features.includes(feature)
}

export function getNavigationItems(userRole: UserRole): string[] {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  return rolePermissions?.navigation || []
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const navigationItems = getNavigationItems(userRole)
  return navigationItems.includes(route.replace('/dashboard/', ''))
}

// Feature-specific permission checks
export const PermissionChecks = {
  // User Management
  canManageUsers: (role: UserRole) => hasPermission(role, 'users', 'create'),
  
  // Patient Management
  canCreatePatients: (role: UserRole) => hasPermission(role, 'patients', 'create'),
  canUpdatePatients: (role: UserRole) => hasPermission(role, 'patients', 'update'),
  canDeletePatients: (role: UserRole) => hasPermission(role, 'patients', 'delete'),
  
  // Appointment Management
  canCreateAppointments: (role: UserRole) => hasPermission(role, 'appointments', 'create'),
  canUpdateAppointments: (role: UserRole) => hasPermission(role, 'appointments', 'update'),
  canDeleteAppointments: (role: UserRole) => hasPermission(role, 'appointments', 'delete'),
  
  // Billing Management
  canManageBills: (role: UserRole) => hasPermission(role, 'bills', 'create'),
  canUpdateBills: (role: UserRole) => hasPermission(role, 'bills', 'update'),
  
  // Reports
  canViewReports: (role: UserRole) => hasPermission(role, 'reports', 'read'),
  canExportReports: (role: UserRole) => hasPermission(role, 'reports', 'export'),
  
  // Settings
  canAccessSettings: (role: UserRole) => hasPermission(role, 'settings', 'read'),
  
  // Printables
  canCreatePrintables: (role: UserRole) => hasPermission(role, 'printables', 'create'),
  canPrintDocuments: (role: UserRole) => hasPermission(role, 'printables', 'print'),
  
  // Receipts
  canCreateReceipts: (role: UserRole) => hasPermission(role, 'receipts', 'create'),
  canPrintReceipts: (role: UserRole) => hasPermission(role, 'receipts', 'print'),
} 