import React, { FC } from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
} from "@React-pdf/renderer";

type PdfDownloadSingleCarPageProps = {
    carTitle: string;
    carImage?: string;
}

Font.register({
    family: "OpenSans",
    src: "https://your-website.com/fonts/OpenSans-Regular.ttf", // Replace with the actual font URL
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#FFF",
        padding: 30,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "OpenSans", // Use the registered font
    },
    image: {
        width: 200,
        height: 150,
        margin: "auto",
    },
});

const PdfDownloadSingleCarPage: FC<PdfDownloadSingleCarPageProps> = ({ carTitle, carImage }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>{carTitle}</Text>

            {carImage && (
                <Image src={carImage} style={styles.image} />
            )}

            {/* Additional content can be added here */}
        </Page>
    </Document>
);

export default PdfDownloadSingleCarPage;