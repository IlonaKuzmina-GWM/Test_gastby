import React from "react";
import MainLayout from "../layouts/MainLayout";
import { HeadFC } from "gatsby";
import SiteVisiteSection from "../components/SiteVisiteSection";
import SimpleHero from "../components/SimpleHeroSection";

const Contact = () => {
    return (
        <MainLayout>
            <SimpleHero heroTitleFirstLine={"Sazinies"} heroTitleSecondLine={"ar mums"} />
            <SiteVisiteSection />
        </MainLayout>
    );
};

export default Contact;

export const Head: HeadFC = () => <title>Pirkt Auto</title>;