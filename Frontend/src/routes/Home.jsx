import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="max-w-[1920px] mx-auto font-[sans-serif] text-[#333] text-sm">
        <div className="bg-white">
          <div className="min-h-[500px] bg-blue-100 px-4 sm:px-10">
            <div className="max-w-7xl w-full mx-auto py-16">
              <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                <div>
                  <h1 className="md:text-5xl text-4xl font-extrabold mb-6 md:!leading-[55px]">
                    Welcome to MMAChatGPT - Your Ultimate MMA Prediction
                    Companion!
                  </h1>
                  <p className="text-base leading-relaxed">
                    Empower your fight predictions with our cutting-edge MMA
                    prediction app. From real-time odds analysis to personalized
                    insights from our AI-powered ChatGPT, we got everything you
                    need to dominate your picks!
                  </p>
                  <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
                    <Link to={"/ai"}>
                      <button className="bg-[#333] hover:bg-[#111] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4">
                        MMAChatGPT
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] fill-current ml-2"
                          viewBox="0 0 492.004 492.004"
                        >
                          <path
                            d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </Link>
                    <Link to={"/odds"}>
                      <button className="bg-[#333] hover:bg-[#111] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4">
                        Betting Odds Page
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[14px] fill-current ml-2"
                          viewBox="0 0 492.004 492.004"
                        >
                          <path
                            d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                            data-original="#000000"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="max-lg:mt-12 h-full">
                  <img
                    src="/img/robot3-transformed.png"
                    alt="banner img"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-28 px-4 sm:px-10">
            <div className="max-w-7xl w-full mx-auto flex">
              <div className="grid lg:grid-cols-2 items-center gap-10">
                <div className="">
                  <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
                    Empower Your Fight Predictions
                  </h2>
                  <p>
                    Discover the next level of MMA prediction with our
                    cutting-edge app. From real-time odds analysis to
                    personalized insights from our AI-powered ChatGPT, we got
                    everything you need to dominate your picks!
                  </p>
                </div>
                <div className="font-[sans-serif] text-[#333]">
                  <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-12 divide-x divide-gray-300">
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-blue-600 w-10 inline-block"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M437 268.152h-50.118c-6.821 0-13.425.932-19.71 2.646-12.398-24.372-37.71-41.118-66.877-41.118h-88.59c-29.167 0-54.479 16.746-66.877 41.118a74.798 74.798 0 0 0-19.71-2.646H75c-41.355 0-75 33.645-75 75v80.118c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-80.118c0-41.355-33.645-75-75-75zm-300.295 36.53v133.589H45c-8.271 0-15-6.729-15-15v-80.118c0-24.813 20.187-45 45-45h50.118c4.072 0 8.015.553 11.769 1.572a75.372 75.372 0 0 0-.182 4.957zm208.59 133.589h-178.59v-133.59c0-24.813 20.187-45 45-45h88.59c24.813 0 45 20.187 45 45v133.59zm136.705-15c0 8.271-6.729 15-15 15h-91.705v-133.59a75.32 75.32 0 0 0-.182-4.957 44.899 44.899 0 0 1 11.769-1.572H437c24.813 0 45 20.187 45 45v80.119z"
                          data-original="#000000"
                        />
                        <path
                          d="M100.06 126.504c-36.749 0-66.646 29.897-66.646 66.646-.001 36.749 29.897 66.646 66.646 66.646 36.748 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm-.001 103.292c-20.207 0-36.646-16.439-36.646-36.646s16.439-36.646 36.646-36.646 36.646 16.439 36.646 36.646-16.439 36.646-36.646 36.646zM256 43.729c-49.096 0-89.038 39.942-89.038 89.038s39.942 89.038 89.038 89.038 89.038-39.942 89.038-89.038c0-49.095-39.942-89.038-89.038-89.038zm0 148.076c-32.554 0-59.038-26.484-59.038-59.038 0-32.553 26.484-59.038 59.038-59.038s59.038 26.484 59.038 59.038c0 32.554-26.484 59.038-59.038 59.038zm155.94-65.301c-36.748 0-66.646 29.897-66.646 66.646.001 36.749 29.898 66.646 66.646 66.646 36.749 0 66.646-29.897 66.646-66.646s-29.897-66.646-66.646-66.646zm0 103.292c-20.206 0-36.646-16.439-36.646-36.646.001-20.207 16.44-36.646 36.646-36.646 20.207 0 36.646 16.439 36.646 36.646s-16.439 36.646-36.646 36.646z"
                          data-original="#000000"
                        />
                      </svg>
                      <h3 className="text-3xl font-extrabold text-blue-600 mt-5">
                        100K+
                      </h3>
                      <p className="font-semibold mt-3">Total Users</p>
                    </div>
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-blue-600 w-10 inline-block"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fillRule="evenodd"
                          d="M64.217 333.491h41.421c5.508 0 10 4.492 10 10v97.833c0 5.508-4.492 10-10 10H64.217c-5.508 0-10-4.492-10-10v-97.833c0-5.508 4.492-10 10-10zm155.471-61.737h-41.422c-5.508 0-10 4.492-10 10v159.571c0 5.508 4.492 10 10 10h41.422c5.508 0 10-4.492 10-10V281.754c0-5.508-4.493-10-10-10zm114.049-64.466h-41.421c-5.508 0-10 4.492-10 10v224.036c0 5.508 4.492 10 10 10h41.421c5.508 0 10-4.492 10-10V217.288c-.001-5.507-4.493-10-10-10zm72.625-57.992h41.421c5.508 0 10 4.492 10 10v282.028c0 5.508-4.492 10-10 10h-41.421c-5.508 0-10-4.492-10-10V159.296c0-5.508 4.492-10 10-10zm2.707-106.018a7.98 7.98 0 0 1-.812-15.938l49.121-2.666a7.98 7.98 0 0 1 8.307 9.094l.006.001-7.088 48.68a7.986 7.986 0 0 1-15.812-2.25l3.878-26.632C385.642 108.019 321.72 152.702 257.158 189.5c-69.131 39.402-138.98 69.744-206.779 93.355a7.976 7.976 0 0 1-5.25-15.062c66.943-23.313 135.906-53.269 204.154-92.167 63.527-36.208 126.449-80.188 186.56-133.799zM45.262 481.873h421.477c5.508 0 10 4.492 10 10v3.193c0 5.508-4.492 10-10 10H45.262c-5.508 0-10-4.492-10-10v-3.193c0-5.508 4.492-10 10-10zM139.587 6.935c-48.325 0-87.5 39.175-87.5 87.5s39.175 87.5 87.5 87.5 87.5-39.175 87.5-87.5c-.001-48.325-39.176-87.5-87.5-87.5zm-8 32.13v5.279c-5.474 1.183-10.606 3.537-14.768 6.92-6.626 5.387-10.827 13.21-10.353 22.965.476 9.817 5.372 16.4 12.186 20.849 5.887 3.844 13.093 5.827 19.733 6.917 5.206.855 10.757 2.201 14.95 4.733 3.261 1.969 5.71 4.838 6.23 9.127.072.595.111 1.013.117 1.26.08 3.359-1.536 5.926-3.962 7.767-3.135 2.379-7.564 3.785-12.005 4.324a33.57 33.57 0 0 1-3.172.254c-5.25.126-10.424-1.156-14.458-3.842-3.274-2.18-5.775-5.367-6.818-9.552a7.982 7.982 0 0 0-15.5 3.812c2.094 8.399 7.044 14.749 13.505 19.052 4.252 2.831 9.164 4.736 14.315 5.711v5.165a8 8 0 1 0 16-.001v-5.01c6.309-1.038 12.699-3.388 17.758-7.226 6.302-4.782 10.494-11.632 10.275-20.829a29.17 29.17 0 0 0-.179-2.76c-1.22-10.052-6.653-16.591-13.856-20.94-6.27-3.786-13.768-5.668-20.637-6.796-4.832-.793-9.912-2.13-13.607-4.543-2.767-1.806-4.752-4.416-4.937-8.224-.202-4.157 1.615-7.512 4.478-9.84 2.281-1.854 5.196-3.144 8.362-3.781a22.978 22.978 0 0 1 10.115.244c5.278 1.338 10.083 4.817 12.614 10.845a7.997 7.997 0 0 0 10.469 4.281 7.997 7.997 0 0 0 4.281-10.469c-4.701-11.196-13.65-17.664-23.489-20.158a37.3 37.3 0 0 0-1.646-.377v-5.161a8 8 0 1 0-16.001.004z"
                          clipRule="evenodd"
                          data-original="#000000"
                        />
                      </svg>
                      <h3 className="text-3xl font-extrabold text-blue-600 mt-5">
                        450K+
                      </h3>
                      <p className="font-semibold mt-3">Total Sales</p>
                    </div>
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-blue-600 w-10 inline-block"
                        viewBox="0 0 28 28"
                      >
                        <path
                          d="M18.56 16.94h-3.12l.65-2.16a2.58 2.58 0 0 0-1.66-3.21 1.41 1.41 0 0 0-1.81 1l-.1.42a8.61 8.61 0 0 1-2.26 4l-.57.56a1.56 1.56 0 0 0-1.21-.59h-.73a1.56 1.56 0 0 0-1.56 1.54v6.44a1.56 1.56 0 0 0 1.56 1.56h.73a1.55 1.55 0 0 0 1.33-.76l.14.07a6.55 6.55 0 0 0 2.91.69h3.59a3.58 3.58 0 0 0 3-1.6 6.34 6.34 0 0 0 1.07-3.53v-2.49a1.94 1.94 0 0 0-1.96-1.94zm-9.56 8a.56.56 0 0 1-.56.56h-.69a.56.56 0 0 1-.56-.56V18.5a.56.56 0 0 1 .56-.56h.73a.56.56 0 0 1 .52.56zm10.5-3.57a5.38 5.38 0 0 1-.9 3 2.59 2.59 0 0 1-2.15 1.15h-3.59a5.53 5.53 0 0 1-2.46-.58l-.4-.2V18.6l.92-.92a9.63 9.63 0 0 0 2.53-4.46l.1-.41a.43.43 0 0 1 .2-.26.4.4 0 0 1 .32 0 1.58 1.58 0 0 1 1 2l-.84 2.81a.5.5 0 0 0 .08.44.48.48 0 0 0 .4.2h3.79a.94.94 0 0 1 .94.94zM11 7.3l-.32 1.85a1.09 1.09 0 0 0 .44 1.09 1.11 1.11 0 0 0 .65.22 1.18 1.18 0 0 0 .52-.13L14 9.45l1.67.88a1.1 1.1 0 0 0 1.17-.09 1.09 1.09 0 0 0 .44-1.08L17 7.3 18.31 6a1.1 1.1 0 0 0 .29-1.14 1.12 1.12 0 0 0-.9-.76l-1.87-.27L15 2.12a1.12 1.12 0 0 0-2 0l-.83 1.69-1.87.27a1.12 1.12 0 0 0-.9.76A1.1 1.1 0 0 0 9.69 6zm-.6-2.23 2.13-.31a.49.49 0 0 0 .47-.27l1-1.93a.11.11 0 0 1 .2 0l1 1.93a.49.49 0 0 0 .38.27l2.13.31a.12.12 0 0 1 .09.08.11.11 0 0 1 0 .11l-1.54 1.5a.53.53 0 0 0-.15.45l.37 2.11a.09.09 0 0 1-.05.11.1.1 0 0 1-.12 0l-1.9-1a.47.47 0 0 0-.46 0l-1.91 1a.09.09 0 0 1-.11 0 .09.09 0 0 1-.05-.11l.37-2.11a.53.53 0 0 0-.15-.45l-1.54-1.5a.11.11 0 0 1 0-.11.12.12 0 0 1-.12-.08zm-3.06 8.18a1 1 0 0 0 1-1.19l-.27-1.52 1.12-1.09a1 1 0 0 0-.56-1.73L7.1 7.5l-.69-1.39a1.05 1.05 0 0 0-1.82 0L3.9 7.5l-1.53.22a1 1 0 0 0-.56 1.73l1.11 1.09-.27 1.52a1 1 0 0 0 .41 1 1 1 0 0 0 1.07.07l1.37-.72 1.37.72a1 1 0 0 0 .47.12zm-1.84-1.9a.46.46 0 0 0-.23.06l-1.63.82.36-1.78a.53.53 0 0 0-.2-.45L2.51 8.71l1.8-.26a.47.47 0 0 0 .37-.27l.83-1.63.81 1.63a.47.47 0 0 0 .37.27l1.8.29L7.2 10a.53.53 0 0 0-.15.45l.29 1.8-1.61-.84a.46.46 0 0 0-.23-.06zm20.95-2.94a1 1 0 0 0-.82-.69L24.1 7.5l-.69-1.39a1.05 1.05 0 0 0-1.82 0L20.9 7.5l-1.53.22a1 1 0 0 0-.56 1.73l1.11 1.09-.27 1.52a1 1 0 0 0 .41 1 1 1 0 0 0 1.07.07l1.37-.72 1.37.72a1 1 0 0 0 .47.12 1 1 0 0 0 1-1.19l-.27-1.52 1.11-1.09a1 1 0 0 0 .27-1.04zM24.2 10a.53.53 0 0 0-.15.45l.29 1.8-1.61-.84a.47.47 0 0 0-.46 0l-1.63.82.36-1.78a.53.53 0 0 0-.2-.45l-1.29-1.29 1.8-.26a.47.47 0 0 0 .37-.27l.83-1.63.81 1.63a.47.47 0 0 0 .37.27l1.8.29z"
                          data-name="Layer 2"
                          data-original="#000000"
                        />
                      </svg>
                      <h3 className="text-3xl font-extrabold text-blue-600 mt-5">
                        500+
                      </h3>
                      <p className="font-semibold mt-3">
                        Customer Satisfaction
                      </p>
                    </div>
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-blue-600 w-10 inline-block"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M477.797 290.203c0 59.244-23.071 114.942-64.963 156.834S315.244 512 256 512s-114.942-23.071-156.834-64.963-64.963-97.59-64.963-156.834c0-39.621 10.579-78.512 30.595-112.468 19.419-32.944 47.178-60.48 80.276-79.63 7.646-4.427 17.437-1.814 21.861 5.836 4.426 7.648 1.813 17.437-5.836 21.861-53.882 31.175-88.951 87.036-94.189 148.4H84.6c8.837 0 16 7.163 16 16s-7.163 16-16 16H66.884C74.594 398.12 148.083 471.609 240 479.319v-17.717c0-8.837 7.163-16 16-16s16 7.163 16 16v17.717c91.917-7.71 165.406-81.199 173.116-173.116h-17.717c-8.837 0-16-7.163-16-16s7.163-16 16-16h17.69c-5.238-61.364-40.307-117.227-94.19-148.4-7.648-4.425-10.262-14.212-5.836-21.861 4.425-7.648 14.214-10.261 21.861-5.836 33.098 19.148 60.857 46.685 80.277 79.63 20.016 33.955 30.596 72.846 30.596 112.467zm-253.173-220.2 15.259-15.259-.258 71.899c-.031 8.837 7.106 16.025 15.942 16.058h.059c8.81 0 15.967-7.126 15.999-15.942l.259-72.248 15.492 15.492c3.124 3.124 7.219 4.687 11.313 4.687s8.189-1.563 11.313-4.687c6.248-6.248 6.248-16.379 0-22.627L267.313 4.687c-6.248-6.248-16.379-6.248-22.627 0l-42.689 42.689c-6.248 6.248-6.248 16.379 0 22.627s16.379 6.248 22.627 0zM272 174.358v64.628c16.74 5.24 29.977 18.478 35.218 35.217h50.493c8.837 0 16 7.163 16 16s-7.163 16-16 16h-50.493c-6.823 21.795-27.202 37.655-51.218 37.655-29.585 0-53.654-24.069-53.654-53.655 0-24.015 15.86-44.394 37.654-51.217v-64.628c0-8.837 7.163-16 16-16s16 7.163 16 16zm5.655 115.845c0-11.94-9.715-21.654-21.655-21.654s-21.654 9.714-21.654 21.654 9.714 21.655 21.654 21.655 21.655-9.714 21.655-21.655z"
                          data-original="#000000"
                        />
                      </svg>
                      <h3 className="text-3xl font-extrabold text-blue-600 mt-5">
                        600+
                      </h3>
                      <p className="font-semibold mt-3">
                        System Uptime (in hours)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-10 mt-28">
            <div className="max-w-7xl w-full mx-auto">
              <div className="flex items-start gap-10">
                <div className="flex md:flex-col md:align-center md:text-center sm:flex-col sm:align-center justify-center gap-5">
                  <div className="flex flex-col">
                    <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
                      Real-Time Odds Analysis
                    </h2>
                    <p>
                      Stay ahead of the game with our comprehensive odds page.
                      Access up-to-the-minute odds from top bookmakers, track
                      line movements, and analyze historical data to make
                      informed predictions.
                    </p>
                  </div>
                  <div className="flex flex-col md:text-center">
                    <div className="">
                      <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
                        Interactive ChatGPT
                      </h2>
                    </div>
                    <div className="mt-4">
                      <p>
                        Unlock the secrets of MMA fighters with our interactive
                        ChatGPT feature. Ask any fighter-related question, from
                        fight stats to training regimes, and receive
                        personalized insights and analysis in real-time.it. Elit
                        occaecat officia et laboris Lorem minim.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-10 mt-28">
            <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
              <div>
                <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
                  About MMAChatGPT
                </h2>
                <p>
                  At MMAChatGPT, were passionate about revolutionizing the way
                  you predict MMA fights. Our team of MMA enthusiasts and tech
                  experts have come together to create an app that combines
                  cutting-edge technology with unparalleled insights into the
                  world of MMA.
                </p>
                <p>
                  Our mission is simple: to provide MMA fans with the tools they
                  need to make accurate predictions, enhance their fight
                  experience, and connect with fellow enthusiasts in our vibrant
                  community.
                </p>
              </div>
              <div className="w-full h-full">
                <img
                  src="/img/facetime-meeting.png"
                  alt="feature"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white rounded-lg shadow-xl m-4 border border-solid border-2 border-grey-500 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                MMAChatGPT™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
