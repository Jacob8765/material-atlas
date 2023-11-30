import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

interface ResearchPaperUploadProps {
  handleUpload: (file: any) => void;
}

const ResearchPaperUpload = ({ handleUpload }: ResearchPaperUploadProps) => {
  const props = {
    name: "file",
    multiple: false,
    action: "",
    onChange: async (info: any) => {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        try {
          await handleUpload(info.file);
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop: async (e: any) => {
      console.log("Dropped files", e.dataTransfer.files);
      e.preventDefault();
      await handleUpload(e.dataTransfer.files[0]);
    },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Our AI can help extract information by uploading a pdf of the research
          paper.
        </p>
      </Dragger>
    </>
  );
};

export default ResearchPaperUpload;
