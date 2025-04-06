import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill-new";
import WysiwygToolbar from "./WysiwygToolbar";
import { ImageResize } from "quill-image-resize-module-ts"; //1.import
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";

if (typeof window !== "undefined" && window.Quill) {
  window.Quill = Quill;
} //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register("modules/ImageResize", ImageResize); //3.Quill 모듈을 등록

const Wysiwyg = ({ htmlContent, setContentHandler }) => {
  const quillRef = useRef();
  const VITE_AWSREGION = import.meta.env.VITE_AWSREGION;
  const VITE_BUCKETNAME = import.meta.env.VITE_BUCKETNAME;
  const VITE_AWSACCESSKEYID = import.meta.env.VITE_AWSACCESSKEYID;
  const VITE_AWSSECRETACCESSKEY = import.meta.env.VITE_AWSSECRETACCESSKEY;
  console.log(VITE_AWSREGION);
  useEffect(() => {
    if (htmlContent) {
      setContentHandler(htmlContent.content);
    }
  }, []);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      if (input !== null && input.files !== null) {
        const file = input.files?.[0];
        try {
          const name = Date.now();

          AWS.config.update({
            region: VITE_AWSREGION,
            accessKeyId: VITE_AWSACCESSKEYID,
            secretAccessKey: VITE_AWSSECRETACCESSKEY,
          });

          const imgUpload = new AWS.S3.ManagedUpload({
            params: {
              ACL: "public-read",
              Bucket: VITE_BUCKETNAME,
              Key: `upload/${name}`,
              Body: file,
            },
          });

          const IMG_URL = await imgUpload
            .promise()
            .then((result) => result.Location)
            .catch((err) => console.log(err));
          console.log(IMG_URL);

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();

          editor.insertEmbed(range.index, "image", IMG_URL);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const handleChange = (value) => {
    setContentHandler(value);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolBar",
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  return (
    <div>
      <div id="toolBar">
        <WysiwygToolbar />
      </div>
      <ReactQuill
        theme="snow"
        placeholder="글을 작성해 주세요"
        modules={modules}
        ref={quillRef}
        style={{ height: "600px", width: "100%" }}
        onChange={handleChange}
        value={htmlContent}
      />
    </div>
  );
};

export default Wysiwyg;
