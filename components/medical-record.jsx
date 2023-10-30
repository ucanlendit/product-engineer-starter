"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Router from "next/router";
import { Button } from "@nextui-org/react";
// import styles from "../styles/upload.module.css";
// import stylesShared from "../styles/shared.module.css";

export default function MedicalRecord({ onDone }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (file) => {
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("medicalRecord", file);
    fetch("/api/medical-record", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to upload file. Please try again later.");
        }
      })
      .then(() => {
        const medicalRecord = cleanFileName(file.name);
        if (!localStorage.getItem("cases")) {
          localStorage.setItem("cases", "[]");
        }
        const cases = JSON.parse(localStorage.getItem("cases"));
        const caseID = parseInt(localStorage.getItem("caseID")) + 1 || 1;
        cases.push({
          id: caseID,
          timestamp: new Date().toISOString(),
          medicalRecord: medicalRecord,
        });
        localStorage.setItem("caseID", String(caseID));
        localStorage.setItem("cases", JSON.stringify(cases));
        onDone();
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="w-[65%]">
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        hoverTitle="drop here"
        types={["PDF"]}>
        <div className="border-dashed border-2 border-sky-gray p-8 rounded-lg mt-10 h-[200px] justify-center flex flex-col cursor-pointer">
          {!file ? (
            <>
              <p className="mb-4">
                Please upload a PDF copy of the medical record for this case.
              </p>
              <p className="mb-4">
                You can click the box below to select the PDF from your file
                system, or you can drag-and-drop.
              </p>
              <p className="mb-4">
                Only a single PDF can be uploaded. When you are ready, press
                'Continue'.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                file: {file?.name} has been succesfully uploaded. 
                <br/>
              </p>
            </>
          )}
        </div>
      </FileUploader>
      {error && <p>{error}</p>}
      <Button
        isDisabled={file === null}
        variant="shadow"
        size="lg"
        color="primary"
        className="float-right	 mt-2"
        onClick={handleSubmit}>
        Add Medical Record To Analysis
      </Button>
    </div>
  );
}

function cleanFileName(fileName) {
  return truncate(stripExtension(fileName), 30);
}

function stripExtension(fileName) {
  return fileName.replace(/\.[^/.]+$/, "");
}

function truncate(string, maxLength) {
  return string.length <= maxLength
    ? string
    : string.substring(0, maxLength) + "...";
}
