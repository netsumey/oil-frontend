import React from 'react';
import './App.css';
import { ProLayout } from '@ant-design/pro-components'
import logo from './Milennium_B.svg'
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import Data from "./data";
import DataDisplay from "./data_display";
import Model from "./model";
import DataHandler from "./data_handler";
import Test from "./test";

const menuData = [
  {
    path: '/data',
    name: '数据',
    icon: 'home',
    children: [
      {
        path: '/data/upload',
        name: '数据上传',
        icon: 'upload'
      },
      {
        path: '/data/display',
        name: '数据展示',
        icon: 'deal'
      },
      {
        path: '/data/handler',
        name: '数据处理',
        icon: 'nil'
      },
    ]
  },
  {
    path: '/model',
    name: '模型',
    icon: 'dashboard',
  },
  {
    path: '/test',
    name: '测试',
    icons: 'test'
  }
];

function App() {
  return (
    <Router>
      <ProLayout title="可视化系统" logo={logo} menuDataRender={() => menuData} menuItemRender={(item, dom) => (
        <Link to={item.path ?? '/'}>
          {dom}
        </Link>
      )}>
        <Routes>
          <Route path={"/data/upload"} Component={Data} />
          <Route path={"/data/display"} Component={DataDisplay} />
          <Route path={"/model"} Component={Model}/>
          <Route path={"/data/handler"} Component={DataHandler} />
          <Route path={"/test"} Component={Test} />
        </Routes>
      </ProLayout>
    </Router>
  );
}

export default App;