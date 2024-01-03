import { PageHeader } from "@ant-design/pro-components";
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {Button, Divider, Input, message, Upload} from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

function DataIndex() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      const fileExtension = file.name.split('.').pop();
      formData.append('save_name', `${inputValue}.${fileExtension}`)
      formData.append('data', file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('http://localhost:8888/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setFileList([]);
        message.success(res.message);
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
        setInputValue("");
      });
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <PageHeader title={"数据上传"}>
      在这里上传你的数据到服务器(.csv)文件，以便于你可以在后续处理它。
      </PageHeader>
      <Divider />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Input placeholder={"文件名"} value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}>

      </Input>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
}

export default DataIndex