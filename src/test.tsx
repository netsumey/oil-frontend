import {PageHeader} from "@ant-design/pro-components";
import {Divider} from "antd";

function Test() {
  return (
    <>
      <PageHeader title={"测试"}>
        有了模型后可以在这里测试，选择步长，然后可以得到图像。
      </PageHeader>
      <Divider />
    </>
  )
}