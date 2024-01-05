import React, { useState, useEffect } from 'react';
import {Divider, Select, Button, message, Descriptions, Image} from 'antd';
import { PageHeader } from "@ant-design/pro-components";

const Test = () => {
  interface ModelInfo {
    name: string;
    task_name: string;
    structure: string;
    data_source: string;
  }

  const [modelOptions, setModelOptions] = useState<ModelInfo []>([]);
  const [selectedModel, setSelectedModel] = useState ('');
  const [selectedModelInfo, setSelectedModelInfo] = useState<ModelInfo | null>(null);
  const [selectedModelImageBase64, setSelectedModelImageBase64] = useState('');

  useEffect (() => {
    fetch ('http://localhost:8888/model/get_all', {
      method: "POST",
    })
      .then ((response) => response.json ())
      .then ((data) => {
        const combinedModelInfo = JSON.parse (data.name).map ((name: string, index: number) => ({
          name,
          task_name: JSON.parse (data.task_name)[index],
          structure: JSON.parse (data.structure)[index],
          data_source: JSON.parse (data.data_source)[index],
        }));
        setModelOptions (combinedModelInfo);
      })
      .catch ((error) => console.error (' 获取模型列表时发生错误:', error));

    // 在组件卸载时清理Base64字符串
    return () => {
      setSelectedModelImageBase64('');
    };
  }, [selectedModelImageBase64]);

  const handleTestModel = () => {
    // 检查是否选择了模型
    if (!selectedModel) {
      message.error (' 请选择一个模型 ');
      return;
    }

    // 发送请求到 http://localhost:8888/model/test
    fetch ('http://localhost:8888/model/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        name: selectedModel,
      }),
    })
      .then ((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error ('测试模型请求失败');
        }
      })
      .then(res => res.slice(1, -1))
      .then ((base64) => {
        setSelectedModelImageBase64 (base64);

        message.success ('测试模型请求成功');
      })
      .catch ((error) => {
        message.error ('请求失败，请检查网络或服务器状态');
        console.error ('请求时发生错误:', error);
      });
  };

  const handleModelChange = (value: string) => {
    // 从modelOptions中找到所选模型的信息
    const selectedModelInfo = modelOptions.find ((model) => model.name === value);

    // 更新所选模型及其信息
    setSelectedModel (value);
    setSelectedModelInfo (selectedModelInfo || null);
  };

  return (
    <>
      <PageHeader title={' 测试 '}>
        有了模型后可以在这里测试，选择模型，然后得到图像。
      </PageHeader>
      <Divider />
      选择模型:
      <Select value={selectedModel} onChange={handleModelChange}>
        {modelOptions.map ((model) => (
          <Select.Option key={model.name} value={model.name}>
            {model.name}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={handleTestModel}> 测试模型 </Button>

      {selectedModelInfo && (
        <>
          <Divider />
          <Descriptions title="模型信息" column={2}>
            <Descriptions.Item label="任务名称">{selectedModelInfo.task_name}</Descriptions.Item>
            <Descriptions.Item label="架构">{selectedModelInfo.structure}</Descriptions.Item>
            <Descriptions.Item label="数据集来源">{selectedModelInfo.data_source}</Descriptions.Item>
          </Descriptions>
        </>
      )}

      {selectedModelImageBase64 && (
        <>
          <Divider />
          { console.log(selectedModelImageBase64) }
          <Image width={500} src={`data:image/png;base64, ${selectedModelImageBase64}`}></Image>
        </>
      )}
    </>
  );
};

export default Test;
