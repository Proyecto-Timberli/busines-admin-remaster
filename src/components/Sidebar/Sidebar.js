"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from '@mdi/react';
import { mdiTruckOutline } from '@mdi/js';
import { mdiCashRegister } from '@mdi/js';
import { mdiStore } from '@mdi/js';
import { mdiFaceAgent } from '@mdi/js';
import { mdiAccountGroupOutline } from '@mdi/js';
import { mdiTextBoxMultiple } from '@mdi/js';
import { mdiTextBoxMultipleOutline } from '@mdi/js';
import { mdiFormatListCheckbox } from '@mdi/js';
import { mdiFinance } from '@mdi/js';
import { mdiCogOutline } from '@mdi/js';
import { mdiHelpCircleOutline } from '@mdi/js';

// import NotificationDropdown from "./NotificationDropdown.js";
// import UserDropdown from "../Navbars/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const pathname = usePathname();
  return (
    <>
      <nav className="z-50 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 py-4 px-6 mt-16 dark:bg-stone-950">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="bg-black cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              {/* <UserDropdown /> */}
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      Business Admin
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer bg-black text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Registrar
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="flex flex-row  items-center">
                <Link className="flex flex-row  items-center"   href="/inside/sell">
                    <Icon path={mdiCashRegister} size={1} color={'rgb(148 163 184)'} className="mr-1"/>
                    <p 
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/sell") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Vender
                    </p>
                </Link>
              </li>

              <li className="flex flex-row  items-center">
                <Link className="flex flex-row  items-center"   href="/inside/buy">
                    <Icon path={mdiTruckOutline} size={1} color={'rgb(148 163 184)'}className="mr-1"/>
                    <p 
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/buy") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Comprar
                    </p>
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Manage
            </h6>
            {/* Navigation */}
            <ul>
            <li className="flex flex-row  items-center">
                <Link className="flex flex-row  items-center"   href="/inside/products">
                    <Icon path={mdiStore} size={1} color={'rgb(148 163 184)'} className="mr-1" />
                    <p 
                    className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/products") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                    }
                    >
                        Productos
                    </p>
                </Link>
              </li>

              {/* <li className="flex flex-row  items-center">
                <Link className="flex flex-row  items-center"   href="/inside/services">
                <Icon path={mdiFaceAgent} size={1} color={'rgb(148 163 184)'} className="mr-1" />
                <p
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (pathname.indexOf("/inside/services") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                    }
                  >
                    Services</p>
                </Link>
              </li> */}
              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/customers">
                    <Icon path={mdiAccountGroupOutline} color={'rgb(148 163 184)'} size={1} className="mr-1" />
                    <p
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/customers") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Clientes
                    </p>
                </Link>
              </li>

              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/providers">
                    <Icon path={mdiAccountGroupOutline} color={'rgb(148 163 184)'} size={1} className="mr-1" />
                    <p 
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/providers") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Provedores
                    </p>
                </Link>
              </li>
              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/sales">
                    <Icon path={mdiTextBoxMultiple} color={'rgb(148 163 184)'} size={1} className="mr-1" />
                    <p 
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/sales") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Ventas
                    </p>
                </Link>
              </li>

              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/buys">
                    <Icon path={mdiTextBoxMultipleOutline} color={'rgb(148 163 184)'} size={1} className="mr-1" />               
                    <p 
                        className={
                        "text-xs uppercase py-3 font-bold block " +
                        (pathname.indexOf("/inside/buys") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Compras
                    </p>
                </Link>
              </li>
              {/* <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/expense">
                    <Icon path={mdiFormatListCheckbox} color={'rgb(148 163 184)'} size={1} className="mr-1" />
                    <p
                        className={
                            "text-xs uppercase py-3 font-bold block " +
                            (pathname.indexOf("/inside/expense") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Expense 
                    </p>
                </Link>
              </li> */}
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Negocio
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/statistics">
                    <Icon path={mdiFinance} size={1} color={'rgb(148 163 184)'} className="mr-1" />
                    <p 
                        className={
                            "text-xs uppercase py-3 font-bold block " +
                            (pathname.indexOf("/inside/statistics") !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }
                    >
                        Estadisticas
                    </p>
                </Link>
              </li>

              <li className="items-center">
                <Link className="flex flex-row  items-center"   href="/inside/settings">             
                    <Icon path={mdiCogOutline} size={1} color={'rgb(148 163 184)'} className="mr-1" />
                    <p 
                         className={
                          "text-xs uppercase py-3 font-bold block " +
                          (pathname.indexOf("/inside/settings") !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500 dark:text-slate-400")
                        }>
                        Configuracion
                    </p>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Business Admin
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">

              <li className="items-center">
                {/* <a
                  target="_blank"
                  className="flex flex-row  items-center"
                > */}
                    <Icon path={mdiHelpCircleOutline} color={'rgb(148 163 184)'} size={1} className="mr-1"/>
                    <p 
                        className="text-blueGray-700 hover:text-blueGray-500 text-xs  py-3 font-bold block dark:text-slate-400"
                    >
                        Ayuda
                    </p>
                {/* </a> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
