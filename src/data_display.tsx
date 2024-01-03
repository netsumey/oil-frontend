import {Select, Divider, Checkbox, Input, Button, message} from "antd";
import { SetStateAction, useEffect, useState} from "react";
import {PageHeader} from "@ant-design/pro-components";
import DataSelector from "./data_selector";

function DataDisplay() {
  const [showRowCountColumnCount, setShowRowCountColumnCount] = useState(false);
  const [showRowAndColumnNames, setShowRowAndColumnNames] = useState(false);
  const [tableStartColumn, setTableStartColumn] = useState('');
  const [isQueryButtonDisabled, setIsQueryButtonDisabled] = useState(false);
  const [fileName, setFileName] = useState('无');
  const [responseBody, setResponseBody] = useState<string | undefined>(undefined);

  const requestData = {
    name: fileName,
    count: showRowCountColumnCount,
    row_name: showRowAndColumnNames,
    amount: tableStartColumn
  };

  const handleQuery = () => {
    message.info("正在请求数据...")

    fetch('http://localhost:8888/data/display', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }).then((response) => {
      if (response.ok) {
        message.success('查询成功')
        return response.text();
      } else {
        message.error('查询失败')
      }

    }).then((res) => {
      setResponseBody(res);
    }).finally(() => {
      setIsQueryButtonDisabled(false)
    })
  }

  const handleFileNameSelect = (selectedFileName: SetStateAction<string>) => {
    setFileName(selectedFileName);
  };

  return (
    <>
      <PageHeader title={"数据展示"}>
        你可以在这里选择你之前上传的文件并查看和它有关的信息。
      </PageHeader>
      <Divider />
      选择你想查看的文件(非.csv文件没有列出):
      <DataSelector onSelectFileName={handleFileNameSelect} />
      选择你需要的信息:
      <Checkbox
        onChange={(e) => setShowRowCountColumnCount(e.target.checked)}
      >
        行数与列数
      </Checkbox>
      <Checkbox
        onChange={(e) => setShowRowAndColumnNames(e.target.checked)}
      >
        行名与列名
      </Checkbox>
      <Input
        placeholder={"表格前列数"}
        value={tableStartColumn}
        onChange={(e) => setTableStartColumn(e.target.value)}
        disabled={isQueryButtonDisabled}
      />
      <Button
        onClick={handleQuery}
        disabled={isQueryButtonDisabled}
      >
        查询
      </Button>
      {responseBody && (
        <div>
          <p>查询结果:</p>
          <pre>{responseBody}</pre>
        </div>
      )}
    </>
  )
}

export default DataDisplay;