"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Result from "@/components/result";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default function Home() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const storedCases = localStorage.getItem("cases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  return (
    <div>
      {cases.length > 0 ? (
        <CaseTable cases={cases} />
      ) : (
        <div className="w-full text-center">
          No cases yet, click{" "}
          <Link as={NextLink} href="/">
            here
          </Link>{" "}
          to make one
        </div>
      )}
    </div>
  );
}

function CaseTable({ cases }) {
  const [openCase, setOpenCase] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Table className={`table-auto`}>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>File Name</TableColumn>
          <TableColumn>Time Stamp</TableColumn>
          <TableColumn>View</TableColumn>
        </TableHeader>
        <TableBody>
          {cases.map((caseData, index) => (
            <TableRow key={index}>
              <TableCell>{caseData.id}</TableCell>
              <TableCell>{caseData.medicalRecord}</TableCell>
              <TableCell>
                {new Date(caseData.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    localStorage.setItem("caseID", String(caseData.id));
                    setOpenCase(caseData.id);
                  }}>
                  see more
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        size={"4xl"}
        isOpen={openCase !== null}
        onClose={() => setOpenCase(null)}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Result />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
