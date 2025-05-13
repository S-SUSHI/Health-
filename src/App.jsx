import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const UserInfoForm = ({ onSave }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    gender: '',
    medicalHistory: '',
    bloodPressure: '',
    bloodOxygen: ''
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      {[
        { key: 'name', label: '姓名', type: 'text' },
        { key: 'age', label: '年龄', type: 'number' },
        { key: 'gender', label: '性别', type: 'text' },
        { key: 'medicalHistory', label: '过往病史', type: 'text' },
        { key: 'bloodPressure', label: '血压 (mmHg)', type: 'text' },
        { key: 'bloodOxygen', label: '血氧 (%)', type: 'number' }
      ].map((field) => (
        <div key={field.key}>
          <label className="block font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.key}
            value={userInfo[field.key]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        保存用户信息
      </button>
    </form>
  );
};

const HealthForm = ({ onAddRecord }) => {
  const [form, setForm] = useState({
    date: '',
    weight: '',
    water: '',
    sleep: '',
    exercise: '',
    meals: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.weight) return alert('请输入日期和体重');
    onAddRecord(form);
    setForm({ date: '', weight: '', water: '', sleep: '', exercise: '', meals: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      {[
        { key: 'date', label: '日期', type: 'date' },
        { key: 'weight', label: '体重 (kg)', type: 'number' },
        { key: 'water', label: '饮水量 (L)', type: 'number' },
        { key: 'sleep', label: '睡眠时长 (小时)', type: 'number' },
        { key: 'exercise', label: '运动时长 (分钟)', type: 'number' },
        { key: 'meals', label: '饮食记录', type: 'text' }
      ].map((field) => (
        <div key={field.key}>
          <label className="block font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.key}
            value={form[field.key]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        添加健康记录
      </button>
    </form>
  );
};

const HealthDashboard = ({ data }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2">体重变化趋势</h2>
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    </LineChart>
    <h2 className="text-xl font-semibold mt-6 mb-2">饮食记录</h2>
    <ul className="list-disc pl-5">
      {data.map((item, index) => (
        <li key={index}>
          {item.date} - {item.meals || '无记录'}
        </li>
      ))}
    </ul>
  </div>
);

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [healthData, setHealthData] = useState([]);

  const addHealthRecord = (record) => {
    setHealthData([...healthData, record]);
  };

  useEffect(() => {
    const reminder = setInterval(() => {
      alert('记得今天打卡健康数据哦！');
    }, 3600000);

    return () => clearInterval(reminder);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">健康管理小助手</h1>
      {!userInfo ? (
        <UserInfoForm onSave={setUserInfo} />
      ) : (
        <>
          <p className="mb-4">欢迎，{userInfo.name}！</p>
          <HealthForm onAddRecord={addHealthRecord} />
          <HealthDashboard data={healthData} />
        </>
      )}
    </div>
  );
}

