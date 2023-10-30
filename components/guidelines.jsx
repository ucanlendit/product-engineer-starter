"use client";
import { useEffect, useState } from "react";
import {Textarea, Button} from "@nextui-org/react";

export default function Guidelines({ onDone }) {
  const [text, setText] = useState("");
  const [cases, setCases] = useState([]);
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("cases")) || [];
    const storedCaseID = parseInt(localStorage.getItem("caseID")) || null;
    const storedCaseData =
      storedCases.filter((obj) => obj.id === storedCaseID)[0] || null;
    if (!storedCaseData) {
      return;
    }
    setCases(storedCases);
    setCaseData(storedCaseData);
  }, []);

  if (!caseData) {
    return <div>No case found!</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text) {
      alert("Please enter guidelines text.");
      return;
    }

    fetch("/api/guidelines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guidelinesText: text }),
    })
      .then((response) => {
        console.log("response", {response})
        if (!response.ok) {
          throw new Error("Unable to submit guidelines. Please try again.");
        }
        return response.json();
      })
      .then((data) => {
        cases[cases.indexOf(caseData)].prediction = data;
        cases[cases.indexOf(caseData)].guidelinesText = text;
        localStorage.setItem("cases", JSON.stringify(cases));
        onDone();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="w-[65%]">
      <p className="mb-6"> Guidelines for {caseData.medicalRecord}</p>
    
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here, or copy & paste ..."
      />
      <p className="mb-8 text-xs">
        Please enter the relevant guidelines for this case in the box above.
      </p>
      <Button color="primary" size='lg' isDisabled={text.length === 0} className="float-right mt-2" onClick={handleSubmit}>Start Analysis</Button>
    </div>
  );
}
