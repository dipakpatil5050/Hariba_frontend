import React, { useRef, useState } from "react";
// import PropTypes from "prop-types";

import "./drop-file-input.css";

import uploadImg from "../../assets/cloud-upload-regular-240.png";

const DropFileInput = () => {
  const wrapperRef = useRef(null);
  const inputRef = useRef();

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      //   props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
  };

  return (
    <>
      <div className="container  mx-auto min-[390px]:w-6/12">
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="first-container  h-96 rounded-3xl w-full ">
            <div
              className="dropzone pb-10 pt-10 bg-sky-100 bg-opacity-35 hover:bg-opacity-85"
              //   onDragOver={handleDragOver}
              //   onDrop={handleDrop}
            >
              <span className="font-bold mt-8"> Client Data :</span>
              <div className="icon">
                <img src="https://i.imgur.com/nzo8mAO.png" width={85} alt="" />
              </div>
              <h1 className="text-lg mt-5">Drag and Drop Files to Upload</h1>
              <h1>Or</h1>
              <input
                type="file"
                multiple
                // onChange={(event) => setFiles(event.target.files)}
                onChange={onFileDrop}
                hidden
                accept=".xlsx, .csv"
                ref={inputRef}
              />
              <button
                className="bg-[#593808] text-white p-2 px-3 text-lg rounded-2xl"
                onClick={() => inputRef.current.click()}
              >
                Select Files
              </button>
              <span className="text-lg text-gray-600">
                Choose .xlsx, .csv, Excel file
              </span>
            </div>

            {fileList.length > 0 ? (
              <div className="drop-file-preview ">
                <p className="drop-file-preview__title">Ready to upload</p>
                {fileList.map((item, index) => (
                  <div key={index} className="drop-file-preview__item w-52">
                    <img src={uploadImg} alt="" />
                    <div className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                      <p>{item.size}B</p>
                    </div>
                    <span
                      className="drop-file-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* <input type="file" value="" onChange={onFileDrop} /> */}
        </div>

        {fileList.length > 0 ? (
          <div className="drop-file-preview ">
            <p className="drop-file-preview__title">Ready to upload</p>
            {fileList.map((item, index) => (
              <div key={index} className="drop-file-preview__item w-52">
                <img src={uploadImg} alt="" />
                <div className="drop-file-preview__item__info">
                  <p>{item.name}</p>
                  <p>{item.size}B</p>
                </div>
                <span
                  className="drop-file-preview__item__del"
                  onClick={() => fileRemove(item)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DropFileInput;
