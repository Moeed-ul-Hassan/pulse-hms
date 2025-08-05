// Loading Components
export { default as LoadingSpinner, DashboardLoading, PageLoading, CardLoading, TableLoading } from './LoadingSpinner'

// Animated Button Components
export { 
  default as AnimatedButton,
  PrimaryButton,
  SecondaryButton,
  SuccessButton,
  WarningButton,
  DangerButton,
  GhostButton,
  AddButton,
  EditButton,
  DeleteButton,
  ViewButton,
  DownloadButton,
  ShareButton
} from './AnimatedButton'

// Role-based Access Control Components
export { 
  default as RoleGuard,
  AdminOnly,
  DoctorOnly,
  NurseOnly,
  AdminOrDoctor,
  AdminOrNurse,
  CanManageUsers,
  CanCreatePatients,
  CanDeletePatients,
  CanCreateAppointments,
  CanDeleteAppointments,
  CanManageBills,
  CanExportReports,
  CanAccessSettings
} from './RoleGuard'

// Re-export existing components
export * from './printables' 