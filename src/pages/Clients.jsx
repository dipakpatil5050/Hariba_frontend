// import React, { useState, useRef } from "react";
// import Navbar from "../components/Navbar/Navbar";

// import "./documentation.css";

// const FileUploader = () => {
//   const [files, setFiles] = useState(null);
//   const [file, setFile] = useState(null);

//   const inputRef1 = useRef();
//   const inputRef2 = useRef();
//   const inputRef3 = useRef();
//   const [uploading, setUploading] = useState(false);

//   const handleFileSelect = (event) => {
//     setFiles(event.target.files);
//   };

//   // const handleFileSelect = async () => {
//   //   try {
//   //     const [fileHandle] = await window.showOpenFilePicker();
//   //     const file = await fileHandle.getFile();
//   //     setFile(file);
//   //   } catch (error) {
//   //     console.error("Error selecting file", error);
//   //   }
//   // };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setFiles(event.dataTransfer.files);
//   };

//   // send files to the servers with sample API

//   const handleUpload = async () => {
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       Array.from(files).forEach((file, index) => {
//         formData.append(`file${index + 1}`, file);
//       });

//       // Object.keys(files).forEach((key) => {
//       //   formData.append(key, files[key]);
//       // });

//       const response = await fetch("https://httpbin.org/post", {
//         method: "POST",
//         body: formData,
//         // headers: {
//         //   "content-type": files.type,
//         //   "content-length": `${files.size}`,
//         // },
//       });

//       const data = response.json();
//       console.log(data);
//       // Handle server response here
//       console.log("Upload successful ✅", response);
//       // Reset file state after successful upload
//       setFiles(null);
//     } catch (error) {
//       // Handle error
//       console.error("Error uploading files", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // send file to local system path here

//   // const saveToFileSystem = async (file) => {
//   //   try {
//   //     const directoryHandle = await window.showDirectoryPicker();
//   //     const dirHandle = await directoryHandle.getDirectoryHandle(
//   //       "D:/v_Dipak/Hariba Web/Hariba B2B/Hariba_Working/src/assets",
//   //       {
//   //         create: true,
//   //       }
//   //     );
//   //     const fileHandle = await dirHandle.getFileHandle(`${file.name}`, {
//   //       create: true,
//   //     });
//   //     const writable = await fileHandle.createWritable();
//   //     await writable.write(file);
//   //     await writable.close();
//   //     console.log(`${file.name} saved to local file system.`);
//   //   } catch (error) {
//   //     console.error("Error saving file to local file system:", error);
//   //   }
//   // };

//   // const handleUpload = () => {
//   //   if (files) {
//   //     Array.from(files).forEach((file) => {
//   //       saveToFileSystem(file);
//   //     });
//   //     setFiles(null); // Reset files state after saving
//   //   }
//   // };

//   // Section which comes after select file to upload to the server

//   if (files)
//     return (
//       <div className="uploads flex items-center justify-center">
//         <ul>
//           {Array.from(files).map((file, idx) => (
//             <li key={idx}>{file.name}</li>
//           ))}
//         </ul>
//         <div className="actions">
//           <button onClick={() => setFiles(null)}>Cancel</button>
//           <button type="submit" onClick={handleUpload}>
//             Upload
//           </button>
//         </div>
//       </div>
//     );

//   // till here
//   return (
//     <>
//       <Navbar />

//       <div className="container w-6/12 mx-auto mt-40 min-[390px]:w-6/12">
//         <h1 className="text-3xl font-bold flex items-center justify-center mb-4">
//           Documentation
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//           <div className="first-container  h-96 rounded-3xl w-full ">
//             <div
//               className="dropzone pb-10 pt-10 bg-sky-100 bg-opacity-35 hover:bg-opacity-85"
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               <span className="font-bold mt-8"> Client Data :</span>
//               <div className="icon">
//                 <img src="https://i.imgur.com/nzo8mAO.png" width={85} alt="" />
//               </div>
//               <h1 className="text-lg mt-5">Drag and Drop Files to Upload</h1>
//               <h1>Or</h1>
//               <input
//                 type="file"
//                 name="file"
//                 multiple
//                 onChange={(event) => setFiles(event.target.files)}
//                 hidden
//                 accept=".xlsx, .csv"
//                 ref={inputRef1}
//               />
//               <button
//                 className="bg-[#593808] text-white p-2 px-3 text-lg rounded-2xl"
//                 onClick={() => inputRef1.current.click()}
//               >
//                 Select Files
//               </button>
//               <span className="text-lg text-gray-600">
//                 Choose .xlsx, .csv, Excel file
//               </span>
//             </div>
//           </div>

//           {/* second container */}

//           <div className="second-container h-96 rounded-3xl w-full ">
//             <div
//               className="dropzone pb-10 pt-10 bg-sky-100 bg-opacity-35 hover:bg-opacity-85"
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               <span className="font-bold mt-8"> Company Logo :</span>
//               <div className="icon">
//                 <img src="https://i.imgur.com/nzo8mAO.png" width={85} alt="" />
//               </div>
//               <h1 className="text-lg mt-5">Drag and Drop Files to Upload</h1>
//               <h1>Or</h1>
//               <input
//                 type="file"
//                 multiple
//                 onChange={(event) => setFiles(event.target.files)}
//                 hidden
//                 accept=".jpg, .jpeg, .png, gif"
//                 ref={inputRef2}
//               />
//               <button
//                 className="bg-[#593808] text-white p-2 px-3 text-lg rounded-2xl"
//                 onClick={() => inputRef2.current.click()}
//               >
//                 Select Files
//               </button>
//               <span className="text-lg text-gray-600">
//                 Choose .jpg, .jpeg, .png file
//               </span>
//             </div>
//           </div>

//           {/* third Container */}
//           <div className="third-container h-96 rounded-3xl w-full ">
//             <div
//               className="dropzone pb-10 pt-10 bg-sky-100 bg-opacity-35 hover:bg-opacity-85"
//               onDragOver={handleDragOver}
//               onDrop={handleDrop}
//             >
//               <span className="font-bold mt-8"> Box Design :</span>
//               <div className="icon">
//                 <img src="https://i.imgur.com/nzo8mAO.png" width={85} alt="" />
//               </div>
//               <h1 className="text-lg mt-5">Drag and Drop Files to Upload</h1>
//               <h1>Or</h1>
//               <input
//                 type="file"
//                 multiple
//                 onChange={(event) => setFiles(event.target.files)}
//                 hidden
//                 accept=".pdf, .doc, .docx,"
//                 ref={inputRef3}
//               />
//               <button
//                 className="bg-[#593808] text-white p-2 px-3 text-lg rounded-2xl"
//                 onClick={() => inputRef3.current.click()}
//               >
//                 Select Files
//               </button>
//               <span className="text-lg text-gray-600">
//                 Choose .pdf, .doc file
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* <button
//           type="submit"
//           onClick={handleUpload}
//           className="mt-4 bg-[#593808]  hover:bg-[#595000] text-white font-bold py-2 px-4 rounded"
//         >
//           Upload Files
//         </button> */}
//       </div>
//     </>
//   );
// };

// export default FileUploader;

// using handleUpload function and onClick event

// import React, { useState } from "react";

// const Clients = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await fetch("http://localhost:3000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }

//       console.log(await response.json());
//       alert("File uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading file: ", error);
//       alert("Error uploading file");
//     }
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleSubmit}>Upload</button>
//     </div>
//   );
// };

// export default Clients;

// using index file and Form tag

import React from "react";

function Clients() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        action="http://localhost:5156/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Clients;
