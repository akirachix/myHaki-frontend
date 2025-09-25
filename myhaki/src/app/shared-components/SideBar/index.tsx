

"use client";


import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { removeAuthToken } from "@/app/utils/authToken";


export default function Sidebar() {
   const pathname = usePathname();
   const router = useRouter();
   const [showSignOutModal, setShowSignOutModal] = useState(false);
   function isActive(path: string) {
       return pathname === path;
   }
   function handleSignOut() {
       removeAuthToken();
       router.push("/authentication/sign-in");
   }
   const SIDEBAR_WIDTH_OPEN = 240;
   return (
       <>
           <div
               className="fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 shadow-lg"
               style={{
                   width: SIDEBAR_WIDTH_OPEN,
                   background: "#7c111b",
                   minHeight: "100vh",
               }}
           >
               <div
                   style={{
                       width: "100%",
                       height: 220,
                       background: "#fff",
                       borderBottomLeftRadius: 120,
                       borderBottomRightRadius: 120,
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "flex-end",
                       position: "relative",
                       marginBottom: 50,
                   }}
               >
                   <Image
                       src="/images/logo-one.png"
                       alt="MyHaki Logo"
                       width={214}
                       height={54}
                       style={{
                           marginBottom: 0,
                           transition: "all 0.3s",
                       }}
                   />
               </div>


               <nav className="flex flex-col gap-6 mt-3 flex-1 w-full">
                   <SidebarLink
                       href="/dashboard"
                       isActive={isActive("/dashboard")}
                       label="Dashboard"
                   >
                       <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
                           <path fillRule="evenodd" clipRule="evenodd" d="M7.06119 0.613281C6.05844 0.629636 5.05869 0.727819 4.07191 0.906853C3.08405 1.07185 2.29762 1.71471 1.76619 2.49685C1.20696 3.3543 0.879868 4.34223 0.816909 5.364C0.718337 6.71185 0.634766 8.11757 0.634766 9.56185C0.634766 11.0061 0.72048 12.4119 0.816909 13.7576C0.896194 14.829 1.22834 15.8361 1.76619 16.6247C2.29762 17.409 3.08405 18.0519 4.07191 18.2147C4.99977 18.3669 6.01119 18.5083 7.06119 18.5083C8.1112 18.5083 9.12262 18.3669 10.0526 18.2147C11.0383 18.0519 11.8248 17.409 12.3583 16.6247C12.9177 15.7675 13.2441 14.7793 13.3055 13.7576C13.4041 12.4097 13.4876 11.004 13.4876 9.56185C13.4876 8.11971 13.4041 6.71185 13.3055 5.364C13.2441 4.34224 12.9177 3.35409 12.3583 2.49685C11.8248 1.71257 11.0405 1.06971 10.0505 0.906853C9.0637 0.727819 8.06395 0.629636 7.06119 0.613281ZM22.9291 29.3876C23.9791 29.3876 24.9926 29.2461 25.9248 29.094C26.9126 28.9333 27.7012 28.2904 28.2326 27.5083C28.7705 26.7154 29.1069 25.7126 29.1841 24.639C29.2826 23.2933 29.3683 21.8876 29.3683 20.4454C29.3683 19.0033 29.2826 17.5976 29.1841 16.2519C29.1224 15.2295 28.7944 14.2411 28.2326 13.3847C27.7012 12.6004 26.9126 11.9576 25.9248 11.7969C24.9354 11.6211 23.9337 11.5229 22.9291 11.5033C21.8769 11.5033 20.8633 11.6447 19.9333 11.7969C18.9455 11.9576 18.1548 12.6004 17.6233 13.3826C17.0621 14.24 16.7342 15.229 16.6719 16.2519C16.5605 17.647 16.4997 19.0458 16.4898 20.4454C16.4898 21.8876 16.5755 23.2933 16.6719 24.639C16.7512 25.7104 17.0855 26.7176 17.6233 27.5061C18.1569 28.2904 18.9433 28.9333 19.9333 29.094C20.9227 29.2697 21.9244 29.3679 22.9291 29.3876ZM7.06334 21.5511C6.07119 21.5511 5.10477 21.6004 4.18334 21.654C3.47533 21.6875 2.78237 21.87 2.14977 22.1897C1.60548 22.479 0.994766 22.9869 0.838337 23.769C0.714538 24.328 0.647059 24.898 0.636908 25.4704C0.636908 26.0854 0.737623 26.6683 0.838337 27.1697C0.994766 27.9519 1.60548 28.4597 2.14977 28.7511C2.72834 29.0597 3.44191 29.2397 4.18548 29.2847C5.10691 29.3383 6.07119 29.3876 7.06334 29.3876C8.05548 29.3876 9.02191 29.3383 9.94334 29.2847C10.6848 29.2419 11.3983 29.0597 11.9769 28.749C12.5212 28.4597 13.1341 27.9519 13.2905 27.1697C13.3912 26.6683 13.4898 26.0854 13.4898 25.4704C13.4898 24.8554 13.3912 24.2704 13.2905 23.769C13.1319 22.9869 12.5212 22.479 11.9769 22.1876C11.3451 21.8663 10.6515 21.685 9.94334 21.6561C9.02191 21.6004 8.05762 21.5511 7.06334 21.5511ZM22.9291 8.44757C23.9233 8.44757 24.8919 8.40042 25.8155 8.34685C26.5569 8.304 27.2726 8.11971 27.8512 7.81114C28.3955 7.524 29.0083 7.014 29.1669 6.23185C29.2907 5.67286 29.3582 5.10287 29.3683 4.53042C29.358 3.95869 29.2906 3.38943 29.1669 2.83114C29.0083 2.04685 28.3955 1.539 27.8512 1.24971C27.2178 0.930464 26.5241 0.748637 25.8155 0.716138C24.8545 0.653662 23.892 0.619362 22.9291 0.613281C21.9348 0.613281 20.9662 0.662567 20.0426 0.716138C19.2991 0.758995 18.5855 0.941138 18.0069 1.24971C17.4605 1.539 16.8498 2.04685 16.6912 2.83114C16.5675 3.38943 16.5001 3.95869 16.4898 4.53042C16.4999 5.10287 16.5674 5.67286 16.6912 6.23185C16.8498 7.014 17.4626 7.52399 18.0069 7.81328C18.5855 8.11971 19.2991 8.30185 20.0426 8.34685C20.9641 8.40042 21.9348 8.44757 22.9291 8.44757Z" fill="white" />
                       </svg>
                   </SidebarLink>


                   <SidebarLink
                       href="/cases"
                       isActive={isActive("/cases")}
                       label="Case"
                   >
                       <svg width="36" height="36" viewBox="0 0 30 30" fill="none">
                           <path d="M0.436893 27.4331L14.776 13.1065L12.6848 10.9874L11.6094 12.047C11.4712 12.1853 11.3071 12.2951 11.1264 12.37C10.9457 12.4448 10.752 12.4834 10.5564 12.4834C10.3608 12.4834 10.1671 12.4448 9.98637 12.37C9.80568 12.2951 9.64154 12.1853 9.50336 12.047L8.44287 10.9874C8.3044 10.8493 8.19455 10.6853 8.11959 10.5048C8.04464 10.3243 8.00606 10.1307 8.00606 9.93528C8.00606 9.73982 8.04464 9.54629 8.11959 9.36576C8.19455 9.18522 8.3044 9.02123 8.44287 8.88316L16.8969 0.436431C17.0351 0.298084 17.1993 0.188325 17.3799 0.113436C17.5606 0.0385477 17.7543 0 17.95 0C18.1456 0 18.3393 0.0385477 18.52 0.113436C18.7007 0.188325 18.8648 0.298084 19.003 0.436431L20.0635 1.496C20.646 2.07802 20.646 3.01821 20.0635 3.60022L19.003 4.62995L21.124 6.76402C21.2622 6.62567 21.4263 6.51591 21.607 6.44102C21.7877 6.36614 21.9814 6.32759 22.177 6.32759C22.3726 6.32759 22.5663 6.36614 22.747 6.44102C22.9277 6.51591 23.0918 6.62567 23.23 6.76402C23.8125 7.34604 23.8125 8.30115 23.23 8.88316L25.3361 10.9874L26.3966 9.92781C26.9791 9.3458 27.935 9.3458 28.5176 9.92781L29.5631 10.9874C30.1456 11.5694 30.1456 12.5245 29.5631 13.1065L21.124 21.5383C20.5415 22.1204 19.5855 22.1204 19.003 21.5383L17.9574 20.4937C17.8156 20.356 17.7029 20.1913 17.6259 20.0093C17.5489 19.8273 17.5092 19.6317 17.5092 19.4341C17.5092 19.2365 17.5489 19.041 17.6259 18.859C17.7029 18.677 17.8156 18.5122 17.9574 18.3745L19.003 17.315L16.8969 15.2108L2.54294 29.5523C2.40476 29.6906 2.24062 29.8004 2.05993 29.8753C1.87924 29.9502 1.68554 29.9887 1.48992 29.9887C1.2943 29.9887 1.1006 29.9502 0.919904 29.8753C0.739212 29.8004 0.575076 29.6906 0.436893 29.5523C-0.145631 28.9703 -0.145631 28.0152 0.436893 27.4331ZM26.8745 25.5229C27.6668 25.5229 28.4267 25.8374 28.9869 26.3971C29.5471 26.9569 29.8618 27.716 29.8618 28.5076V30H14.9253V28.5076C14.9253 27.716 15.2401 26.9569 15.8003 26.3971C16.3605 25.8374 17.1203 25.5229 17.9126 25.5229H26.8745Z" fill="white" />
                       </svg>
                   </SidebarLink>


                   <SidebarLink
                       href="/lawyers"
                       isActive={isActive("/lawyers")}
                       label="Lawyers"
                   >
                       <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                           <rect width="40" height="40" fill="url(#pattern0_1005_1842)" />
                           <defs>
                               <pattern id="pattern0_1005_1842" patternContentUnits="objectBoundingBox" width="1" height="1">
                                   <use xlinkHref="#image0_1005_1842" transform="scale(0.0111111)" />
                               </pattern>
                               <image
                                   id="image0_1005_1842"
                                   width="90"
                                   height="90"
                                   preserveAspectRatio="none"
                                   xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtElEQVR4nO2dW6hVRRiAR9GsTI+FiualC74ElQ/Wiz5EKBIZ9JKC0kP1EESg4IuPSdBFAyGS4qD0UE8KSiEUFHSVygsZYkSXB6U6WpndPFmW54th/7s2u32ZNWsua9aaDzYc9t6s9c93/r1m1j+z1lIqk8lk6g8wFXgIOAj8CPwEfAQ8AlweO75aAMwF3qM/R4AFseNMGmAy8CbDOQZcoZoGMA3YDoyRDmMS8zSVCsA20mWbSoXEMrmb0yoVgG9IlzGVCsCTpMtTKhWAy0R2Spn9rZasY1epAawY0LA7DYd3rxlI+tBEUNl4KgvwVkdDfpYzujbvGG7jauD1AYLeB+aFiqdyAHd0CdkKPGaTRZLZv/cRPTN0PJWC/2ePzswR4FzH+wcLbO98H9HTY8RTCXocC7d2fGab1daifcRTCXplj/rvM6ssKinaeTzRGZQ9ZbLIVrSveKIzKHvKZFEJ0V7iiYpJ9thmkY1on/FExSR7bLPIUrS3eKJRJHtssqioaN/xRKNI9thkkYVor/HUFkqesGQMyaIDQRYdBrLoMJBFh4EsugUwgRsmORreeY0nGll0IIBxB4264FC013iiAYw6aNjogO0XFe01nmgA87smO4vyC7DQoWiv8UQFWAtcsmjUJeA+D9U7b/FERxaMXyzQKP3dBz0W/r3EUwmA5cBxg0bp7ywPMGfoPJ7KQGstxj3AS8CXMgoYl7/1e2v0dwIuN3AaT20hnxmGgSw6DGTRYSCLDgNZdBjIosNAFh0GsujeAHOApcCtwDUOtpdFtwFuAp4ATvQQckJWAi223PbXPbb5W+XqxZ4zd6Nc/G7CX8CeojUF4PEe29qp6oy+dQOwDjhQsDLWzWFgg75NhME+p8jlad/L65kkL1UzAVgGPAv8gFtOy8U7s1VTAa4DtgBf4Z8/pJJ2i2oKwKNyoWQMJoA3gLtrX7p0OF1fFv1L2gRcpepIhUR3Tpbq/uF6VScqKLpz4lSPdlapOlBh0Z18DDyc9J3CEhHd5owMD+eo1EhMdBt9Yf4u4OYAfvQCndtL3wouUdFtdOyvuu445UaH+oz47S4/+sKkJU0U3eYUcK0DwQuk1jI25PC1sKmiNc9byp0ErAT2SSHMhN1NFn2yYLtHpBr5mcW+zjRZ9AXD9i6Vpb79JhhMGG+y6KND7ma2Qe7i64JDTRb9QI+2LZaZoO8c7+v+pop+rqtzWw28AvztYV87CkuugehTMhuzSl6bgS887Ut3mmusJNdAdAjOyoRIuem0LLovf0q5dqSU4JKix2XV/CdSP64Tujz7su1yCVeiPwDWA1d21QXuAvYXOLOqKrq2scyp4AKi9U9or8n6DFqVLn08O0lafK6v7PIi2EC0Hns+DSyy2OZkGQXs9TTEqlZHZyn6mMxmOHk6BLBE/mF6MUw9O7oCov+dn/O1xo3WEy7WGj4GxBcT8iu7wUcbhwnYHnrGmVZh5wXg14CS3wVuU00EmCGHKX24SrejS3C936ij20Igz9raktSDbUICzJIs/7RkRzcrdluSgFYVrj1EvFigo7sxduzJwvATIf0ovhWx46wNtBap3wu8KKtQd+vac+y4MplMJpPJZFQQ/gHmK+t/DT8JWwAAAABJRU5ErkJggg=="
                               />
                           </defs>
                       </svg>
                   </SidebarLink>


                   <div className="flex-grow" />


                   <SidebarLink
                       href="/profile"
                       isActive={isActive("/profile")}
                       label="Profile"
                   >
                       <svg width="36" height="36" viewBox="0 0 35 35" fill="none">
                           <rect width="35" height="35" fill="url(#pattern0_1005_1835)" />
                           <defs>
                               <pattern id="pattern0_1005_1835" patternContentUnits="objectBoundingBox" width="1" height="1">
                                   <use xlinkHref="#image0_1005_1835" transform="scale(0.0111111)" />
                               </pattern>
                               <image
                                   id="image0_1005_1835"
                                   width="90"
                                   height="90"
                                   preserveAspectRatio="none"
                                   xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmElEQVR4nO3cT6gVVRwH8JP2x4oWGZhEUCJB5qYWEhikBFYUWi0qIoiIWhXWLgQDw/6AImKFIC2qTbUtELKyWmRWEPUSKnulFv23WvT39Y9PDO+sogf3vjcz53jmfODBY3jv3vl9mTt3zpk5vxCqqqqqqqqqqqqq8WApbsPjeBWf4Uf8hV9wJG7fhIvGfPlhwym4E+8Y38tYnrqGrOE43I6j5uZ33Jy6nizhDOzRnn9wTeq6soKzMal9zSdjPdZiURgynI6PdG8KT+KsMNBz8m79+hIrwpDgFmn8gHPCEOAkfCGd18IQ4A7prQmlw/7UKeOlUDIskodmGL8wlArXyke5I0hslY/toVR4RT72hFLhgHx8GkplenSWi6OhVKanMXMxFUqFn+Xjp1AqHJSPg6FU2p3gn6u9oVS4Tz7uD6XCxfKxKpQMH6ZOGIcwL5QMj6ZOGY+FkuGyeJc6tWYfVodS4Xn5eC6USl5zHROhVHhTPvaHUmGXfOwMpcJV8nFlKBleT50w3mge4gklwxK8lzDkd3FuGArsSBDyjjA0pp/07NvVYWhwIr7tMeSvcUIYItzbY9B3hYGvWTncQ8jNiPT4MGRY0/FEU9kTSOPAxg6D3pC6vtxWADzbQcjPFD8wGRfmt3xtvWuwVxmjaCvlkd5syNSg+6EG3Q816H6oQfdDDbp7WNVW0Lg0dT05z3scaDHo95vXTF1XrqPDu/FnS8vbNhX/2Ndc4JJ4NM7WBFamruOYgHm4dcxeHh/H/xn2UWz6pmxzatgbl8GNtHK1aUyFB5rF8vgm9t+Yir832zbjwhFf6zS8GPsvNfuyJBRyzl0RQ5r4nyPwgz7vRjeNUfD2DKeazXFfj52ZPizDQ/h8xPt4K3s674/SuqJp+fYgzg8ZH73rZvls3d+xuAUd7NfJeDi+x7iaLgxrQy5wxQwfyXEdxo1tfJnFL9ObYhPCuXoLl7eT1uyKWdjRXZHJ+EV15iz2aTHuwScd7NfTTcOtbtKcuaDzOmqj9t+bqvviaeV6XBCDXBB/FsdtN8S/2dfDaoJmneTSPnuG9vngS26+6vxqKV6H5rT6NZXm0vTULoPemay0/DzSVcjLM1lRlYsmi2VdBP1U6soy9EQXc8W/pq4qQ7+1OueN61JXlLF1bQa9LXU1GdvSZtAvpK4mY7vbDLqLIW0pJtsM+vvU1WTsuzaD/iN1NRkrt9tYVVVVVVVVVVVhEP4F0RBh/go9gugAAAAASUVORK5CYII="
                               />
                           </defs>
                       </svg>
                   </SidebarLink>


                   <button
                       type="button"
                       className={`flex items-center gap-4 ml-2 rounded-xl p-3`}
                       style={{
                           background: "none",
                           color: "white",
                           border: "none",
                           outline: "none",
                       }}
                       onClick={() => setShowSignOutModal(true)}
                   >
                       <svg width="36" height="36" viewBox="0 0 24 25" fill="none">
                           <path d="M12 13.1579C11.6222 13.1579 11.3058 13.0316 11.0507 12.7789C10.7956 12.5263 10.6676 12.214 10.6667 11.8421V1.31579C10.6667 0.942987 10.7947 0.630706 11.0507 0.378952C11.3067 0.127198 11.6231 0.00088173 12 4.5372e-06C12.3769 -0.000872656 12.6938 0.125443 12.9507 0.378952C13.2076 0.632461 13.3351 0.944741 13.3333 1.31579V11.8421C13.3333 12.2149 13.2053 12.5276 12.9493 12.7803C12.6933 13.0329 12.3769 13.1588 12 13.1579ZM12 25C10.3333 25 8.77244 24.6877 7.31733 24.0632C5.86222 23.4386 4.59555 22.5943 3.51733 21.5303C2.43911 20.4662 1.58356 19.2162 0.950667 17.7803C0.317778 16.3443 0.000888889 14.8035 0 13.1579C0 11.8202 0.222222 10.5206 0.666667 9.25921C1.11111 7.99781 1.75556 6.84123 2.6 5.78948C2.84444 5.48246 3.15556 5.33465 3.53333 5.34606C3.91111 5.35746 4.24444 5.50527 4.53333 5.78948C4.77778 6.0307 4.88889 6.32676 4.86667 6.67763C4.84444 7.02851 4.72222 7.35746 4.5 7.66448C3.9 8.45395 3.44444 9.32018 3.13333 10.2632C2.82222 11.2061 2.66667 12.1711 2.66667 13.1579C2.66667 15.7237 3.57244 17.9004 5.384 19.6882C7.19555 21.4759 9.40089 22.3693 12 22.3684C14.5991 22.3675 16.8049 21.4741 18.6173 19.6882C20.4298 17.9022 21.3351 15.7254 21.3333 13.1579C21.3333 12.1491 21.1836 11.1675 20.884 10.2132C20.5844 9.25877 20.112 8.38728 19.4667 7.59869C19.2444 7.3136 19.1222 7.00132 19.1 6.66184C19.0778 6.32237 19.1889 6.03158 19.4333 5.78948C19.7 5.52632 20.0222 5.38948 20.4 5.37895C20.7778 5.36842 21.0889 5.50527 21.3333 5.78948C22.2 6.84211 22.8613 7.99342 23.3173 9.24342C23.7733 10.4934 24.0009 11.7982 24 13.1579C24 14.8026 23.6836 16.3434 23.0507 17.7803C22.4178 19.2171 21.5622 20.4671 20.484 21.5303C19.4058 22.5934 18.1391 23.4377 16.684 24.0632C15.2289 24.6886 13.6676 25.0009 12 25Z" fill="white" />
                       </svg>
                       <span className="ml-2">Log out</span>
                   </button>
               </nav>
           </div>


           {showSignOutModal && (
               <div
                   className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-10"
                   aria-modal="true"
                   role="dialog"
               >
                   <div className="bg-white rounded-3xl p-12 flex flex-col items-center shadow-xl min-w-[420px] min-h-[220px]">
                       <h2 className="text-2xl font-normal mb-12 text-center text-[#282828]">
                           Are you sure you want<br />to sign out ?
                       </h2>
                       <button
                           onClick={handleSignOut}
                           className="border border-[#A87352] text-[#A87352] cursor-pointer px-10 py-2 rounded-md text-lg hover:bg-[#f5ede7] transition"
                       >
                           Sign out
                       </button>
                       <button
                           onClick={() => setShowSignOutModal(false)}
                           className="mt-6 cursor-pointer text-[#888] text-sm"
                       >
                           Cancel
                       </button>
                   </div>
               </div>
           )}
       </>
   );
}
function SidebarLink({ href, isActive, label, children }: any) {
   return (
       <Link
           href={href}
           className={`flex items-center p-3 gap-4 ml-2 rounded-xl transition-colors ${isActive ? "bg-[#A87352]" : "hover:bg-[#991b1b]"}`}
           style={{ color: "white", textDecoration: "none" }}
       >
           <span>{children}</span>
           <span className="ml-2 font-semibold">{label}</span>
       </Link>
   );
}

