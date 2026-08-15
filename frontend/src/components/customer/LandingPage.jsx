import React from "react";
import HeroVideo from './hero/HeroVideo';
import Showcase from "./landingPage/Showcase";
import ContactUs from "./landingPage/ContactUs";
import Randomp from "./landingPage/Randomp";

const LandingPage = () => {
    return(
        <div>
        <HeroVideo />

        <Randomp />
        <Showcase />

        <ContactUs />
        </div>
    );
}

export default LandingPage;