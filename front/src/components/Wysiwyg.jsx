import React, { useMemo, useRef, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
import WysiwygToolbar from "./WysiwygToolbar";
import { ImageResize } from "quill-image-resize-module-ts"; //1.import
import { useForm } from "react-hook-form";

if (typeof window !== "undefined" && window.Quill) {
  window.Quill = Quill;
} //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register("modules/ImageResize", ImageResize); //3.Quill 모듈을 등록

const Wysiwyg = ({ htmlContent, setContentHandler }) => {
  console.log(htmlContent);
  const { handleSubmit, register, setValue, trigger } = useForm({
    mode: "onChange",
  });
  const handleChange = (val) => {
    console.log(val);
    // const { name, value } = e.target;
    // console.log("plzzzz");
    setContentHandler(val);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolBar",
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
        style={{ height: "600px", width: "100%" }}
        onChange={handleChange}
        value={htmlContent}
      />
    </div>
  );
};

export default Wysiwyg;
