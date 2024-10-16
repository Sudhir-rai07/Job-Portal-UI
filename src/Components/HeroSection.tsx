import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import { Button, Input, Select } from "react-daisyui";
import { FaSearch } from "react-icons/fa";
import { span } from "framer-motion/client";

const industryOptions: string[] = ["IT", "Management", "HR", "Teaching"]
const locationOptions: string[] = ["Delhi", "Gurgaon", "Noida", "Banglore", "Pune", "Haydrabad"]

const HeroSection = () => {
    const [industryValue, setIndustryValue] = useState<string>("default")
    const [location, setLocation] = useState<string>("location")
    const [keyword, setKeyword] = useState<string>("keyword")

    const handleClick = (e:React.ChangeEvent<HTMLButtonElement>):void =>{
        e.preventDefault();
        console.log(industryValue)
        console.log(location)
        console.log(keyword)
    }
    return (
        <div className="flex-col w-full h-4/5 svg-bg">
            <NavbarComponent />

            <div className="flex items-center justify-center w-4/5 h-full mx-auto">
                <div className="flex-col w-full lg:pl-12 lg:flex-1">
                    <div className="flex-col">
                        <div className="text-3xl font-semibold text-white lg:text-5xl">
                            The <span className="text-blue-400">Easiest Way</span> <br /> to get
                            your new Job
                        </div>
                        <p className="mt-6 text-lg text-black lg:text-gray-400">
                            Each month, many job seekers turn to <br /> website in their search for
                            work. Making bunch of <br /> applications every single day
                        </p>
                    </div>
                    <div className="mt-6">
                        <div className="inline-block px-2 py-2 overflow-hidden bg-white rounded-lg shadow-[0px_1px_12px_3px_#a0aec0]">
                            <Select dataTheme="light" value={industryValue} className="w-full h-full border-r border-none rounded-none rounded-tl rounded-bl" onChange={event => setIndustryValue(event.target.value)}>
                                <option value={'default'} disabled>
                                    Select industry
                                </option>
                                {industryOptions.map((value:string, idx:number)=>{
                                    return (
                                        <option key={idx} value={value}>{value}</option>

                                    )
                                })}
                            </Select>
                            <Select dataTheme="light" value={location} className="w-full h-full border-r border-none rounded-none"  onChange={event => setLocation(event.target.value)}>
                                <option value={'location'} disabled>
                                    Select location
                                </option>
                                {locationOptions.map((value:string, idx:number)=>{
                                    return (
                                        <option key={idx} value={industryValue}>{value}</option>

                                    )
                                })}
                            </Select>
                                {/* <input type="text" placeholder="Keyword" className="w-16 h-full bg-white focus:outline-none" name="keyword" onChange={e =>{setKeyword(e.target.value)}} /> */}
                                <Input dataTheme="light" className="w-full border border-b border-r rounded-none focus:outline-none" placeholder="Keyword" onChange={e => setKeyword(e.target.value)}/>
                            <Button className="mt-1 border-none rounded-md" size="md"><FaSearch /> Search</Button>
                        </div>
                    </div>
                
                <div className="hidden mt-4">
                    <span className="hidden font-semibold text-white">Popular searches: </span> {["Content Writer", "Finance", "Human Resources", "Managment"].map((item:string, idx:number)=>{
                        return (
                            <span key={idx} className="text-black">{item}, &nbsp;</span>
                        )
                    })}
                </div>
                </div>

                <div className="relative hidden mt-8 lg:flex lg:justify-end lg:w-1/3">
                    <div className="overflow-hidden rounded-lg">
                        <img src="https://cdn.pixabay.com/photo/2020/07/11/23/36/meeting-5395615_1280.jpg" alt="Meeting_Picture" className="w-full h-full bg-center bg-cover" />
                    </div>
                    {/* <div className="overflow-hidden rounded-lg top-2/3 -left-16 ">
                    <img src="https://cdn.pixabay.com/photo/2020/04/09/10/15/desk-5020800_960_720.jpg" alt="Meeting_Picture" className="w-full h-full bg-center bg-cover" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
