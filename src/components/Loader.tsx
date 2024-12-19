import React, { useEffect, useState } from "react";

const messages = [
  "Getting your prediction...",
  "Preparing results...",
  "Analyzing weather data...",
  "Just a moment...",
];

const LoaderWithMessages: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000); // Change message every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div className="loader"></div>
      <p
        style={{
          marginTop: "20px",
          fontSize: "1.2rem",
          fontWeight: "500",
          color: "#333",
        }}
      >
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};

export default LoaderWithMessages;
