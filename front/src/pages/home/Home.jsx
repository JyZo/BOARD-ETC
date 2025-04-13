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
        <div className="pt-14">
          <div>
            <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/mangi_banner.jpg" />
          </div>
          <div className="flex">
            <div className="flex w-28 items-center pt-2">
              <a
                href="https://www.youtube.com/channel/UCv7S6FG3Ne2drrlUHUgqo0w"
                target="_blank"
                className="flex size-5 items-center"
              >
                <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/youtubeLink.svg" />
                <div className="pl-1">YOUTUBE</div>
              </a>
            </div>
            <div className="flex w-20 items-center pt-2">
              <a
                href="https://ch.sooplive.co.kr/chlwlals88"
                target="_blank"
                className="flex size-5 items-center"
              >
                <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/soopLink.svg" />
                <div className="pl-1">SOOP</div>
              </a>
            </div>
            <div className="flex w-20 items-center pt-2">
              <a
                href="https://namu.wiki/w/%EB%A7%8C%EA%B8%B0%ED%87%B4%EC%86%8C"
                target="_blank"
                className="flex size-5 items-center"
              >
                <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/namulink.svg" />
                <div className="pl-1 whitespace-nowrap">나무위키</div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="pt-10">
          <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/huhuman_banner.jpg" />
        </div>
        <div className="flex">
          <div className="flex w-28 items-center pt-2">
            <a
              href="https://www.youtube.com/results?search_query=%ED%97%88%ED%97%88%EB%A7%A8"
              target="_blank"
              className="flex size-5 items-center"
            >
              <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/youtubeLink.svg" />
              <div className="pl-1">YOUTUBE</div>
            </a>
          </div>
          <div className="flex w-20 items-center pt-2">
            <a
              href="https://chzzk.naver.com/2d160d10cfddb69671a511eb0267bb9c"
              target="_blank"
              className="flex size-5 items-center"
            >
              <img src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/chzzkLink.svg" />
              <div className="pl-1">CHZZK</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
