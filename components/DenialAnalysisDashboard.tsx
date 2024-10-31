'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const DenialAnalysisDashboard: React.FC = () => {
  const [view, setView] = useState('payer');
  const [timeRange, setTimeRange] = useState('all');
  
  const fullData = {
    payer: [
      { 
        name: "Express Scripts (ESI)", 
        value: 42,
        dates: {
          '1m': 12,
          '3m': 25,
          '6m': 35,
          'all': 42
        },
        details: {
          "Product Exclusion": 15,
          "Failed To Meet Medical Necessity": 12,
          "No Reason Specified": 8,
          "Clinical Documentation Not Provided": 7
        }
      },
      { 
        name: "OptumRx", 
        value: 38,
        dates: {
          '1m': 10,
          '3m': 22,
          '6m': 30,
          'all': 38
        },
        details: {
          "Failed To Meet Step Therapy": 14,
          "Product Exclusion": 12,
          "No Reason Specified": 8,
          "Failed To Meet Medical Necessity": 4
        }
      },
      { 
        name: "CVS Caremark", 
        value: 35,
        dates: {
          '1m': 8,
          '3m': 20,
          '6m': 28,
          'all': 35
        },
        details: {
          "Failed To Meet Medical Necessity": 12,
          "Product Exclusion": 10,
          "Clinical Documentation Not Provided": 8,
          "No Reason Specified": 5
        }
      },
      { 
        name: "Blue Cross Blue Shield", 
        value: 30,
        dates: {
          '1m': 7,
          '3m': 18,
          '6m': 25,
          'all': 30
        },
        details: {
          "Failed To Meet Medical Necessity": 12,
          "No Reason Specified": 10,
          "Product Exclusion": 8
        }
      },
      { 
        name: "UnitedHealthcare", 
        value: 28,
        dates: {
          '1m': 6,
          '3m': 15,
          '6m': 22,
          'all': 28
        },
        details: {
          "Failed To Meet Medical Necessity": 10,
          "Product Exclusion": 8,
          "No Reason Specified": 6,
          "Clinical Documentation Not Provided": 4
        }
      }
    ],
    reason: [
      { name: "Failed To Meet Medical Necessity", value: 50, dates: {'1m': 15, '3m': 30, '6m': 42, 'all': 50} },
      { name: "Product Exclusion", value: 45, dates: {'1m': 12, '3m': 28, '6m': 38, 'all': 45} },
      { name: "No Reason Specified", value: 37, dates: {'1m': 10, '3m': 22, '6m': 30, 'all': 37} },
      { name: "Clinical Documentation Not Provided", value: 25, dates: {'1m': 8, '3m': 15, '6m': 20, 'all': 25} },
      { name: "Failed To Meet Step Therapy", value: 20, dates: {'1m': 5, '3m': 12, '6m': 16, 'all': 20} },
      { name: "Appeals Exhausted", value: 15, dates: {'1m': 4, '3m': 8, '6m': 12, 'all': 15} }
    ]
  };

  const filteredData = useMemo(() => {
    const currentData = view === 'payer' ? fullData.payer : fullData.reason;
    return currentData.map(item => ({
      name: item.name,
      value: item.dates[timeRange]
    }));
  }, [view, timeRange]);

  const timeRangeLabels = {
    'all': 'All Time',
    '6m': 'Last 6 Months',
    '3m': 'Last 3 Months',
    '1m': 'Last Month'
  };

  return (
    <div className="w-full max-w-6xl space-y-4 p-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Insurance Denial Analysis Dashboard</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => setView('payer')}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${view === 'payer' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                >
                  By Payer
                </button>
                <button 
                  onClick={() => setView('reason')}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${view === 'reason' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                >
                  By Denial Reason
                </button>
              </div>
              <div className="flex gap-2">
                {Object.entries(timeRangeLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setTimeRange(value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${timeRange === value ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: '400px', background: '#fff' }}>
            <BarChart
              width={800}
              height={400}
              data={filteredData}
              margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </div>
        </CardContent>
      </Card>

      {view === 'payer' && (
        <Card>
          <CardHeader>
            <CardTitle>Top Denial Reasons by Payer ({timeRangeLabels[timeRange]})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fullData.payer.map((payer) => (
                <Card key={payer.name}>
                  <CardHeader>
                    <CardTitle className="text-sm">{payer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {Object.entries(payer.details).map(([reason, count]) => (
                        <li key={reason} className="flex justify-between text-sm">
                          <span>{reason}:</span>
                          <span className="font-semibold">
                            {Math.round((count as number) * payer.dates[timeRange] / payer.dates.all)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DenialAnalysisDashboard;