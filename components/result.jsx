"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export default function result() {
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("cases")) || [];
    const storedCaseID = parseInt(localStorage.getItem("caseID")) || null;
    const storedCaseData =
      storedCases.filter((obj) => obj.id === storedCaseID)[0] || null;
    if (!storedCaseData) {
      return;
    }
    setCaseData(storedCaseData);
  }, []);

  if (!caseData) {
    return <div>No case found!</div>;
  }

  return (
    <div>
       <div className="flex justify-center">
      <h1 className="mb-2 mt-4 text-lg font-bold">Case #{caseData.id}</h1>
      </div>
      <div className="flex justify-between">
      <p className="mb-2">{caseData.medicalRecord}</p>
      <p className="mb-2">{new Date(caseData.timestamp).toLocaleString()}</p>
      </div>
      <div>
        {caseData.prediction.evidence.map((evidenceItem, index) => (
          <EvidenceItem key={index} evidence={evidenceItem} />
        ))}
      </div>
    </div>
  );
}

function EvidenceItem({ evidence }) {
  return (
    <Card className="mb-2">
      <CardBody>
        <h3 className="mb-2">{evidence.criteria}</h3>
        <p>
          <strong>Score:</strong> {evidence.score}
        </p>
        <p>
          <strong>Evidence:</strong> {evidence.evidence}
        </p>
        <p>
          <strong>Reasoning:</strong> {evidence.reasoning}
        </p>
        <p>
          <strong>Page:</strong> {evidence.page}
        </p>
      </CardBody>
    </Card>
  );
}
