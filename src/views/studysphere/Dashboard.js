import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const primary = '#006A67'
const accent = '#9CF1ED'
const darkText = '#3F4948'
const bg = '#f5f7f7'

const Dashboard = () => {
    const [stats, setStats] = useState([
        { title: 'Total Users', value: '0' },
        { title: 'Total Revenue', value: 'LKR 0' },
        { title: 'All Earnings', value: 'LKR 0' },
        { title: 'Providers', value: '0' },
    ]);

    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      axios.get('http://localhost:8080/api/v1/dashboard/stats')
        .then(res => {
          console.log("Data from Backend:", res.data);
          const data = res.data;

          setStats([
              { title: 'Total Users', value: data.totalUsers },
              { title: 'Total Revenue', value: `LKR ${data.totalRevenue}` },
              { title: 'All Earnings', value: `LKR ${data.allEarnings}` },
              { title: 'Providers', value: data.providers },
          ]);

          if(data.dailyRevenueList) {
              setDailyRevenue(data.dailyRevenueList);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Connection Error:", err);
          setLoading(false);
        });
  }, []);

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Dashboard Data...</div>;

    return (
        <div style={{ background: bg, minHeight: '100vh', padding: '0', margin: '0' }}>
            {/* Statistics Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                padding: '32px',
                marginBottom: '32px',
            }}>
                {stats.map((stat) => (
                    <div key={stat.title} style={{
                        background: primary,
                        color: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,106,103,0.12)',
                        padding: '24px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '110px',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.85 }}>{stat.title}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '8px' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Daily Revenue Chart */}
            <div style={{
                maxWidth: '95%',
                height: '570px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 4px 24px rgba(63,73,72,0.08)',
                padding: '32px 28px',
                marginBottom: '48px',
            }}>
                <div style={{
                    color: darkText,
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    marginBottom: '18px',
                }}>Daily Revenue</div>

                <ResponsiveContainer width="100%" height={440}>
                    <LineChart data={dailyRevenue} margin={{ top: 24, right: 32, left: 0, bottom: 36 }}>
                        <CartesianGrid stroke="#e0e3e3" strokeDasharray="4 4" />
                        <XAxis dataKey="day" stroke={darkText} fontSize={14} dy={15} />
                        <YAxis stroke={darkText} fontSize={14} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${accent}` }} />
                        <Legend verticalAlign="top" height={36} wrapperStyle={{ color: darkText, fontWeight: 600 }} />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke={primary}
                            strokeWidth={4}
                            dot={{ r: 6, stroke: accent, strokeWidth: 2 }}
                            name="Revenue"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Dashboard