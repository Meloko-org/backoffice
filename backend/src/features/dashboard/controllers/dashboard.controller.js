const { getTodayStats, getUserStats, getAlerts, getRecentOrders, getRecentUsers } = require("../services/dashboard.services");

const dashboard = async (req, res) => {
  const role = req.user.role.name;

  // requêtes parallèles
  const [
    todayStats,
    userStats,
    alerts,
    recentOrders,
    recentUsers
  ] = await Promise.all([
    getTodayStats(),
    getUserStats(),
    getAlerts(),
    getRecentOrders(),
    getRecentUsers()
  ]);

  const data = {
    today: todayStats,
    users: userStats,
    alerts,
    recentOrders,
    recentUsers,
  };

  // 🔥 filtrage par rôle
  if (role !== "admin") {
    data.today = {
      orders: data.today.orders,
    };
  }

  res.json(data);
}


module.exports = {
  dashboard,
}