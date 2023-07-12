/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";
import Image from "next/image";
  
export default function Landing() {
  return (
    <>
      <section className="header relative pt-16 items-center flex flex-wrap h-screen max-h-920-px justify-center px-7 lg:px-20 dark:bg-neutral-950">
        <div className="h-auto lg:w-1/2 md:w-full  sm:w-full items-center flex flex-wrap  justify-center">
          <div className="w-full   px-4">
            <div className="pt-32 ">
              <h2 className="font-semibold text-4xl text-blueGray-600 dark:text-white">
              We are the best way to manage your business.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500 dark:text-slate-200 ">
                {" "}
                You can use our services from the web or you can download the App on your phone.
              </p>
              <div className="mt-12 flex flex-wrap">
                <Link href="/auth/register"
                  
                  className="ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-fuchsia-500 active:bg-fuchsia-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 dark:bg-fuchsia-950"
                >
                  Get started
                </Link>
                <a
                  href=""
                  className="ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                >
                  Download for Android
                </a>
              </div>
            </div>
          </div>
        </div>
           <Image
              src="/invest.svg"
              alt="..."
              className=" min-[320px]:invisible px-4 pt-16 pl-16 lg:w-1/2  max-h-860-px  lg:visible "
              width={500}
              height={500}
              priority
            />       
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100 dark:bg-fuchsia-950">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        > 
        </div>
        <div className="container mx-auto ">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <Image
                  src="/business.svg"
                  alt="..."
                  className="w-full align-middle rounded-t-lg bg-white dark:bg-stone-700"
                  width={200}
                  height={200}
                  priority
                /> 
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Improve the management of your business!
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  Control the stocks of your products,
                  Record your sales, customer receipts, purchases from suppliers
                  Track your company's balance sheets to improve performance.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                    <Image
                      src="/mobilleapp.svg"
                      alt="..."
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-30 h-30 mb-5 shadow-lg rounded-full bg-white dark:bg-stone-700"
                      width={100}
                      height={100}
                      priority
                    /> 
                      <h6 className="text-xl mb-1 font-semibold text-blueGray-600 dark:text-white">
                        Scan barcodes or qr
                      </h6>
                      <p className="mb-4 text-blueGray-500 dark:text-slate-200">
                        Download the app on your cell phone and take advantage of all its features.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                    <Image
                      src="/profiles.svg"
                      alt="..."
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-30 h-30 mb-5 shadow-lg rounded-full bg-white dark:bg-stone-700"
                      width={100}
                      height={100}
                      priority
                    /> 
                      <h6 className="text-xl mb-1 font-semibold text-blueGray-600 dark:text-white">                        
                        User profiles
                      </h6>
                      <p className="mb-4 text-blueGray-500 dark:text-slate-200">                     
                      You can manage user profiles to give access to your employees or others and manage their user powers in the app.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                    <Image
                      src="/construccion.svg"
                      alt="..."
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-30 h-30 mb-5 shadow-lg rounded-full bg-white dark:bg-stone-700"
                      width={125}
                      height={125}
                      priority
                    /> 
                      <h6 className="text-xl mb-1 font-semibold text-blueGray-600 dark:text-white">Integration with Afip</h6>
                      <p className="mb-4 text-blueGray-500 dark:text-slate-200">
                      The functionality of registering sales in afip will be available soon.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                    <Image
                      src="/construccion.svg"
                      alt="..."
                      className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-30 h-30 mb-5 shadow-lg rounded-full bg-white dark:bg-stone-700"
                      width={125}
                      height={125}
                      priority
                    /> 
                      <h6 className="text-xl mb-1 font-semibold text-blueGray-600 dark:text-white">                      
                        Activity log
                      </h6>
                      <p className="mb-4 text-blueGray-500 dark:text-slate-200">                      
                        Use the activity log to view user actions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20 bg-white rounded-lg dark:bg-stone-950">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48 flex flex-col ">
            <Image
                  src="/cart.svg"
                  alt="..."
                  className="inline-flex items-center justify-center w-100 h-100 mb-6 shadow-lg bg-white dark:bg-stone-700"
                  width={200}
                  height={200}
                  priority
                /> 
              <h3 className="font-semibold text-4xl text-blueGray-600 dark:text-white">
                E-Commerce 
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500 dark:text-slate-200">
                Comming soon.
              </p>
              
              {/* <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=nnjs-index"
                target="_blank"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View All{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a> */}
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32 ">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0 ">
              <Image
                  src="/cerificated.svg"
                  alt="..."
                  className="w-full align-middle rounded absolute shadow-lg max-w-100-px left-145-px -top-29-px z-3 bg-rose-500"
                  width={100}
                  height={100}
                  priority
                /> 
                <Image
                  src="/addtocart.svg"
                  alt="..."
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-210-px left-260-px -top-160-px bg-yellow-300"
                  width={100}
                  height={100}
                  priority
                /> 
                <Image
                  src="/mobilleapp.svg"
                  alt="..."
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-40-px -top-225-px z-2 bg-fuchsia-500 "
                  width={100}
                  height={100}
                  priority
                /> 
                <Image
                  src="/shopapp.svg"
                  alt="..."
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px bg-purple-500"
                  width={100}
                  height={100}
                  priority
                />
               
               <Image
                  src="payonline.svg"
                  alt="..."
                  className="w-full align-middle rounded absolute shadow-xl max-w-150-px left-195-px top-95-px bg-violet-400"
                  width={150}
                  height={150}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        

        
      </section>

    
      <section className="pb-16 bg-blueGray-200 relative pt-32 dark:bg-stone-950">
        

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-blueGray-700 shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl text-white">   
                Trial month!
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed mt-4 mb-4 dark:text-slate-200">
                Improve your business
              </p>
              <div className="sm:block flex flex-col mt-10">
                <Link href="/auth/register"
                 
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 dark:bg-stone-950 "
                >
                  Contact us
                </Link>
                <Link href="/auth/register"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-fuchsia-500 active:bg-fuchsia-700 uppercase text-sm shadow hover:shadow-lg dark:bg-fuchsia-950"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Get started</span>
                </Link>     
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
