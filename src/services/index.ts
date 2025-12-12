export { fetchApi, handleResponse } from './api-client'

export {
  forgotPassword,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
  updateProfile,
} from './auth'

export {
  createBus,
  deleteBus,
  getBusById,
  getBuses,
  updateBus,
} from './buses'

export {
  getBusStatusBreakdown,
  getDriverStatusBreakdown,
  getFleetStats,
} from './dashboard'

export {
  createDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from './drivers'

export {
  createRoute,
  deleteRoute,
  getRouteById,
  getRoutes,
  updateRoute,
} from './routes'
