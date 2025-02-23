import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Logo from "../assets/images/Logo.png";
import moment from "moment";

// Create Document Component
const InvoicePDF = ({ billData }) => {
  const blankRows = Array(12 - billData?.food_items?.length).fill(0);

  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      padding: 15,
      color: "#6e6b7b",
    },
    mainHeader: {
      padding: 5,
      borderBottom: 2,
      borderColor: "#EE4E4E",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    mobileNo: {
      position: "absolute",
      right: 10,
      top: 20,
    },
    marginMobile: {
      marginTop: 4,
    },
    headingText: {
      fontSize: 28,
      color: "#EE4E4E",
      //   fontFamily: "capital",
      fontWeight: 600,
      textAlign: "center",
    },
    headingSubText: {
      fontSize: 12,
      marginTop: 1,
      color: "#FFF",
      backgroundColor: "#EE4E4E",
      fontWeight: 400,
      textAlign: "center",
    },
    headingBankDetail: {
      fontSize: 12,
      marginTop: 1,
      color: "#EE4E4E",
      fontWeight: 600,
      textAlign: "center",
    },
    headingSubTextAdd: {
      fontSize: 12,
      marginTop: 3,
      paddingHorizontal: 20,
      paddingVertical: 2,
      color: "#EE4E4E",
      fontWeight: 400,
      textAlign: "center",
    },
    mainContainer: {
      border: 1,
      height: "100%",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottom: 1,
    },
    invoiceNoContainer: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "space-between",
    },
    invoiceMSContainerFirst: {
      flexDirection: "row",
      marginTop: 0,
      justifyContent: "flex-start",
    },
    invoiceMSContainer: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "flex-start",
    },
    logoWraper: {
      flexDirection: "row",
      marginTop: 15,
    },
    logo: {
      maxWidth: "120px",
      objectFit: "contain",
    },
    textPrimary: {
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 0,
      color: "#6fc055",
      fontSize: 25,
      // fontWeight: 600
    },
    clear: {
      clear: "both",
    },
    address: {
      marginTop: 40,
      marginBottom: 20,
    },
    paymentDetailContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    margin5: {
      marginTop: 15,
    },
    table: {
      width: "100%",
      borderTop: "1px solid #dcdcdc",
      borderLeft: "1px solid #dcdcdc",
      borderRight: "1px solid #dcdcdc",
      marginBottom: 0,
      marginTop: 10,
      height: "40%",
    },
    tableHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      height: 20,
      backgroundColor: "#EE4E4E",
      alignItems: "center",
      padding: "12px 10px 12px 5px",
      borderBottom: "1px solid #dcdcdc",
      fontSize: 10,
      fontWeight: 600,
      color: "#FFF",
    },
    tableBody: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 5,
      height: "auto",
      borderBottom: 0.2,
    },
    tableHeaderFirstCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "20%",
      //fontWeight: 600
    },
    tableHeaderOtherCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "10%",
      //fontWeight: 600
    },
    tableFirstCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "20%",
      borderRightColor: "#dcdcdc",
      borderRightWidth: 1,
      color: "#000",
      fontWeight: 600,
    },
    tableOtherCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "10%",
      borderRightColor: "#dcdcdc",
      borderRightWidth: 1,
      color: "#000",
      fontWeight: 600,
    },
    minwidth20: {
      minWidth: 60,
    },
    hrtag: {
      border: 0.2,
      marginTop: 10,
    },
    note: {
      marginTop: 5,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      position: "relative",
      bottom: 0,
    },
    note1: {
      marginTop: 0,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      position: "relative",
      bottom: 0,
    },
    paymentDetailcontainer: {
      marginBottom: 10,
    },
    margin1: {
      marginTop: 5,
    },
    extraBoldFont: {
      fontWeight: 600,
      color: "#000",
      //   fontFamily: "normal",
    },
    boldFont: {
      fontWeight: 600,
      color: "#000",
    },
    docImg: {
      width: "100%",
      height: "800px",
    },
    docImg2: {
      width: "100%",
      height: "800px",
    },
    centerDiv: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    addressFiled: {
      color: "#000",
      maxWidth: 350,
    },
    littleAddress: {
      color: "#000",
      maxWidth: 200,
    },
    bellowFirstCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "58%",
      borderRightColor: "#dcdcdc",
      borderRightWidth: 1,
    },
    bellowOtherCell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
      borderRightColor: "#dcdcdc",
      borderRightWidth: 1,
    },
    subTotalFirstFiled: {
      width: "73%",
      borderRightColor: "#dcdcdc",
      borderRightWidth: 1,
      fontSize: 16
    },
    subTotalSecondFiled: {
      width: "20%",
      fontSize: 16
    },
    subtotalBody: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'flex-end',
      fontWeight: 600,
      color: "#000"
    },
    borderTop: {
      flexDirection: "row",
      borderTop: 1,
      padding: 5,
    },
    minwidth10: {
      minWidth: 10,
    },
    noteContent: {
      maxWidth: "90%",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainContainer}>
          <View style={styles.mainHeader}>
            <Image src={Logo} style={{ width: 150 }} />
            <Text style={styles.headingSubTextAdd}>( M ) : 9638093708, 98253 43134</Text>
            <Text style={styles.headingSubTextAdd}>A-301 silver homer, near shree ram chow, nava naroda, Ahmedabad</Text>
          </View>
          <View style={styles.headerContainer}>
            <View>
              <View style={styles.invoiceMSContainer}>
                <Text style={styles.minwidth20}>Customer Name : </Text>
                <Text style={styles.boldFont}>{billData.client_name}</Text>
              </View>
              <View style={styles.invoiceMSContainer}>
                <Text style={styles.minwidth20}>Manager Name : </Text>
                <Text style={styles.addressFiled}>{billData.biller_name}</Text>
              </View>
              <View style={styles.invoiceMSContainer}>
                <Text style={styles.minwidth20}>Payment Method : </Text>
                <Text style={styles.addressFiled}>{billData.payment_type}</Text>
              </View>
            </View>
            <View>
              <View style={styles.invoiceMSContainer}>
                <Text style={styles.minwidth20}>Table No : </Text>
                <Text style={styles.extraBoldFont}>{billData.table_no}</Text>
              </View>
              <View style={styles.invoiceMSContainer}>
                <Text style={styles.minwidth20}>Billing Date : </Text>
                <Text style={styles.extraBoldFont}>
                  {moment(billData.createdAt).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderFirstCell}>Item Name</Text>
              <Text style={styles.tableHeaderOtherCell}>Qty</Text>
              <Text style={styles.tableHeaderFirstCell}>Amount</Text>
            </View>
            {billData &&
              billData?.food_items?.length &&
              billData?.food_items?.map((el) => {
                return (
                  <View style={styles.tableBody}>
                    <Text style={styles.tableFirstCell}>{el.name}</Text>
                    <Text style={styles.tableOtherCell}>{el.qty}</Text>
                    <Text style={styles.tableFirstCell}>{el.price || ""}</Text>
                  </View>
                );
              })}

            {blankRows &&
              blankRows.length &&
              blankRows.map((el) => {
                return (
                  <View style={styles.tableBody}>
                    <Text style={styles.tableFirstCell}> </Text>
                    <Text style={styles.tableOtherCell}> </Text>
                    <Text style={styles.tableFirstCell}></Text>
                  </View>
                );
              })}
          </View>
          <View style={styles.tableBody}>
            <View style={styles.bellowOtherCell}>
              <View>
                <View style={styles.subtotalBody}>
                  <Text style={styles.subTotalFirstFiled}>Sub Total : </Text>
                  <Text style={styles.subTotalSecondFiled}>{billData?.bill_amount} </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
