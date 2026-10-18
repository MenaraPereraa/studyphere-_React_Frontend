/**
 * Mock Dashboard Metrics Data
 * Used for UI development in Phase 1
 */

export const mockDashboardMetrics = {
  totalUsers: 156,
  totalCars: 54,
  activeRentals: 8,
  completedRentals: 342,
  dailyRevenue: 2450.75,
  monthlyRevenue: 54230.5,
  mostRentedCars: [
    { carName: 'Tesla Model 3', rentals: 47 },
    { carName: 'Honda Civic', rentals: 38 },
    { carName: 'Toyota Corolla', rentals: 35 },
    { carName: 'Ford Escape', rentals: 28 },
    { carName: 'Chevrolet Equinox', rentals: 22 },
  ],
}

// Chart data for revenue by day (last 7 days)
export const revenueByDayData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Daily Revenue',
      data: [1850, 2100, 1950, 2300, 2450, 3100, 2700],
      fill: false,
      borderColor: '#3399ff',
      backgroundColor: 'rgba(51, 153, 255, 0.1)',
      borderWidth: 2,
    },
  ],
}

// Chart data for revenue by month (last 12 months)
export const revenueByMonthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Monthly Revenue',
      data: [38000, 42000, 54230.5, 48500, 51000, 52300, 49800, 50500, 53200, 51800, 48900, 46000],
      backgroundColor: '#3399ff',
      borderColor: '#003d99',
      borderWidth: 1,
    },
  ],
}

// Chart data for booking status distribution
export const bookingStatusData = {
  labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
  datasets: [
    {
      label: 'Booking Status',
      data: [125, 18, 32, 167],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3'],
      borderColor: ['#388E3C', '#FFA000', '#D32F2F', '#1565C0'],
      borderWidth: 1,
    },
  ],
}

// Chart data for car utilization
export const carUtilizationData = {
  labels: ['Available', 'In Rental', 'Maintenance', 'Disabled'],
  datasets: [
    {
      label: 'Car Status',
      data: [38, 8, 5, 3],
      backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
      borderColor: ['#388E3C', '#1565C0', '#E65100', '#6A1B9A'],
      borderWidth: 1,
    },
  ],
}
