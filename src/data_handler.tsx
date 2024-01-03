import React, { useState } from 'react';
import { Button, Divider, Input, Select, message } from 'antd';
import DataSelector from './data_selector';
import {PageHeader} from "@ant-design/pro-components";

const DataHandler = () => {
  const nilOption = ['Mean', 'Median', 'Forward', 'Backward', 'Delete'];
  const [fileName, setFileName] = useState('');
  const [rowIndex, setRowIndex] = useState('');
  const [colIndex, setColIndex] = useState('');
  const [colNames, setColNames] = useState('');
  const [normalizationMethod, setNormalizationMethod] = useState('Z');
  const [missingValueMethod, setMissingValueMethod] = useState('Mean');
  const [saveAsFileName, setSaveAsFileName] = useState('');

  const handleExecution = () => {
    // Prepare the request payload
    const requestData = {
      file_name: fileName,
      row_index: rowIndex,
      col_index: colIndex,
      col_names: colNames,
      method: normalizationMethod,
      nil: missingValueMethod,
      save_name: saveAsFileName,
    };

    // Send the request to localhost:8888/data/handle
    fetch('http://localhost:8888/data/handle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          message.success('操作执行成功');
        } else {
          message.error('操作执行失败');
        }
      })
      .catch((error) => {
        message.error('请求失败，请检查网络或服务器状态');
        console.error('请求时发生错误:', error);
      });
  };

  return (
    <>
      <PageHeader title={'数据处理'}>
        你可以在这里处理你已经上传过的数据，并将它们另存为新的一份
      </PageHeader>
      <Divider />
      选择数据文件
      <DataSelector onSelectFileName={(fileName: React.SetStateAction<string>) => setFileName(fileName)} />
      按行索引删除行
      <Input value={rowIndex} onChange={(e) => setRowIndex(e.target.value)} />
      按列索引删除列
      <Input value={colIndex} onChange={(e) => setColIndex(e.target.value)} />
      按列名删除列(不同列名间使用英文逗号隔开)
      <Input value={colNames} onChange={(e) => setColNames(e.target.value)} />
      正则化
      <Select
        value={normalizationMethod}
        onChange={(value) => setNormalizationMethod(value)}
        options={[
          {
            label: 'MinMax',
            value: 'MinMax',
          },
          {
            label: 'Z',
            value: 'Z',
          },
        ]}
      ></Select>
      处理缺失值
      <Select
        value={missingValueMethod}
        onChange={(value) => setMissingValueMethod(value)}
        options={nilOption.map((e, idx) => ({
          label: e,
          value: e,
        }))}
      ></Select>
      另存为
      <Input value={saveAsFileName} onChange={(e) => setSaveAsFileName(e.target.value)} />
      <Button onClick={handleExecution}>执行</Button>
    </>
  );
};

export default DataHandler;
