import React from "react";
import Carousel from "./Carousel";
import Hero from "./Hero";
import Footer from "./Footer";
import { motion } from "framer-motion";
import Recommended from "./Recommended";

function Home({ theme }) {
  const PageAnimation = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,

      transition: {
        type: "spring",
      },
    },
  };

  return (
    <>
      <motion.div
        variants={PageAnimation}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Hero />
        <Carousel theme={theme} />
        <Recommended />
        <Footer theme={theme} />
      </motion.div>
    </>
  );
}

export default Home;
