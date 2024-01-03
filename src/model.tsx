import React, { useState } from 'react';
import { Divider, Input, Select, Button, message } from 'antd';
import DataSelector from './data_selector';
import { PageHeader } from '@ant-design/pro-components';

const Model = () => {
  const [trainingSet, setTrainingSet] = useState('');
  const [testSet, setTestSet] = useState('');
  const [validationSet, setValidationSet] = useState('');
  const [modelName, setModelName] = useState('');
  const [architecture, setArchitecture] = useState('Autoformer');
  const [seqLen, setSeqLen] = useState('');
  const [labelLen, setLabelLen] = useState('');
  const [eLayers, setELayers] = useState('');
  const [dLayers, setDLayers] = useState('');
  const [factor, setFactor] = useState('');
  const [encIn, setEncIn] = useState('');
  const [decIn, setDecIn] = useState('');
  const [cOut, setCOut] = useState('');
  const [itr, setItr] = useState('');
  const [predLen, setPredLen] = useState(''); // Added predLen state

  const architectureOptions = ['LSTM', 'Transformer', 'RNN', 'GRU'];

  const handleTrainModel = () => {
    // Prepare the request payload
    const requestData = {
      train: trainingSet,
      test: testSet,
      valid: validationSet,
      output_name: modelName,
      structure: architecture,
      seq_len: seqLen,
      label_len: labelLen,
      pred_len: predLen, // Added predLen
      e_layers: eLayers,
      d_layers: dLayers,
      factor: factor,
      enc_in: encIn,
      dec_in: decIn,
      c_out: cOut,
      itr: itr,
    };

    // Send the request to localhost:8888/model/train
    fetch('http://localhost:8888/model/train', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          message.success('模型训练中');
        } else {
          message.error('模型训练失败');
        }
      })
      .catch((error) => {
        message.error('请求失败，请检查网络或服务器状态');
        console.error('请求时发生错误:', error);
      });
  };

  return (
    <>
      <PageHeader title={'模型'}>
        你可以在这里对模型进行训练(根据数据集)，选择数据集和需要的架构，就可以训练出模型。
      </PageHeader>
      <Divider />
      选择训练集
      <DataSelector onSelectFileName={(fileName: React.SetStateAction<string>) => setTrainingSet(fileName)} />
      选择测试集
      <DataSelector onSelectFileName={(fileName: React.SetStateAction<string>) => setTestSet(fileName)} />
      选择验证集
      <DataSelector onSelectFileName={(fileName: React.SetStateAction<string>) => setValidationSet(fileName)} />
      模型的保存名字:
      <Input value={modelName} onChange={(e) => setModelName(e.target.value)} />
      选择架构:
      <Select
        value={architecture}
        onChange={(value) => setArchitecture(value)}
        options={architectureOptions.map((e, idx) => ({
          value: e,
          label: e,
        }))}
      ></Select>
      seq_len:
      <Input value={seqLen} onChange={(e) => setSeqLen(e.target.value)} />
      label_len:
      <Input value={labelLen} onChange={(e) => setLabelLen(e.target.value)} />
      pred_len: {/* Added predLen input */}
      <Input value={predLen} onChange={(e) => setPredLen(e.target.value)} />
      e_layers:
      <Input value={eLayers} onChange={(e) => setELayers(e.target.value)} />
      d_layers:
      <Input value={dLayers} onChange={(e) => setDLayers(e.target.value)} />
      factor:
      <Input value={factor} onChange={(e) => setFactor(e.target.value)} />
      enc_in:
      <Input value={encIn} onChange={(e) => setEncIn(e.target.value)} />
      dec_in:
      <Input value={decIn} onChange={(e) => setDecIn(e.target.value)} />
      c_out:
      <Input value={cOut} onChange={(e) => setCOut(e.target.value)} />
      itr:
      <Input value={itr} onChange={(e) => setItr(e.target.value)} />
      <Button onClick={handleTrainModel}>训练模型</Button>
    </>
  );
};

export default Model;
