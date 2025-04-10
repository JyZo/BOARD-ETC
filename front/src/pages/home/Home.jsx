import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const mangiUrl = "";
  const huhumanUrl = "";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section>
        <div></div>
      </section>
      <section>
        <div className="pt-10">
          <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/mangi_banner.jpg" />
          <div></div>
        </div>
      </section>
      <section>
        <div className="pt-10">
          <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/huhuman_banner.jpg" />
        </div>
      </section>
    </>
  );
};

export default Home;
