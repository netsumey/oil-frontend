import { SetStateAction, useEffect, useState} from "react";
import {Select} from "antd";

// @ts-ignore
function DataSelector({onSelectFileName}) {
  const [fileName, setFileName] = useState('无');
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8888/data/get_names', {
      method: 'POST'
    }).then((res) => res.json())
      .then((res) => setFileNames(JSON.parse(res.names)))
  }, []);

  const handleFileNameChange = (value: SetStateAction<string>) => {
    setFileName(value);
    onSelectFileName(value); // 调用父组件传递的回调函数，将 fileName 传递给父组件
  };

  return (
    <>
      <Select
        defaultValue={fileName}
        onChange={handleFileNameChange}
        options={fileNames.map((e) => ({ value: e, label: e }))}
      />
    </>
  );
}

export default DataSelector;