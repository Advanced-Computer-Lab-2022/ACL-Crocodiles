import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Typography } from "@mui/material";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    paddingTop: 10,
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 65,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

const pdf = ({ Title, notes }) => {
  let str = "";
  for (let i = 0; i < notes.length; i++) {
    str += notes[i] + "\n";
  }

  return (
    <Document>
      <Page size={"A4"}>
        <Text style={styles.title}>{Title}</Text>
        {notes.map((note) => (
          <Text style={styles.text}>{note}</Text>
        ))}
      </Page>
    </Document>
  );
};

export default pdf;
