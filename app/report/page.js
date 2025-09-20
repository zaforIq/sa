"use client";

import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";

export default function ReportPage() {
    const [activeNav, setActiveNav] = useState("Overview");
      const [search, setSearch] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    fetch("/combined_report.json")
      .then((res) => res.json())
      .then((data) => {
        setDataArray(data.items || []);
      })
      .catch((err) => {
        console.error("Error fetching combined_report.json:", err);
      });
  }, []);

  const generatePdf = async () => {
    if (!contentRef.current) return;
    setLoading(true);
    setError("");

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");
      setPdfUrl(URL.createObjectURL(pdfBlob));
    } catch (err) {
      setError(err.message || "PDF তৈরি করা যায়নি");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    saveAs(pdfUrl, "bangla_report.pdf");
  };

  return (
    <div className="font-sans bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-row">
      <SideNav active={activeNav} onSelect={setActiveNav} />
      <div
        className={`flex-1 min-h-screen flex flex-col ${
          activeNav === "Overview" ? "ml-14 md:ml-14" : "ml-0"
        }`}
      >
        <TopNav onSearch={setSearch} />

        {/* PDF Content */}
        <div className="w-full mx-auto px-2 sm:px-4 py-8 flex flex-col items-center">
          <div
            ref={contentRef}
            className="bg-white text-black p-6 rounded shadow mb-4"
            style={{
              width: "800px",
              overflowX: "auto",
            }}
          >
            {/* Top Centered Header */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <p style={{ fontSize: "16px", margin: "2px 0" }}>
                বিভিন্ন মাধ্যমে (প্রিন্ট, ইলেকট্রনিক ও সোশ্যাল মিডিয়া) প্রকাশিত
                গুরুত্বপূর্ণ খবর সমুহ
              </p>
              <p style={{ fontSize: "16px", margin: "2px 0" }}>
                তারিখ: ২১/০৮/২০২৫বি.
              </p>
              <p style={{ fontSize: "16px", margin: "2px 0" }}>
                প্রিন্ট মিডিয়া
              </p>
            </div>

            {/* Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "16px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#d1d5db" }}>
                  <th style={{ border: "1px solid #000", padding: "6px" }}>
                    ক্রম
                  </th>
                  <th style={{ border: "1px solid #000", padding: "6px" }}>
                    সংবাদ মাধ্যম
                  </th>
                  <th style={{ border: "1px solid #000", padding: "6px" }}>
                    শিরোনাম ও লিঙ্ক
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataArray.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000", padding: "6px" }}>
                      {index + 1}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "6px" }}>
                      {item.Newspaper_name}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "6px" }}>
                      <div>• {item.title}</div>
                      <div>
                        •{" "}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            fontSize: "14px",
                          }}
                        >
                          {item.url}
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mb-4"
            onClick={generatePdf}
            disabled={loading}
          >
            {loading ? "লোড হচ্ছে..." : "PDF তৈরি করুন"}
          </button>

          {error && <div className="text-red-400 mb-4">{error}</div>}

          {pdfUrl && (
            <>
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                width="800px"
                height="800px"
                className="border rounded mb-4"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={handleDownload}
              >
                ডাউনলোড PDF
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
